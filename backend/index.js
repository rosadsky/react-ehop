const express = require('express')
const app = express()
const mysql = require('mysql')
var cors = require('cors');

app.use(express.json());
app.use(cors());

let connectionMade = false;
let connection = null;
function connectDB() {
    if(connectionMade===false) {
        connection = mysql.createConnection({
            host     : 'mydb',
            user     : 'root',
            password : 'root',
            database : 'mydb'
        });
        connection.connect(err =>{
            if(!err) {
                connectionMade = true;
            }
        });
    }
}



app.get('/createproducts', function(req, res,next) {
    
   
    /*connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE tprodukty (id INT AUTO_INCREMENT PRIMARY KEY, image VARCHAR(255), nazov VARCHAR(255))";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
      });
   

      var sql = "INSERT INTO tprodukty ( image,nazov) VALUES ?";
      var values = [
        ['image_path_here', 'teplerozky'],
        ['image_path_here2', 'iPhone'],
        ['image_path_here3', 'Samsunge']
        ];

        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
             */  


})

app.post('/vlozitobjednavku',(req,res,next)=> {

    console.log(req)

})

app.get('/api/get',(req,res,next) => {
    
    connectDB();

    res.statusCode = 200; //HTTP Ok
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    connection.query("SELECT * FROM Produkt LIMIT 50", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.get('/api/get/orders',(req,res,next) => {
    
    connectDB();

    res.statusCode = 200; //HTTP Ok
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    connection.query("SELECT * FROM Objednavka LIMIT 50", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.get('/api/get/orderitems',(req,res,next) => {
    
    connectDB();

    res.statusCode = 200; //HTTP Ok
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    connection.query("SELECT * FROM ObjednavkaProdukt LIMIT 50", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.get('/api/get/customer',(req,res,next) => {
    
    connectDB();

    res.statusCode = 200; //HTTP Ok
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    connection.query("SELECT * FROM Zakaznik LIMIT 50", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.get('/', function(req, res) {
    res.send("hello world")
}) 

app.listen(8080,() =>{
    console.log("running on port 8080")
})
