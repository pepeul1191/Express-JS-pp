var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
    data = {
        'base_url' : 'http://localhost:3000/',
        'static_url' : 'http://localhost:3000/',
        'mensaje' : false,
        'titulo_pagina' : 'Gestión de Accesos', 
        'modulo' : 'Accesos',
        'title' : 'Accesos', 
        'css' : 'dist/accesos.min.css',
        'js_top' : 'http://localhost:3000/',
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
