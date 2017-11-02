var express = require('express');
var router = express.Router();
var models = require('../../models/accesos');

router.get('/listar/:modulo_id', function(request, response, next) {
    models.subtitulo.findAll({   
        attributes: ['id', 'nombre'] ,
        where: { modulo_id : request.params.modulo_id }
    }).then(function (subtitulos) {
        response.send(JSON.stringify(subtitulos));
    });
});

module.exports = router;
