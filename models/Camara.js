const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Camara = sequelize.define(
        "Camara",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ubicacion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "Camaras",
            timestamps: true,
        }
    );

    Camara.associate = (db) => {
        if (db.Jurisdiccion) {
            Camara.belongsTo(db.Jurisdiccion, {
                foreignKey: "id_Jurisdiccion",
                as: "jurisdiccion",
            });
        }

        if (db.Incidencia) {
            Camara.belongsTo(db.Incidencia, {
                foreignKey: "id_camara",
                as: "incidencias",
            });
        }
    };

    return Camara;
};
