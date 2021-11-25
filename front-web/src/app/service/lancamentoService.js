import ApiService from "../apiService";
import LocalStorageService from "./localStorageService";
import ErroValidacao from "../exception/erroValidacao";

export default class LancamentoService extends ApiService{
    constructor(){
        super('/api/lancamentos')
    }

    obterMeses(){
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 }
        ]
    }

    obterTipos(){
        return [
            { label: 'Selecione...', value: '' },
            { label: 'DESPESA', value: 'DESPESA' },
            { label: 'RECEITA', value: 'RECEITA' }
        ]
    }

    consultar(lancamentoFiltro){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        let params = `?ano=${lancamentoFiltro.ano}&usuario=${usuarioLogado.id}`;

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.status){
            params= `${params}&status=${lancamentoFiltro.status}`
        }

        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }
        return this.get(params)
    }

    deletar(id){
        return this.delete(`/${id}`);
    }

    validar(lancamento) {
        const erros = [];

        if(!lancamento.descricao){
            erros.push("Informe uma descrição")
        }

        if(!lancamento.ano){
            erros.push("Informe o ano")
        }

        if(!lancamento.mes){
            erros.push("Informe o mês")
        }

        if(!lancamento.valor){
            erros.push("Informe o valor do lançamento")
        }

        if(!lancamento.tipo){
            erros.push("Informe o tipo de lançamento")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    salvar(lancamento){
        return this.post('/', lancamento);
    }

    atualizarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, {status})
    }

    buscarID(id){
        return this.get(`/${id}`)
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento);
    }
}