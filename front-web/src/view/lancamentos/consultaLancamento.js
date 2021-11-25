import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Card from '../../components/card'
import { withRouter } from 'react-router-dom'
import FormGroup from '../../components/formGroup';
import SelectMenu from '../../components/selectMenu';
import DataTable from './dataTableLancamento';
import LancamentoService from '../../app/service/lancamentoService';
import * as messages from '../../components/toastr'

class ConsultaLancamento extends React.Component {
    constructor(){
        super()
        this.service = new LancamentoService()
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        modal: false,
        lancamentoDeletar: {},
        descricao: '',
        lancamentos: []
    }

    buscar = () => {
        if(!this.state.ano){
            messages.mensagemErro("Campo Ano é obrigatório");
            return false;
        }
        this.service.consultar(this.state)
            .then(res => this.setState({lancamentos: res.data}))
            .catch(err => messages.mensagemErro(err.response.data));
    } 

    onConfirmDelete = (lancamento) => {
        this.setState({modal: true, lancamentoDeletar: lancamento})
    }

    onCancelDelete = () => {
        this.setState({modal: false, lancamentoDeletar: {}})
    }

    formCadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState(lancamentos)
                this.setState({modal: false})
                messages.mensagemSucesso("Lançamento excluido com sucesso!");
            })
            .catch(error => {
                messages.mensagemErro(error.response.data);
            })
    }

    alterarStatus = (lancamento, status) => {
        this.service.atualizarStatus(lancamento.id, status)
            .then(res => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamentos})
                }
            }).catch(err => messages.mensagemErro(err.response.data))
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    render() {

        const meses = this.service.obterMeses();

        const tipos = this.service.obterTipos();

        const footer = (
            <div>
                <Button label="Confirma" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" ifon ="pi pi-times" onClick ={this.onCancelDelete} className="p-button-text" />
            </div>
        )

        return (
            <Card title="Consulta Lançamentos" >
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='bs-component'>
                            <FormGroup label="Ano: *" htmlFor="inputAno">
                                <input type="text" className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ano: e.target.value})}
                                    placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup label="Mês: " htmlFor="inputMes">
                                <SelectMenu className="form-control" value = {this.state.mes} onChange = {e => this.setState({mes: e.target.value})} lista={meses} />
                            </FormGroup>
                            <FormGroup label="Tipo: " htmlFor="inputTipo">
                                <SelectMenu className="form-control" value = {this.state.tipo} onChange = {e => this.setState({tipo: e.target.value})} lista={tipos} />
                            </FormGroup>
                            <FormGroup label="Descrição: " htmlFor="inputdesc">
                                <input type="text" className="form-control"
                                    id="inputdesc"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({descricao: e.target.value})}
                                    placeholder="Digite o Ano" />
                            </FormGroup>
                            <br/>
                            <button type="button" onClick={this.buscar} className="btn btn-success me-2"><i className="pi pi-search p-mr-2"></i> Buscar</button>
                            <button type="button" className="btn btn-danger" onClick={this.formCadastro}><i className="pi pi-plus p-mr-2"></i> Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <DataTable lancamentos={this.state.lancamentos} 
                                        editAction={this.editar}
                                        deleteAction={this.onConfirmDelete}
                                        alterarStatus={this.alterarStatus}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Godfather I"
                            footer={footer} 
                            style={{width: '50vw'}}
                            visible={this.state.modal}
                            modal={true}
                            onHide={()=> this.setState({modal: false})}>
                        Confirma a exclusão deste lançamento?
                    </Dialog>
                </div>

            </Card>
        )
    }
}

export default withRouter(ConsultaLancamento)