var express = require('express');
var router = express.Router();
var models = require('../../configs/models_accesos');

router.get('/listar', function(request, response, next) {
    var query = 
        'SELECT U.id AS id, U.usuario AS usuario, A.momento AS momento, U.correo AS correo ' + 
        'FROM usuarios U INNER JOIN accesos A ON U.id = A.usuario_id ' +          
        'GROUP BY U.usuario ORDER BY U.id';
    models.db.query(query, { model: models.usuario }).then(usuarios => {
        response.send(JSON.stringify(usuarios));
    })
});

module.exports = router;