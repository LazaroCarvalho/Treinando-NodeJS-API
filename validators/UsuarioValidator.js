const { check } = require('express-validator');
const usuarioDAO = require('../models/Usuarios');

class UsuarioValidator {

    static validacoes() {

        return [

            check('nome').isLength({ min : 3, max : 15 })
                .withMessage("O nome deve ter entre 3 e 15 caracteres"),
            
            check('email').isEmail()
                .withMessage("Insira um email válido!"),
                
            check('email').isLength({ min : 3, max : 50})
                .withMessage("O email deve ter entre 3 e 50 caracteres"),

            check('senha').isLength({ min : 8, max : 15})
                .withMessage("A senha deve ter entre 8 e 15 caracteres"),

            check('email').custom(email => {
                return usuarioDAO.buscaPorEmail(email)
                    .then(usuario => {
                        if(usuario)
                            return Promise.reject("Email já cadastrado");
                    })
            })

        ]

    }

}

module.exports = UsuarioValidator;