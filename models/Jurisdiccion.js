const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Jurisdiccion = sequelize.define(
        "Jurisdiccion",
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
            state: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
        },
        {
            tableName: "Jurisdicciones",
            timestamps: true,
        }
    );

    Jurisdiccion.associate = (models) => {
        if (models.Camara) {
            Jurisdiccion.hasMany(models.Camara, {
                foreignKey: "id_Jurisdiccion",
                as: "camaras",
            });
        }
    };

    return Jurisdiccion;
};
