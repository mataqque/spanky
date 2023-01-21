var execsql = require('./execute');
require('dotenv').config();
// console.log(process.env.HOST_DATABASE);
var dbConfig = {
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    port: 3306,
    password: process.env.PASSWORD,
};
var connected;
var sqlFile = __dirname + '/db.sql';

var callback = function(err,results){
    if (err){
        if(err.code == "ER_DB_CREATE_EXISTS"){
            console.log('Already database exist')
        }
        connected.end()
        return;
    }else{
        connected.end()
    }
}

var connected = execsql.config(dbConfig).exec('USE project;',(err,result)=>{
    if(err){
        console.log('db-error:',err.code)
    }
    return
}).execFile(sqlFile,callback)