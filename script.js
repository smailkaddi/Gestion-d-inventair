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
    app.get('/add',(req,res, next)=>{
             res.render('addProduit',{
                 pageTitle : 'Add new produit',
                 items:''      
             })

    });

    app.post('/add',(req, res) => { 
        let data = {id_P: req.body.id_P, nameP: req.body.nameP,  categorie: req.body.categorie,  quantité: req.body.quantité, price: req.body.price, id_F: req.body.id_F, id_R: req.body.id_R };
        let sql = "INSERT INTO produit SET ?";
        let query = con.query(sql, data,(err, results) => {
          if(err) throw err;

          res.redirect(baseURL);
                       
              
                
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

    app.get('/fournisseur',(req, res) => {
       
        const sql = "SELECT * FROM fournisseur";
        let query = con.query(sql, (err, result) => {
            if(err) throw err;
            res.render('fournisseur', {
             
                pageTitle : 'Provider',
                items : result
            });
        });
    });
    
    // ADD new fornisseur
    
    app.get('/add1',(req, res) => {
        res.render('addfournisseur', {
         
            pageTitle : 'Add new Provider ',
            items : ''
        });
    });
       
    app.post('/add1',(req, res) => { 
        let data = {name: req.body.name, address: req.body.address, télé: req.body.télé, email: req.body.email, id_P: req.body.id_P, id_F: req.body.id_F,};
        let sql = "INSERT INTO fournisseur SET ?";
        let query = con.query(sql, data,(err, results) => {
          if(err) throw err;
          res.redirect('/fournisseur');
        });
    });
 


    app.get('/delete-fournisseur/:id', (req, res) => {
        const userId = req.params.id;
        let sql = `DELETE from  fournisseur where id_P = ${userId}`;
        let query = con.query(sql,(err, result) => {
            res.redirect('/fournisseur');
        });
    });

    app.get('/',(req, res) => {
        let sql = "SELECT rayon.name, rayon.img, produit.id_P,  rayon.nameP, rayon.ID FROM rayon INNER JOIN produit ON produit.id_P = rayon.id_P ";
        let query = con.query(sql, (err, result) => {
            if(err) throw err;
            res.render('rayon', {
            
                pageTitle : 'Stock Management',
                items : result
            });
        });
    });
    
    // ADD new rayon


    
app.get('/rayon', (req, res, next) => {
        const sql = "SELECT * FROM rayon";
        const query = con.query(sql, (err, result) => {
            if(err)throw err;
                res.render('rayon', {
                       
                        items : result
                });
                    
        })
    });
    app.get('/add2',(req,res, next)=>{
             res.render('addrayon',{
                 pageTitle : 'Add new produit',
                 items:''      
             })

    });

    

       
    app.post('/add2',(req, res) => { 
        let data = {name: req.body.name, img: req.body.img, id_P: req.body.id_P};
        let sql = "INSERT INTO rayon SET ?";
        let query = con.query(sql, data,(err, results) => {
          if(err) throw err;
          res.redirect('rayon');
        });
    });

    
      app.get('/delete-rayon/:id', (req, res) => {
        const userId = req.params.id;
        let sql = `DELETE from rayon where id_P = ${userId}`;
        let query = con.query(sql,(err, result) => {
            if(err) throw err;
            res.redirect('/rayon');
        });
    });




 

// app.get('/',function(req,res){
//         res.sendFile(path.join(__dirname + '/views/index.ejs'));
// });



app.listen(3000,()=>{
        console.log('rinning at localhost')
    
});
