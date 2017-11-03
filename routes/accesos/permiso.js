var express = require('express');
var router = express.Router();
var models = require('../../models/accesos');

router.get('/listar/:sistema_id', function(request, response, next) {
    models.permiso.findAll({attributes: ['id', 'nombre', 'llave'] , where: { sistema_id : request.params.sistema_id }}).then(function (permisos) {
        response.send(JSON.stringify(permisos));
    });
});

router.get('/listar_asociados/:sistema_id/:rol_id', function(request, response, next) {
    var query = `
        SELECT T.id AS id, T.nombre AS nombre, (CASE WHEN (P.existe = 1) THEN 1 ELSE 0 END) AS existe, T.llave AS llave FROM 
        (
        SELECT id, nombre, llave, 0 AS existe FROM permisos WHERE sistema_id = ? 
        ) T
         LEFT JOIN 
        ( 
        SELECT P.id, P.nombre,  P.llave, 1 AS existe  FROM permisos P 
        INNER JOIN roles_permisos RP ON P.id = RP.permiso_id 
        WHERE RP.rol_id = ?
        ) P
        ON T.id = P.id
        `;
    models.db.query(query, { replacements: [request.params.sistema_id, request.params.rol_id], model: models.usuario }).then(permisos => {
        response.send(JSON.stringify(permisos));
    })
});

module.exports = router;