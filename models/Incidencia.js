const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Incidencia = sequelize.define(
        "Incidencia",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false, 
            },
            hora: {
                type: DataTypes.TIME,
                allowNull: false,
            },
        },
        {
            tableName: "Incidencias", 
            timestamps: true,
        }
    );

    Incidencia.associate = (db) => {
        if (db.Codigo) {
            Incidencia.belongsTo(db.Codigo, {
                foreignKey: "id_codigo",
                as: "codigo",
            });
        }

        if (db.Camara) {
            Incidencia.belongsTo(db.Camara, {
                foreignKey: "id_camara",
                as: "camara",
            });
        }

        if (db.Turno) {
            Incidencia.belongsTo(db.Turno, {
                foreignKey: "id_turno",
                as: "turno",
            });
        }

        if (db.Usuario) {
            Incidencia.belongsTo(db.Usuario, {
                foreignKey: "id_usuario",
                as: "usuario",
            });
        }
    };

    return Incidencia;
};
