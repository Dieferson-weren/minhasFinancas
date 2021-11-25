import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/formGroup'
import SelectMenu from '../../components/selectMenu'
import * as messages from '../../components/toastr'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'

import { withRouter } from 'react-router-dom'

class CadastroLancamentos extends React.Component {

    constructor() {
        super()
        this.service = new LancamentoService()
    }

    state = {
        id: null,
        descricao: '',
        mes: '',
        ano: '',
        valor: '',
        tipo: '',
        status: '',
        usuario: null
    }

    componentDidMount(){
        const params = this.props.match.params;
        if(params.id){
            this.service.buscarID(params.id).then(res => this.setState({...res.data})).catch(err => messages.mensagemErro(err.response.data))
        }

    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value})
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const { descricao, ano, mes, valor, tipo } = this.state
        const lancamentos = {descricao, ano, mes, valor, tipo, usuario: usuarioLogado.id}

        try{
            this.service.validar(lancamentos);
        }catch(erro){
            const mensagens = erro.msg;
            mensagens.forEach(msg => messages.mensagemErro(msg))
            return false;
        }

        this.service
            .salvar(lancamentos)
            .then(res => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso("Lançamento cadastrado com sucesso")
            }).catch(err => {
                messages.mensagemErro(err.response.data)
            })
    }

    atualizar = () => {
        const { descricao, ano, mes, valor, tipo, id, usuario, status } = this.state
        const lancamentos = {descricao, ano, mes, valor, tipo, id, usuario, status}

        this.service
            .atualizar(lancamentos)
            .then(res => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso("Lançamento atualizado com sucesso")
            }).catch(err => {
                messages.mensagemErro(err.response.data)
            })
    }

    render() {
        const tipos = this.service.obterTipos();
        const meses = this.service.obterMeses();
        return (
            <Card title={this.state.id ? "Atualização de lançamento" : "Cadastro de lançamento"}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                            <input className="form-control"
                                    type="text" 
                                    id="inputDescricao" 
                                    value={this.state.descricao}
                                    name="descricao"
                                    onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input className="form-control" 
                                    type="text" 
                                    id="inputAno" 
                                    value={this.state.ano}
                                    name="ano"
                                    onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor='inputMes' label="Mês: *">
                            <SelectMenu 
                                lista={meses} 
                                id="inputMês" 
                                value={this.state.mes}
                                className="form-control" 
                                name = "mes"
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *">
                            <input type="text" 
                                    id="inputValor" 
                                    value={this.state.valor}
                                    className="form-control" 
                                    name="valor"
                                    onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor='inputTipo' label="Tipo: *">
                            <SelectMenu lista={tipos} 
                                        id="inputMês" 
                                        value={this.state.tipo}
                                        className="form-control" 
                                        name="tipo"
                                        onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: ">
                            <input type="text" id="inputStatus"  className="form-control" disabled value={this.state.status} />
                        </FormGroup>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.state.id != null ? this.atualizar : this.submit} className="btn btn-success me-2">{this.state.id != null ? <i className="pi pi-check p-mr-2">Editar</i>: <i className="pi pi-save p-mr-2">Salvar</i>}</button>
                        <button className="btn btn-danger" onClick={e => this.props.history.push('/consulta-lancamentos')}><i className="pi pi-times p-mr-2">Cancelar</i></button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);