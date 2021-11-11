package com.dief.minhasFinancas.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import com.dief.minhasFinancas.model.entity.Lancamento;
import com.dief.minhasFinancas.model.enums.StatusLacamento;

public interface LancamentoService {
	Lancamento salvar(Lancamento lancamento);
	Lancamento atualizar(Lancamento lancamento);
	void deletar(Lancamento lancamento);
	List<Lancamento> buscar(Lancamento lancamentoFiltro);
	void atualizarStatus(Lancamento lancamento, StatusLacamento status);
	void validar(Lancamento lancamento);
	Optional<Lancamento> obterPorId(Long id);
	BigDecimal obterSaldoPorUsuario(Long id);
}
