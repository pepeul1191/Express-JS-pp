var express = require('express');
var router = express.Router();
var models = require('../../models/accesos');

router.get('/listar/:subtitulo_id', function(request, response, next) {
    models.item.findAll({attributes: ['id', 'nombre', 'url'] ,where: { subtitulo_id : request.params.subtitulo_id }}).then(function (items) {
        response.send(JSON.stringify(items));
    });
});

module.exports = router;
