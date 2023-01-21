import { database } from "../config/keys";
// import { AppDataSource} from './database.orm'

const mysql = require("mysql2");
const { promisify } = require('util')
export const pool = mysql.createPool(database);
pool.getConnection((err:any,connection:any) => {
    if(err){
        console.log(err.code)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ERR_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TOO MANY CONNECTION');
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
        if(err.code == 'ER_BAD_DB_ERROR'){
            console.log('DATABASE DOSNT EXIST');
        }
    }
    
    if(connection){
        connection.release();
        console.log('DB IS CONNECTED');
    }
    return
});
// async function main() {
//     try {
//       await AppDataSource.initialize();
//     } catch (error) {
//         console.log(error);
//     }
//   }
// main();
pool.query = promisify(pool.query)