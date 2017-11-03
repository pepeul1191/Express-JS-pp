var express = require('express');
var router = express.Router();
var models = require('../../models/accesos');

router.get('/listar/:sistema_id', function(request, response, next) {
    models.modulo.findAll({attributes: ['id', 'nombre', 'url'] , where: { sistema_id : request.params.sistema_id }}).then(function (modulos) {
        response.send(JSON.stringify(modulos));
    });
});

module.exports = router;
