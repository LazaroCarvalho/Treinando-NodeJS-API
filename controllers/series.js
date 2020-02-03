const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth');

const series = app => {

    app.use((req, res, next) => {

        const authHeader = req.headers.authorization;

        if(!authHeader)
            return res.status(401).send({erro : "Token não encontrado"});

        const partes = authHeader.split(' ');

        if(partes.length != 2)
            return res.status(401).send({"Erro" : "Token mal formatado"});

        const [ bearer, token ] = partes;

        jwt.verify(token, authConfig.secret, (erro, usuario) => {
            if(erro) res.status(401).send(erro);
            else {
                req.userId = usuario.id;
                return next();
            }
        })

    });

    app.get('/series', (req, res) => {

        const seriesDAO = app.models.Series;
        
        seriesDAO.lista()
            .then(series => {
                if(!series[0])
                    res.status(404).send({"Erro" : "Nenhuma série foi encontrada"});
                else
                    res.status(200).send(series)
            })
            .catch(erro => res.status(500).send(erro));

    });

    app.get('/series/:id', (req, res) => {

        const serieID = req.params.id;

        const seriesDAO = app.models.Series;

        seriesDAO.listaPorId(serieID)
            .then(serie => {
                if(!serie)
                    res.status(404).send({"Erro" : "Série não encontrada"});
                else
                    res.status(200).send(serie)
            })
            .catch(erro => res.status(500).send(erro));

    });

    app.post('/series', (req, res) => {

        const serie = req.body;

        const seriesDAO = app.models.Series;

        seriesDAO.insere(serie)
            .then(serie => res.status(201).send(serie))
            .catch(erro => res.status(500).send(erro));

    });

    app.put('/series/:id', (req, res) => {

        const id = req.params.id;
        const serie = req.body;
        serie.id = id;

        const seriesDAO = app.models.Series;

        seriesDAO.edita(serie)
            .then(retorno => {
                if(!retorno.affectedRows) res.status(404).status("Série não encontrada");
                else res.status(200).send(serie);
            })
            .catch(erro => res.status(500).status(erro));

    });

    app.delete('/series/:id', (req, res) => {
       
        const id = req.params.id;
        const seriesDAO = app.models.Series;

        seriesDAO.deleta(id)
            .then(resposta => {
                if(!resposta.affectedRows) res.status(404).send("Série não encontrada");
                else res.status(204).send("Série deletada com sucesso");
            })
            .catch(erro => res.status(500).send(erro));

    });

}

module.exports = series;