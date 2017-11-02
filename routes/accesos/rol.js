var express = require('express');
var router = express.Router();
var models = require('../../models/accesos');

router.get('/listar/:sistema_id', function(request, response, next) {
    models.rol.findAll({   
        attributes: ['id', 'nombre'] ,
        where: { sistema_id : request.params.sistema_id }
    }).then(function (roles) {
        response.send(JSON.stringify(roles));
    });
});

module.exports = router;
