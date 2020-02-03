const conexao = require('../infra/conexao');

class Usuarios {

    insere(usuario) {

        return new Promise((resolve, reject) => {

            const sql = "INSERT INTO usuarios SET ?";

            conexao.query(sql, usuario, (erro, retorno) => {

                if(erro) reject("Erro ao inserir usuário: " + erro);
                else resolve({id : retorno.insertId, ...usuario});

            });

        });

    }

    buscaPorEmail(email) {

        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM usuarios WHERE email = ?";

            conexao.query(sql, email, (erro, usuario) => {

                if(erro) reject("Erro ao buscar email: " + erro);
                else resolve(usuario[0]);

            });

        });

    }

}

module.exports = new Usuarios();