import React from "react";
import currency from 'currency-formatter'

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currency.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type='button' title="Efetivar" disabled={lancamento.status !== "PENDENTE"} className="btn btn-success me-2" onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}>
                        <i className="pi pi-check p-mr-2"></i>
                    </button>
                    <button type='button' disabled={lancamento.status !== "PENDENTE"} title="Cancelar" className="btn btn-warning me-2" onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}>
                        <i className="pi pi-times p-mr-2"></i>
                    </button>
                    <button type="button" title="Editar"
                            className="btn btn-primary me-2"
                            onClick={e => props.editAction(lancamento.id)}>
                                <i className="pi pi-pencil p-mr-2"></i>
                    </button>
                    <button type="button" title="Apagar"
                            className="btn btn-danger"
                            onClick={e => props.deleteAction(lancamento)}>
                                <i className="pi pi-trash p-mr-2"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mes</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}