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
            codigo_Incidencia: { // Código de la cámara relacionado
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            hora: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            turno: { 
                type: DataTypes.ENUM('MAÑANA', 'TARDE', 'NOCHE'),
                allowNull: false,
            },
            state: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            id_camara: { // Relación con la Cámara
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Camaras',
                    key: 'id',
                },
            },
        },
        {
            tableName: "Incidencias", 
            timestamps: true,
        }
    );

    Incidencia.associate = (db) => {
        Incidencia.belongsTo(db.Camara, {
            foreignKey: "id_camara",
            as: "camara",
        });
    };

    return Incidencia;
};
