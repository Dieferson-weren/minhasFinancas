import ApiService from "../apiService";
import ErroValidacao from "../exception/erroValidacao";

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
       return this.post('/auth', credenciais)
    }

    obterSaldo(id){
        return this.get(`/${id}/saldo`)
    }


    validar(usuario){
        const msgs = [];

        if(!usuario.nome){
            msgs.push("O campo nome é obrigatório")
        }

        if(!usuario.email){
            msgs.push("O Campo email é obrigatório")
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push("Informe um email válido")
        }

        if(!usuario.senha){
            msgs.push("O campo senha é obrigatório")
        }

        if(usuario.senha !== usuario.senhaRepeticao){
            msgs.push("As senhas precisam ser iguais")
        }

        if(msgs && msgs.length > 0) {
            throw new ErroValidacao(msgs);
        }
    }

    salvar(usuario){
        return this.post('/', usuario)
    }
}

export default UsuarioService;