var express = require('express');
var constants = require('../../configs/constants');
var router = express.Router();

router.get('/', function(request, response, next) {
    data = {
        'base_url' : constants.data['base_url'],
        'static_url' : constants.data['static_url'],
        'mensaje' : false,
        'titulo_pagina' : 'Gestión de Accesos', 
        'modulo' : 'Accesos',
        'title' : 'Accesos', 
        'css' : 'dist/accesos.min.css',
        'js_top' : constants.data['static_url'],
        'menu' : '[{"url" : "accesos", "nombre" : "Accesos"},{"url" : "libros", "nombre" : "Libros"}]', 
        'items' : '[{"subtitulo":"","items":[{"item":"Gestión de Sistemas","url":"accesos/#/sistema"},{"item":"Gestión de Usuarios","url":"accesos/#/usuario"}]}]', 
        'data' : JSON.stringify({ 
            'mensaje' : false,
            'titulo_pagina' : 'Gestión de Accesos', 
            'modulo' : 'Accesos'
        }),
        'js_bottom' : 'dist/accesos.min.js',
    };

    response.render('accesos/index', { title: 'Accesos',  data: data});
});

module.exports = router;
