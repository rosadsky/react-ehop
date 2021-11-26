const express = require('express')
const app = express()
const mysql = require('mysql')

app.use(express.json())




app.get('/createproducts', function(req, res) {
    
    connection = mysql.createConnection({
        host     : 'mydb',
        user     : 'root',
        password : 'root',
        database : 'produkty'
    });
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE tprodukty (id INT AUTO_INCREMENT PRIMARY KEY, image VARCHAR(255), nazov VARCHAR(255))";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
      });

})

app.get('/', function(req, res) {
    res.send("hello world")
})

app.listen(8080,() =>{
    console.log("running on port 8080")
})
