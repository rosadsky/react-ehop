const express = require('express')
const app = express()
const mysql = require('mysql')
var cors = require('cors');
var shortid = require('shortid');

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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


  app.get('/howto',(req,res,next) => {
    
    connectDB();

    connection.query("SHOW CREATE TABLE Objednavka", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})
 

app.get('/createproducts', function(req, res,next) {
    
    connectDB();
        //"CREATE TABLE `Zakaznik` (\n  `ID` int NOT NULL,\n  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,\n  `meno` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,\n  `ulica` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,\n  `cislo` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,\n  `mesto` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,\n  `psc` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,\n  PRIMARY KEY (`ID`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3"}
    
        console.log("Connected!");
        var sql = "CREATE TABLE Produkt (ID int NOT NULL, Nazov varchar(45) NOT NULL,Image text,Cena float NOT NULL,PRIMARY KEY (ID)) ENGINE=InnoDB ";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
    

        console.log("Connected!");
        var sql = "CREATE TABLE Zakaznik (ID int NOT NULL, email varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,meno varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,ulica varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,cislo varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,mesto varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,psc varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL, PRIMARY KEY (ID)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });

        console.log("Connected!");
        //var sql = "" ;
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
   
      /*
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
    connectDB();

    let customer_id = getRandomInt(1000,2000);
    let email = req.body.email;
    let meno = req.body.meno;
    let ulica = req.body.ulica;
    let cislo_domu= req.body.cislo_domu;
    let mesto = req.body.mesto;
    let psc = req.body.psc;
    let objednavka_id = getRandomInt(2001,3000);
    let stav = "nezaplatene";
    let produkty_objednavka = req.body.produkty_objednavka;

    var sql = "INSERT INTO Zakaznik (ID,email, meno, ulica, cislo,mesto,psc) VALUES (?,?,?,?,?,?,?)";
    connection.query(sql,[customer_id,email,meno,ulica,cislo_domu,mesto,psc], function (err, result) {
      if (err) throw err;
      console.log(" vlozeny zakaznik");
    });

    sql_objednavka = "INSERT INTO Objednavka (ID,customer_id, stav) VALUES (?,?,?)";
    connection.query(sql_objednavka,[objednavka_id,customer_id,stav], function (err, result) {
      if (err) throw err;
      console.log("objednavka vlozena");
    });

    for(var product_id in produkty_objednavka) {
        console.log(produkty_objednavka[product_id]); // pocet produktov
        
        let produkty_objednavka_id = getRandomInt(3001,4000);


        sql_objednavka_produkt = "INSERT INTO ObjednavkaProdukt (ID,Order_ID, Product_ID,Quantity) VALUES (?,?,?,?)";
        connection.query(sql_objednavka_produkt,[produkty_objednavka_id,objednavka_id,product_id,produkty_objednavka[product_id]], function (err, result) {
            if (err) throw err;
            console.log("produkt do objednavky vlozen");
    });

    }





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

app.put('/api/update',(req,res) => {

    let objednavka_id = req.body.objednavka_id;
    let stav = req.body.stav;

    console.log(typeof objednavka_id )

    sql_update = "UPDATE Objednavka SET stav = ? WHERE ID = ?"

    connection.query(sql_update,[stav,objednavka_id], function (err, result) {
        if (err) throw err;
        console.log("stav bol zmeneny");
});

    console.log(req.body)
})

app.get('/api/get/reklama',(req,res) => {
    
    connectDB();
    res.statusCode = 200; //HTTP Ok
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    connection.query("SELECT * FROM Reklama LIMIT 50", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

app.put('/api/kliknutie',(req,res) => {
    connectDB();
    let mysql_reklama = "UPDATE Reklama SET kliknutia = kliknutia + 1 WHERE id = 'reklama'";

    connection.query(mysql_reklama, function (err, result) {
        if (err) throw err;
        console.log("kliknutia boli pripocitane");
    });

    console.log("KLIKNUTE NA REKLAMU")

})

app.put('/api/zmenalinku',(req,res) => {
    connectDB();

    let link = req.body.link;
    
    let mysql_reklama_link = "UPDATE Reklama SET link = ? WHERE id = 'reklama'";

    connection.query(mysql_reklama_link,[link], function (err, result) {
        if (err) throw err;
        console.log("link bol zmeneny");
    });
    
    
    console.log(req.body)

})

app.listen(8080,() =>{
    console.log("running on port 8080")
})
