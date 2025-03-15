const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {
    const Usuario = sequelize.define("Usuario", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        nombreApellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alias: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "Usuarios",
        timestamps: true,
    });

    Usuario.associate = (db) => {
        Usuario.belongsTo(db.Rol, {
            foreignKey: "id_rol",
            as: "rol",
        });
        Usuario.hasMany(db.Incidencia, {
            foreignKey: "id_usuario",
            as: "incidencias",
        });
    };

    return Usuario;
};