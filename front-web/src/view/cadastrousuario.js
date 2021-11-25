import React from "react";
import { withRouter } from 'react-router-dom';
import Card from "../components/card";
import FormGroup from '../components/formGroup';
import UsuarioService from "../app/service/usuarioService";
import {mensagemErro, mensagemSucesso} from '../components/toastr';

class CadastroUsuario extends React.Component {
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    

    salvar = () => {

        const { nome, email, senha, senhaRepeticao } = this.state

        const usuario = {nome, email, senha, senhaRepeticao }

        try{
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.msg;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso(`Usuário ${response.data.email} cadastrado com sucesso`)
                this.props.history.push('/login')
            }).catch(erro => mensagemErro(erro.response.data))
    }

    voltar = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                    id="inputNome"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    className="form-control"
                                    placeholder="Digite o Nome" />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type='email'
                                    id="inputEmail"
                                    name="email"
                                    className="form-control"
                                    placeholder="Digite o Email"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    id="inputSenha"
                                    name="senha"
                                    className="form-control"
                                    placeholder="Digite a Senha"
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                    id="inputRepitaSenha"
                                    name="senhaRepeticao"
                                    className="form-control"
                                    placeholder="Repita a senha"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>
                            <br/>
                            <button onClick={this.salvar} type="button" className="btn btn-success me-2"><i className="pi pi-save p-mr-2">Salvar</i></button>
                            <button onClick={this.voltar} type="button" className="btn btn-danger"><i className="pi pi-times p-mr-2">Cancelar</i></button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario);