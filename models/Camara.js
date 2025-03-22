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
            id_Jurisdiccion: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Jurisdicciones',
                    key: 'id',
                },
            },
            state: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
        },
        {
            tableName: "Camaras",
            timestamps: true,
        }
    );

    Camara.associate = (db) => {
        Camara.belongsTo(db.Jurisdiccion, {
            foreignKey: "id_Jurisdiccion",
            as: "jurisdiccion",
        });

        Camara.hasMany(db.Incidencia, {
            foreignKey: "id_camara",
            as: "incidencias",
        });
    };

    return Camara;
};
