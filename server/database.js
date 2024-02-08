import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const urlDatabase = "mysql://root:CE4BhAH1Fc3ah53dgGcBcA4HdadgaH3A@roundhouse.proxy.rlwy.net:44455/railway"

export const db = mysql.createConnection(
urlDatabase
)

db.connect((err)=>{
    if(err) throw err;
    console.log("database is connected")
})