import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config()

const urlDatabase = "mysql://root:LJ1ctgKMGVYCDJd2ziDn@containers-us-west-192.railway.app:6210/railway"

export const db = mysql.createConnection(
urlDatabase
)

db.connect((err)=>{
    if(err) throw err;
    console.log("database is connected")
})