const { validationResult } = require('express-validator');
const UsuarioValidator = require('../validators/UsuarioValidator');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const gerarToken = idUsuario => {

    const token = jwt.sign(idUsuario, authConfig.secret, {
        "expiresIn" : 60
    });

    return token;

}

const autenticacao = (app) => {

    app.post('/registrar',
        UsuarioValidator.validacoes(),
        (req, res) => {

            const erros = validationResult(req);

            if(!erros.isEmpty())
                return res.status(400).send(erros);

            const usuario = req.body;
            const usuarioDAO = app.models.Usuarios;

            usuarioDAO.insere(usuario)
                .then(resposta => {
                    const token = gerarToken({"id" : resposta.id});
                    res.status(201).send({usuario, token});
                })
                .catch(erro => res.status(500).send(erro));

        });

    app.post('/autenticar', async (req, res) => {

        const { email, senha } = req.body;

        const usuarioDAO = app.models.Usuarios;

        const usuario = await usuarioDAO.buscaPorEmail(email)
                                        .catch(erro => res.status(500).send(erro));

        if(!usuario)
            res.status(404).send({"Erro" : "Usuário não cadastrado"});

        if(usuario.senha != senha)
            res.status(404).send({"Erro" : "Senha inválida"});

        const token = gerarToken({"id" : usuario.id});

        res.status(200).send({usuario, token});

    })

}

module.exports = autenticacao;