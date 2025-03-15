const {DataTypes} =require("sequelize");
const { sequelize } = require("../db_connection");

module.exports=(sequelize)=> {
    const Jurisdiccion = sequelize.define("Juridisccion", {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },{
        tableName: "Jurisdicciones",
        timestamps: true,
    });


    Jurisdiccion.associate=(db)=>{
        Jurisdiccion.hasMany(db.Camara,{
            foreignkeys: "id_jurisdccion",
            as:"camaras"
        });
    };
    return Jurisdiccion

};