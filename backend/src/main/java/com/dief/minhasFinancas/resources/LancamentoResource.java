package com.dief.minhasFinancas.resources;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.BadRequest;

import com.dief.minhasFinancas.api.dto.AtualizaStatusDto;
import com.dief.minhasFinancas.api.dto.LancamentoDto;
import com.dief.minhasFinancas.exceptions.RegraNegocioException;
import com.dief.minhasFinancas.model.entity.Lancamento;
import com.dief.minhasFinancas.model.entity.Usuario;
import com.dief.minhasFinancas.model.enums.StatusLacamento;
import com.dief.minhasFinancas.model.enums.TipoLancamento;
import com.dief.minhasFinancas.service.LancamentoService;
import com.dief.minhasFinancas.service.UsuarioService;

@RestController
@RequestMapping("/api/lancamentos")
public class LancamentoResource {
	
	@Autowired
	private LancamentoService service;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@PostMapping
	public ResponseEntity lancamento ( @RequestBody LancamentoDto dto) {
		try {
			Lancamento entidade = converter(dto);
			entidade = service.salvar(entidade);
			return ResponseEntity.ok(entidade);
			
		}catch(RegraNegocioException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}
	
	@GetMapping
	public ResponseEntity buscar(
			@RequestParam(value = "descricao", required = false) String descricao,
			@RequestParam(value = "tipo", required = false) String tipo,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "mes", required = false) Integer mes,
			@RequestParam(value = "ano", required = false) Integer ano,
			@RequestParam("usuario") Long idUsuario
			) {
		Lancamento lancamentoFiltro = new Lancamento();
		lancamentoFiltro.setDescricao(descricao);
		if(tipo != null) {
			lancamentoFiltro.setTipo(TipoLancamento.valueOf(tipo));
		}
		
		//lancamentoFiltro.setStatus(StatusLacamento.valueOf(status));
		lancamentoFiltro.setMes(mes);
		lancamentoFiltro.setAno(ano);
		Optional<Usuario> usuario = usuarioService.buscarPorId(idUsuario);
		
		if(!usuario.isPresent()) {
			return ResponseEntity.badRequest().body("Nenhum usu??rio encontrado para o lan??amento");
		}else {
			lancamentoFiltro.setUsuario(usuario.get());
		}
		
		List<Lancamento> lacamentos = service.buscar(lancamentoFiltro);
		return ResponseEntity.ok(lacamentos);
	}
	
	@GetMapping("{id}")
	public ResponseEntity buscaId(@PathVariable("id") Long id) {
		return service.obterPorId(id).map(lancamento -> new ResponseEntity<>(converter(lancamento), HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PutMapping("{id}")
	public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody LancamentoDto dto) {
		return service.obterPorId(id).map(entity -> {
			try {
				Lancamento lancamento = converter(dto);
				lancamento.setId(entity.getId());
				service.atualizar(lancamento);
				return ResponseEntity.ok(lancamento);
				
			}catch(RegraNegocioException e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}
			
				
		}).orElseGet(() -> new ResponseEntity("Lancamento n??o encontrado", HttpStatus.BAD_REQUEST));
		
	}
	
	@PutMapping("{id}/atualiza-status")
	public ResponseEntity atualizarStatus(@PathVariable("id") Long id, @RequestBody AtualizaStatusDto dto) {
		return service.obterPorId(id).map(status -> {
			try {
				StatusLacamento statusSelecionado = StatusLacamento.valueOf(dto.getStatus());
				if(statusSelecionado == null) {
					return ResponseEntity.badRequest().body("N??o foi poss??vel alterar o status do lan??amento");
				}
			
			
				status.setStatus(statusSelecionado);
				service.atualizar(status);
				return ResponseEntity.ok(status);
				
			}catch(IllegalCallerException e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}
		}).orElseGet(()-> new ResponseEntity("Lan??amento n??o encontrado", HttpStatus.BAD_REQUEST));
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity deletar(@PathVariable("id") Long id) {
		
		return service.obterPorId(id).map(entity -> {
			service.deletar(entity);
			return ResponseEntity.noContent().build();
		}).orElseGet(()-> new ResponseEntity("Lan??amento n??o encontrado", HttpStatus.BAD_REQUEST));
		
	}
	
	private Lancamento converter(LancamentoDto dto) {
		Lancamento lancamento = new Lancamento();
		lancamento.setId(dto.getId());
		if(dto.getStatus() != null) {
			lancamento.setStatus(StatusLacamento.valueOf(dto.getStatus()));
		}
		
		lancamento.setAno(dto.getAno());
		lancamento.setMes(dto.getMes());
		lancamento.setDescricao(dto.getDescricao());
		lancamento.setValor(dto.getValor());
		
		Usuario usuario = usuarioService.buscarPorId(dto.getUsuario())
				.orElseThrow(() -> new RegraNegocioException("Usuario n??o encontrado"));
		
		lancamento.setUsuario(usuario);
		if(dto.getTipo() != null) {
			lancamento.setTipo(TipoLancamento.valueOf(dto.getTipo()));
		}
		
		return lancamento;
	}
	
	private LancamentoDto converter(Lancamento lancamento) {
		return LancamentoDto.builder()
					.id(lancamento.getId())
					.descricao(lancamento.getDescricao())
					.ano(lancamento.getAno())
					.mes(lancamento.getMes())
					.status(lancamento.getStatus().name())
					.tipo(lancamento.getTipo().name())
					.usuario(lancamento.getUsuario().getId())
					.valor(lancamento.getValor())
					.build();
	}

}
