import LocalStorageService from "./localStorageService"

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService{

    static isAutenticad(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static logOut(){
        LocalStorageService.removerItem(USUARIO_LOGADO);
    }

    static logIn(usuario){
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
    }

    static getUserAutenticad(){
        return LocalStorageService.obterItem(USUARIO_LOGADO);
    }
}