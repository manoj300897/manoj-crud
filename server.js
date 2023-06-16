const express = require("express");
const cor = require("cors");
const bodyparse = require("body-parser");
const db = require("mysql");
const { Pool } = require('pg');
const add = express();
add.use(cor());
add.use(bodyparse.json());
add.use(express.json());
add.use(express.static("public"));
// let conn = db.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "crud"
//     }
// )
const conn = new conn({
    user: 'sgpostgres',
    host: 'SG-PostgreNoSSL-14-pgsql-master.devservers.scalegrid.io',
    database: 'postgres',
    password: 'password',
    port: 5432,
  })
conn.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("database connected");
    }
}
)
//getmethod
add.get("/getdetails", (request, response) => {
    let sql = "select * from customer_details";
    conn.query(sql, (error, result) => {
        if (error) {
            response.send(error);
        } else {
            response.send(result);
        }
    })
})
//delete method
add.post("/delete", (request, response) => {
    let Id = request.body.Id;
    let sql = 'delete from customer_details where Id=?';
    conn.query(sql, [Id], (error, result) => {
        if (error) {
            let sel = { "status": "error" };
            response.send(sel);
        } else {
            let sel = { "status": "success" };
            response.send(sel);
        }
    })
})
//post method
add.post("/insertdetails", (request, response) => {
    let { Name, Address, City, Pincode, Country } = request.body;
    let insert = "INSERT INTO customer_details(Name,Address,City,Pincode,Country) VALUES(?,?,?,?,?);";
    conn.query(insert, [Name, Address, City, Pincode, Country], (error, result) => {
        if (error) {
            let sel = { "status": "error" };
            response.send(sel);
        } else {
            let sel = { "status": "success" };
            response.send(sel);
        }
    });

})
//update method
add.get('/Update/:Id',(request,response)=>{
    let {Id} = request.params;
    let sql = 'select * from customer_details where Id=?';
    conn.query(sql,[Id],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})
add.put('/Updatedata/:Id',(request,response)=>{
    let Id = request.params.Id;
    let {Name, Address, City, Pincode, Country} = request.body;
    let sql = 'update customer_details set Name=?,Address=?,City=?,Pincode=?,Country=? where Id=?';
    conn.query(sql,[Name, Address, City, Pincode, Country, Id],(error,result)=>{
        if(error){
            let sel = {"status":"error"};
            response.send(sel);
        }
        else{
            let sel = {"status":"success"};
            response.send(sel)
        }  

})
})

add.listen(3110, () => { console.log("server running on:3110") });

