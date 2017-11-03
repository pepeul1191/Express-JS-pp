var express = require('express');
var router = express.Router();
var models = require('../../models/accesos');

router.get('/listar', function(request, response, next) {
    models.sistema.findAll({attributes: ['id', 'nombre', 'version', 'repositorio']}).then(function (sistemas) {
        response.send(JSON.stringify(sistemas));
    });
});

router.get('/detalle/:id', function(request, response, next) {
    models.sistema.findAll({attributes: ['id', 'nombre', 'version', 'repositorio'], where: { id : request.params.id }}).then(function (sistema) {
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
    return models.db.transaction(function (t) {
        var promises = [];
        eliminados.forEach(function(eliminado) {
            models.sistema.destroy({where: {id: eliminado}}, {transaction: t});
        });
        editados.forEach(function(editado) {
            models.sistema.update({nombre: editado['nombre'], version: editado['version'], repositorio: editado['repositorio']}, {where: {id: editado['id']}}, {transaction: t});
        });
        nuevos.forEach(function(nuevo) {
            var newPromises = models.sistema.create({nombre: nuevo['nombre'], version: nuevo['version'], repositorio: nuevo['repositorio']}, {transaction: t});
             promises.push(newPromises);
         });
        return Promise.all(promises).then(function(nuevos_promises) {
            var promises = [];
            nuevos_promises.forEach(function(promise){
                promises.push(promise['id']);
            });
            return Promise.all(promises);
        });
    }).then(function (result) {
        console.log("++++++++ 1. RESULT ++++++++");
        console.log(result);
        console.log("++++++++ 2. RESULT ++++++++");
        response.send(JSON.stringify(result));
    }).catch(function (err) {
        console.log("++++++++ 1. ERR ++++++++");
        console.log(err);
        response.send('error!!!');
        console.log("++++++++ 2. ERR ++++++++");
    });
});

module.exports = router;
