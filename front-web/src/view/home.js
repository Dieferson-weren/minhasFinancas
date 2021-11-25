import React from "react";
import UsuarioService from "../app/service/usuarioService";
import { authContext } from '../main/providerAuth'
import currency from 'currency-formatter'

class Home extends React.Component {

    state = {
        saldo: 0,
    }

    constructor(){
        super()
        this.usuarioService = new UsuarioService()
    }

    componentDidMount(){
        const usuario = this.context.usuario;
        this.usuarioService.obterSaldo(usuario.id)
        .then(response => this.setState({saldo: response.data}))
        .catch(erro => console.log("Deu erro: ", erro.response.data.message))
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">{`Bem vindo(a) ${this.state.nome}!`}</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de {currency.format(this.state.saldo, {locale: 'pt-BR'})}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg me-2" href="#/cadastro-usuario" role="button"><i
                        className="pi pi-user-plus"></i> Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos" role="button"><i
                        className="pi pi-wallet"></i> Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }
}
Home.contextType = authContext;
export default Home;
