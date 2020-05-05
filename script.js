const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended :false }));
app.use(express.static(path.join(__dirname,"public")));

app.set('view engine', 'ejs');
app.set('views', 'views');


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "database"
});



const baseURL = 'http://localhost:3000/'


con.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database is Connected');
}); 

app.get('/', (req, res, next) => {
        const sql = "SELECT * FROM produit";
        const query = con.query(sql, (err, result) => {
            if(err)throw err;
                res.render('produit', {
                       
                        pageTitle : 'produit',
                        items : result
                });
                    
        })
    });
    app.get('/produit/add',(req,res, next)=>{
             res.render('addProduit',{
                 pageTitle : 'Add new produit',
                 produit:''      
             })

    });

    app.post('/produit/add',(req, res) => { 
        let data = {id_P: req.body.id_P, nameP: req.body.nameP,  categorie: req.body.categorie,  quantité: req.body.quantité, price: req.body.price, id_F: req.body.id_F, id_R: req.body.id_R };
        let sql = "INSERT INTO produit SET ?";
        let query = con.query(sql, data,(err, results) => {
          if(err) throw err;
          res.render('/')
                       
              
                
        });
            
            
    });
    app.get('/delete/:id', (req, res) => {
        const userId = req.params.id;
        let sql = `DELETE from produit where id_P = ${userId}`;
        let query = con.query(sql,(err, result) => {
            if(err) throw err;
            res.redirect(baseURL);
        });
    });
    
app.get('/edit/:id',(req, res) => {

    const authorId = req.params.id;
    let sql = `Select * from produit where id_P = ${authorId}`;
    let query = con.query(sql,(err, result) => {
        if(err) throw err;
        res.render('editproduit', {
           
            pageTitle : "Editing Product: " ,
            item : result
        });
    });
});

app.post('/edit/:id',(req, res) => {
  
    let userId = req.body.id_P
      let sql = `UPDATE produit SET name_p='${req.body.name_p}', category='${req.body.category}', price='${req.body.price}', quantité='${req.body.quantité}', id_R='${req.body.id_R}' WHERE id_P =${userId}`;
      let query = con.query(sql,(err, results) => {
        if(err) throw err;
        res.redirect(baseURL);
      });
  });


//  Delete some data
app.get('/delete/:id', (req, res) => {
    const userId = req.params.id;
    let sql = `DELETE from produit where id_P = ${userId}`;
    let query = con.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect(baseURL);
    });
});

    
app.get('/fornisseur/:id',(req, res) => {
    id = req.params.id;
    let sql = "SELECT fornisseur.id_P, fornisseur.name, fornisseur.address, fornisseur.télé, fornisseur.email, produit.id_P, produit.name_p FROM fornisseur INNER JOIN produit ON fornisseur.id_P = produit.id_P AND fornisseur.id_P = '" +id+ "' ";
    let query = con.query(sql, (err, result) => {
        if(err) throw err;
        res.render('fornisseur', {
        
            pageTitle : 'Provider',
            items : result
        });
    });
});

// ADD new fornisseur

app.get('/add/fornisseur',(req, res) => {
    res.render('addfornisseur', {
   
        pageTitle : 'Add new Provider ',
        items : ''
    });
});
   
app.post('/add/fornisseur',(req, res) => { 
    let data = {name: req.body.name, address: req.body.address, télé: req.body.télé, email: req.body.email, id_P: req.body.id_P};
    let sql = "INSERT INTO fornisseur SET ?";
    let query = con.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect(baseURL);
    });
});



//  Delete some data
app.get('/delete-fornisseur', (req, res) => {
    let sql = `DELETE from fornisseur`;
    let query = con.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect(baseURL);
    });
});
    


// app.get('/',function(req,res){
//         res.sendFile(path.join(__dirname + '/views/index.ejs'));
// });



app.listen(3000,()=>{
        console.log('rinning at localhost')
    
});
