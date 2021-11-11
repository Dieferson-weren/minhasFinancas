package com.dief.minhasFinancas.service;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.dief.minhasFinancas.exceptions.ErroAutenticacao;
import com.dief.minhasFinancas.exceptions.RegraNegocioException;
import com.dief.minhasFinancas.model.entity.Usuario;
import com.dief.minhasFinancas.model.repository.UsuarioRepository;
import com.dief.minhasFinancas.service.impl.UsuarioServiceImpl;

@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
public class UsuarioServiceTest {

	UsuarioService service;
	
	
	@MockBean
	UsuarioRepository repository;
	
	
	@BeforeEach
	public void setup() {
		service = new UsuarioServiceImpl(repository);
	}
	
	@Test
	public void deveAutenticarUmUsuarioComSucesso() {
		String email = "email@email.com";
		String senha = "senha";
		
		Usuario usuario =  Usuario.builder().email(email).senha(senha).id(1L).build();
		
		Mockito.when(repository.findByEmail(email)).thenReturn(Optional.of(usuario));
		
		Usuario result = service.autenticar(email, senha);
		
		org.assertj.core.api.Assertions.assertThat(result).isNotNull();
	}
	
	@Test
	public void deveLancarerroQuandoNaoEncontradoUsuarioCadastradoComOEmailInformado() {
		
		Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());
		
		ErroAutenticacao erro = Assertions.assertThrows(ErroAutenticacao.class, () -> service.autenticar("email@email.com", "senha"));
		
		Assertions.assertEquals("Usuário para o email informado não encontrado", erro.getMessage());
	}
	
	@Test
	public void deveLancarErroQuandoSenhaNaoBater() {
		String senha = "senha";
		Usuario usuario = Usuario.builder().email("email@email.com").senha(senha).build();
		Mockito.when(repository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(usuario));
		
		ErroAutenticacao erro = Assertions.assertThrows(ErroAutenticacao.class, () -> service.autenticar("email@email.com", "123"));
	
		Assertions.assertEquals("Senha Inválida.", erro.getMessage());
	}
	
	@Test()
	public void deveValidarEmail() {
		
		Mockito.when(repository.existsByEmail(Mockito.anyString())).thenReturn(false);
		
		Assertions.assertDoesNotThrow(() -> service.validarEmail("dieferson.weren@hotmail.com"));
		
	}
	
	@Test
	public void deveLancarErroAoValidarEmailQandoExistirEmailCadastrado() {
		
		Mockito.when(repository.existsByEmail(Mockito.anyString())).thenReturn(true);
		
		Assertions.assertThrows(RegraNegocioException.class, () -> service.validarEmail("dieferson.weren@hotmail.com"));
	}
}
