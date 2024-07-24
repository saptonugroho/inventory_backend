import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Stok = db.define('stok',{
    idproduk:{
        type: DataTypes.INTEGER
    },
    idtoko:{
        type: DataTypes.INTEGER
    },
    stok:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
})

export default Stok;