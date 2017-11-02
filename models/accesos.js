const Sequelize = require('sequelize');
var database = require('../configs/database');

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

const Acceso = db.define('accesos', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	momento: { type: Sequelize.STRING },
	usuario_id: { type: Sequelize.INTEGER, references: {
		model: Usuario, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});

const Sistema = db.define('sistemas', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
	version: { type: Sequelize.STRING },
	repositorio: { type: Sequelize.STRING },
});

const Rol = db.define('roles', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
	llave: { type: Sequelize.STRING, allowNull: false,  },
	sistema_id: { type: Sequelize.INTEGER, references: {
		model: Sistema, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});

const Permiso = db.define('permisos', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
	sistema_id: { type: Sequelize.INTEGER, references: {
		model: Sistema, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
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

const Subtitulo = db.define('subtitulos', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
	modulo_id: { type: Sequelize.INTEGER, references: {
		model: Modulo, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});

const Item = db.define('items', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
	url: { type: Sequelize.STRING },
	subtitulo_id: { type: Sequelize.INTEGER, references: {
		model: Subtitulo, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});

exports.db = db;

exports.acceso = Acceso;
exports.estado_usuario = EstadoUsuario;
exports.item = Item;
exports.modulo = Modulo;
exports.permiso = Permiso;
exports.rol = Rol;
exports.sistema = Sistema;
exports.subtitulo = Subtitulo;
exports.usuario = Usuario;