var express = require('express');
var router = express.Router();
var models = require('../../models/accesos');

router.get('/listar', function(request, response, next) {
    var query = `
        SELECT U.id AS id, U.usuario AS usuario, A.momento AS momento, U.correo AS correo 
        FROM usuarios U INNER JOIN accesos A ON U.id = A.usuario_id      
        GROUP BY U.usuario ORDER BY U.id
    `;
    models.db.query(query, { model: models.usuario }).then(usuarios => {
        response.send(JSON.stringify(usuarios));
    })
});

router.get('/obtener_usuario_correo/:usuario_id', function(request, response, next) {
    models.usuario.findOne({   
        attributes: ['usuario', 'correo'] ,
        where: { id : request.params.usuario_id }
    }).then(function (usuario) {
        response.send(JSON.stringify(usuario));
    });
});

router.get('/logs/:usuario_id', function(request, response, next) {
    models.acceso.findAll({   
        attributes: ['id', 'momento'] ,
        where: { usuario_id : request.params.usuario_id }
    }).then(function (logs) {
        response.send(JSON.stringify(logs));
    });
});

router.get('/listar_sistemas/:usuario_id', function(request, response, next) {
    var query = `
        SELECT T.id AS id, T.nombre AS nombre, (CASE WHEN (P.existe = 1) THEN 1 ELSE 0 END) AS existe FROM
        (
            SELECT id, nombre, 0 AS existe FROM sistemas
        ) T
        LEFT JOIN
        (
            SELECT S.id, S.nombre, 1 AS existe FROM sistemas S
            INNER JOIN usuarios_sistemas US ON US.sistema_id = S.id
            WHERE US.usuario_id = ?
        ) P
        ON T.id = P.id
    `;
    models.db.query(query, { replacements: [request.params.usuario_id], model: models.usuario }).then(sistemas => {
        response.send(JSON.stringify(sistemas));
    })
});

router.get('/listar_permisos/:sistema_id/:usuario_id', function(request, response, next) {
    var query = `
        SELECT T.id AS id, T.nombre AS nombre, (CASE WHEN (P.existe = 1) THEN 1 ELSE 0 END) AS existe, T.llave AS llave FROM
        (
            SELECT id, nombre, llave, 0 AS existe FROM permisos WHERE sistema_id = ?
        ) T
        LEFT JOIN
        (
            SELECT P.id, P.nombre,  P.llave, 1 AS existe  FROM permisos P 
            INNER JOIN usuarios_permisos UP ON P.id = UP.permiso_id
            WHERE UP.usuario_id = ?
        ) P
        ON T.id = P.id
    `;
    models.db.query(query, { replacements: [request.params.sistema_id, request.params.usuario_id], model: models.usuario }).then(permisos => {
        response.send(JSON.stringify(permisos));
    })
});

router.get('/listar_roles/:sistema_id/:usuario_id', function(request, response, next) {
    var query = `
        SELECT T.id AS id, T.nombre AS nombre, (CASE WHEN (P.existe = 1) THEN 1 ELSE 0 END) AS existe FROM
        (
            SELECT id, nombre, 0 AS existe FROM roles WHERE sistema_id = ?
        ) T
        LEFT JOIN
        (
            SELECT R.id, R.nombre, 1 AS existe  FROM roles R 
            INNER JOIN usuarios_roles UR ON R.id = UR.rol_id
            WHERE UR.usuario_id = ?
        ) P
        ON T.id = P.id
    `;
    models.db.query(query, { replacements: [request.params.sistema_id, request.params.usuario_id], model: models.usuario }).then(permisos => {
        response.send(JSON.stringify(permisos));
    })
});

module.exports = router;