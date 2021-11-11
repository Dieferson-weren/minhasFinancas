package com.dief.minhasFinancas.resources;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dief.minhasFinancas.api.dto.UsuarioDTO;
import com.dief.minhasFinancas.exceptions.ErroAutenticacao;
import com.dief.minhasFinancas.exceptions.RegraNegocioException;
import com.dief.minhasFinancas.model.entity.Usuario;
import com.dief.minhasFinancas.service.LancamentoService;
import com.dief.minhasFinancas.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioResources {
	
	@Autowired
	private UsuarioService service;
	
	@Autowired
	private LancamentoService lancamentoService;
	
	@PostMapping("/auth")
	public ResponseEntity autenticar( @RequestBody UsuarioDTO dto) {
		try {
			Usuario usuarioAutenticado = service.autenticar(dto.getEmail(), dto.getSenha());
			return ResponseEntity.ok(usuarioAutenticado);
		}catch (ErroAutenticacao e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@PostMapping
	public ResponseEntity salvar(@RequestBody UsuarioDTO dto) {
		Usuario usuario = Usuario.builder().nome(dto.getNome()).email(dto.getEmail()).senha(dto.getSenha()).build();
		try {
			Usuario usuarioSalvor = service.salvarUsuario(usuario);
			return new ResponseEntity(usuarioSalvor, HttpStatus.CREATED);
		}catch(RegraNegocioException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}
	
	@GetMapping("{id}/saldo")
	public ResponseEntity obterSaldo(@PathVariable("id") Long id) {
		BigDecimal saldo = lancamentoService.obterSaldoPorUsuario(id);
		return ResponseEntity.ok(saldo);
	}
}
