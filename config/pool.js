
// var databaseOptions = {
//     host     : 'localhost',
//     database : 'resturant_order',
//     user     : 'root',
//     password : '',
//     port     : '3306',
//     multipleStatements: true
//   };
//   module.exports = databaseOptions;

const databaseOptions = {
  connectionLimit: 1000, //important
  host :"localhost",
  database : "resturant_order",
  user : 'root',
  password : "",
  port : "3306",
  multipleStatements : true ,
  timezone :"local",
  dateStrings: true
}
const pool = require("mysql2/promise").createPool(databaseOptions);
exports.pool = pool;