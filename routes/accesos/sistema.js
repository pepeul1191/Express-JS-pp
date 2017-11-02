var express = require('express');
var router = express.Router();
var models = require('../../configs/models_accesos');

router.get('/listar', function(request, response, next) {
    models.sistema.findAll({
        attributes: ['id', 'nombre', 'version', 'repositorio']
    }).then(function (sistemas) {
        response.send(sistemas);
    });
});

router.get('/detalle/:id', function(request, response, next) {
    models.sistema.findAll({   
        attributes: ['id', 'nombre', 'version', 'repositorio'] ,
        where: { id : request.params.id }
    }).then(function (sistema) {
        response.send(sistema);
    });
});

module.exports = router;
