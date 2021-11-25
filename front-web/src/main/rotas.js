import React from 'react';
import {Route, HashRouter, Switch, Redirect} from 'react-router-dom';
import { AuthConsumer } from '../main/providerAuth'
import Login from '../view/login';
import CadastroUsuario from '../view/cadastrousuario';
import consultaLancamento from '../view/lancamentos/consultaLancamento';
import cadastroLancamentos from '../view/lancamentos/cadastroLancamentos';

import Home from '../view/home'


function RotaAutenticada({component: Component, isAutenticado, ...props}){
    return(
        <Route {...props} render={(componentProps) => {
            if(isAutenticado){
                return(
                    <Component {...componentProps} />
                )
            }else {
                return(
                    <Redirect to={{pathname: "/login", state: {from: componentProps.location}}} />
                )
                
            }
        }} />
    )
}

function Rotas(props){
    return(
        <HashRouter >
            <Switch >
                <Route exact path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                <RotaAutenticada isAutenticado={props.isAutenticado} path="/consulta-lancamentos" component={consultaLancamento} />
                <RotaAutenticada isAutenticado={props.isAutenticado} path="/cadastro-lancamentos/:id?" component={cadastroLancamentos} />
                <RotaAutenticada isAutenticado={props.isAutenticado} path="/home" component={Home}  />
            </Switch>
        </HashRouter>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <AuthConsumer>
        {(context) => (
            <Rotas isAutenticado={context.autenticado} />
        )}
    </AuthConsumer>
)