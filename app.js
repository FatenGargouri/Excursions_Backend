var express=require('express');
var bodyParser=require('body-parser');
var app=express();
const cors=require('cors');
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());
// Configurer la base de données
/*const dbConfig = require('./Config/excurtionDB.Config.js');*/
const mongoose = require('mongoose');
const { Server } = require('mongodb');
var loginRoutes=require("./routes/authentification")
app.use('/api/auth', loginRoutes);
/* Si on veut utiliser mongoose dans différents emplacements il doit être vu
en mode global : */
mongoose.Promise = global.Promise;
// Connexion à la base de données
/*mongoose.connect(dbConfig.url,{
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
    }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
    });
app.get('/', (req, res) =>{ 
    res.json({"message":"Welcome"});  
});*/
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to the database");
        }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
        });
    app.get('/', (req, res) =>{ 
        res.json({"message":"Welcome"});  
    });
require('./routes/client.routes.js')(app);
require('./routes/contact.routes.js')(app);
require('./routes/excurtions.routes.js')(app);
require('./routes/facture.routes.js')(app);
require('./routes/paiement.routes.js')(app);
app.listen(3006,()=>{console.log("Node server is running..")});