package com.dief.minhasFinancas.model.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dief.minhasFinancas.model.entity.Lancamento;
import com.dief.minhasFinancas.model.enums.StatusLacamento;
import com.dief.minhasFinancas.model.enums.TipoLancamento;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long>{
	
	@Query(value = "select sum(l.valor) from Lancamento l join l.usuario u"
			+ " where u.id = :idUsuario and l.tipo = :tipo and l.status = :status group by u")
	BigDecimal obterSaldoPorUsuarioETipo(@Param("idUsuario") Long idUsuario, 
				@Param("tipo") TipoLancamento tipo ,
				@Param("status") StatusLacamento status);
}
