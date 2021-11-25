import React from "react";
import AuthService from "../app/service/authService";

export const authContext = React.createContext();
export const AuthConsumer = authContext.Consumer;
const AuthProvider = authContext.Provider;

class ProviderAuth extends React.Component{

    state ={
        usuarioAutenticado: null,
        autenticado: false
    }

    iniciarSessao = (usuario) => {
        AuthService.logIn(usuario);
        this.setState({autenticado: true, usuarioAutenticado: usuario});
    }

    encerrarSessão = () => {
        AuthService.logOut();
        this.setState({autenticado: false, usuarioAutenticado: null});
    }

    render(){

        const contexto = {
            usuario: this.state.usuarioAutenticado,
            autenticado: this.state.autenticado,
            iniciaSessao: this.iniciarSessao,
            encerraSessao: this.encerrarSessão
        }

        return(
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProviderAuth;