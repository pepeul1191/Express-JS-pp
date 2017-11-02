var express = require('express');
var router = express.Router();
var models = require('../../models/accesos');

router.get('/listar', function(request, response, next) {
    models.sistema.findAll({
        attributes: ['id', 'nombre', 'version', 'repositorio']
    }).then(function (sistemas) {
        response.send(JSON.stringify(sistemas));
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

router.post('/guardar', function(request, response, next) {
    var data = JSON.parse(request.body.data);
    var nuevos = data['nuevos'];
    var editados = data['editados'];
    var eliminados = data['eliminados'];
    var rpta = []; var array_nuevos = [];
    //http://docs.sequelizejs.com/manual/tutorial/transactions.html
    /*
    rpta = models.db.transaction(function (t) {
        nuevos.forEach(function(nuevo) {
            models.sistema.create({
                nombre: nuevo['nombre'],
                version: nuevo['version'],
                repositorio: nuevo['repositorio']
            });
        });
        editados.forEach(function(editado) {
            models.sistema.findOne(
                    { where: { id: editado['id'] } }
                ).on('success', function (sistema) {
                    if (sistema) {
                        sistema.updateAttributes({
                            nombre: editado['nombre'],
                            version: editado['version'],
                            repositorio: editado['repositorio']
                        }).success(function () {
                            console.log("XD");
                        })
                    }
                });
        });
        eliminados.forEach(function(eliminado) {
            console.log(eliminado);
        });
        */
    }).then(function (result) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
        console.log("++++++++ 1. RESULT ++++++++");
        console.log(result);
        console.log("++++++++ 2. RESULT ++++++++");
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log("++++++++ 1. ERR ++++++++");
        console.log(err);
        console.log("++++++++ 2. ERR ++++++++");
        return err;
    });
    response.send(JSON.stringify(rpta));
});

module.exports = router;
