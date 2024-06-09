import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Role = db.define('role',{
    role:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
})

export default Role;