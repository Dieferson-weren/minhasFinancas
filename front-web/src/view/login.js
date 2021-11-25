import React from "react";
import Card from "../components/card";
import UsuarioService from "../app/service/usuarioService";
import FormGroup from "../components/formGroup";
import { withRouter } from 'react-router-dom';
import {mensagemErro} from '../components/toastr'
import {authContext} from '../main/providerAuth'

class Login extends React.Component {
    state = {
        email: '',
        senha: ''
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
           this.context.iniciaSessao(response.data);
           this.props.history.push('/home');
       }).catch(err => mensagemErro(err.response.data));
    }

    cadastro = () => {
        this.props.history.push('/cadastro-usuario')
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <form>
                                            <fieldset>
                                                <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                    <input type="email" className="form-control"
                                                        value={this.state.email}
                                                        onChange={e => this.setState({ email: e.target.value })}
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Digite o Email" />
                                                </FormGroup>
                                                <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                    <input type="password"
                                                        className="form-control"
                                                        value={this.state.senha}
                                                        onChange={e => this.setState({ senha: e.target.value })}
                                                        id="exampleInputPassword1"
                                                        placeholder="Password" />
                                                </FormGroup>
                                                <br/>
                                                <button onClick={this.entrar} className="btn btn-success me-2"><i className="pi pi-sign-in"></i> Entrar</button>
                                                <button onClick={this.cadastro} className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar</button>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = authContext;

export default withRouter(Login);