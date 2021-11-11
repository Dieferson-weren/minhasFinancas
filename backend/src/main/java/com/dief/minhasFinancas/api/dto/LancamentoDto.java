package com.dief.minhasFinancas.api.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LancamentoDto {
	 private Long id;
	 private String descricao;
	 private Integer mes;
	 private Integer ano;
	 private BigDecimal valor;
	 private Long usuario;
	 private String tipo;
	 private String status;
}
