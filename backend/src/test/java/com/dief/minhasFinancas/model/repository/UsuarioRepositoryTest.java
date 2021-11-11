package com.dief.minhasFinancas.model.repository;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.dief.minhasFinancas.model.entity.Usuario;

@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class UsuarioRepositoryTest {
	
	@Autowired
	UsuarioRepository repository;
	
	@Autowired
	TestEntityManager entityManager;
	
	@Test
	public void deveValidarEmail() {
		
		Usuario usuario = Usuario.builder().email("dieferson.weren@hotmail.com").build();
		
		entityManager.persist(usuario);
		
		boolean result = repository.existsByEmail("dieferson.weren@hotmail.com");
		
		Assertions.assertThat(result).isTrue();
		
	}
	
	@Test
	public void deveRetornarFalsoCasoEmailNaoExista() {
		
		boolean result = repository.existsByEmail("dieferson.weren@hotmail.com");
		
		Assertions.assertThat(result).isFalse();
	}
	
	@Test
	public void devePersistirUmUsuario() {
		Usuario usuario = criaUsuario();
		
		Usuario usuarioSalvo = repository.save(usuario);
		
		Assertions.assertThat(usuarioSalvo.getId()).isNotNull();
	}
	
	@Test
	public void deveBuscarUsuarioPorEmail() {
		Usuario usuario = criaUsuario();
		entityManager.persist(usuario);
		
		Optional<Usuario> result = repository.findByEmail("usuario@gmail.com");
		
		Assertions.assertThat(result.isPresent()).isTrue();
	}
	
	@Test
	public void deveRetornarVazioAoBuscarUsuarioPorEmailQuandoNaoExistirNaBaseDeDados() {
		
		Optional<Usuario> result = repository.findByEmail("usuario@gmail.com");
		
		Assertions.assertThat(result.isPresent()).isFalse();
	}
	
	
	public static Usuario criaUsuario() {
		return Usuario.builder()
				.nome("usuario")
				.email("usuario@gmail.com")
				.senha("senha")
				.build();
	}

}
