const conexao = require('../infra/conexao');

class Series {

    lista() {

        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM series";

            conexao.query(sql, (erro, retorno) => {

                if(erro) reject("Erro ao buscar séries: " + erro);
                else resolve(retorno);

            });

        });

    }

    listaPorId(id) {

        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM series WHERE id = ?";

            conexao.query(sql, id, (erro, retorno) => {

                if(erro) reject("Erro ao buscar série: " + erro);
                else resolve(retorno[0]);

            });

        });

    }

    insere(serie) {

        return new Promise((resolve, reject) => {

            const sql = "INSERT INTO series SET ?";

            conexao.query(sql, serie, (erro, retorno) => {

                if(erro) reject("Erro ao inserir série: " + erro);
                else resolve({"id" : retorno.insertId, ...serie});

            });

        });

    }

    edita(serie) {

        return new Promise((resolve, reject) => {

            const sql = "UPDATE series SET ? WHERE id = ?";

            conexao.query(sql, [serie, serie.id], (erro, retorno) => {

                if(erro) reject("Erro ao editar série: " + erro);
                else resolve(retorno);

            });

        });

    }

    deleta(id) {

        return new Promise((resolve, reject) => {

            const sql = "DELETE FROM series WHERE id = ?";

            conexao.query(sql, id, (erro, retorno) => {

                if(erro) reject("Erro ao excluir série: " + erro.sql);
                else resolve(retorno);

            });

        });

    }

}

module.exports = new Series();