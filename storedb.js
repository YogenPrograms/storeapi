const { error } = require('console');
const mysql= require ('mysql')
const con= mysql.createConnection({
host: 'localhost',
user:'root',
password:'',
database:"phpmyadmin"


});
con.connect((err)=>{
if(err)
{
    console.log("error in correctin",err)
}

})
module.exports=con;

