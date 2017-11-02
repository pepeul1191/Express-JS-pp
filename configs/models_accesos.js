const Sequelize = require('sequelize');
var database = require('./database');

var db = database.db;

const EstadoUsuario = db.define('estado_usuarios', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
});

const Usuario = db.define('usuarios', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	usuario: { type: Sequelize.STRING },
	contrasenia: { type: Sequelize.STRING },
	correo: { type: Sequelize.STRING, allowNull: false,  },
	estado_usuario_id: { type: Sequelize.INTEGER, references: {
		model: EstadoUsuario, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});

const Sistema = db.define('sistemas', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
	version: { type: Sequelize.STRING },
	repositorio: { type: Sequelize.STRING },
});

const Modulo = db.define('modulos', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
	url: { type: Sequelize.STRING },
	icono: { type: Sequelize.STRING },
	sistema_id: { type: Sequelize.INTEGER, references: {
		model: Sistema, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});

exports.db = db;
exports.usuario = Usuario;
exports.sistema = Sistema;
exports.modulo = Modulo;
exports.estado_usuario = EstadoUsuario;