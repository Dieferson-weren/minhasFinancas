import React from "react";
import Card from "../components/card";
import FormGroup from '../components/formGroup'

class CadastroUsuario extends React.Component {
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    salvar = () =>{

    }

    render() {
        return (
            <div className="container">
                <Card title="Cadastro de Usuário">
                    <div classNames="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                               <FormGroup label="Nome: *" htmlFor="inputNome">
                                   <input type="text" 
                                        id="inputNome" 
                                        name="nome" 
                                        onChange={e=>this.setState({nome: e.target.value})}
                                        className="form-control"
                                        placeholder="Digite o Nome" />
                               </FormGroup>
                               <FormGroup label="Email: *" htmlFor="inputEmail">
                                   <input type='email'
                                        id="inputEmail"
                                        name="email"
                                        className="form-control"
                                        placeholder="Digite o Email"
                                        onChange={e => this.setState({email: e.target.value})} />
                               </FormGroup>
                               <FormGroup label="Senha: *" htmlFor="inputSenha">
                                   <input type="password"
                                        id="inputSenha"
                                        name="senha"
                                        className="form-control"
                                        placeholder="Digite a Senha"
                                        onChange={e => this.setState({senha: e.target.value})} />
                               </FormGroup>
                               <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                   <input type="password"
                                        id="inputRepitaSenha"
                                        name="senhaRepeticao"
                                        className="form-control"
                                        placeholder="Repita a senha"
                                        onChange={e => this.setState({senha: e.target.value})} />
                               </FormGroup>

                               <button onChange={this.salvar} type="button" className="btn btn-success">Salvar</button>
                               <button type="button" className="btn btn-danger">Voltar</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default CadastroUsuario