import React from 'react';
import {Route, HashRouter, Routes} from 'react-router-dom';
import Login from '../view/login';
import CadastroUsuario from '../view/cadastrousuario';

function Rotas(){
    return(
        <HashRouter>
            <Routes>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
            </Routes>
        </HashRouter>
    );
}

export default Rotas;