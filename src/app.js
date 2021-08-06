const express = require('express');
const logger = require('morgan');
const bodyParser= require('body-parser');
const path = require('path');
const app = express();

const indexRoutes =require('./routes/index-route');

// Settings
app.set('AppName', 'Primera vez con Expres');
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs'); //motores de plantillas
app.set('views',path.join(__dirname, 'views'))

app.listen(app.get('port'), () =>{
    console.log(app.get('AppName'));
    console.log('Servidor en el puerto', app.get('port'));
});


//Middlewares
app.use(logger('dev')); 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser);
//app.use(express.bodyParser());
//app.use(bodyParser.json());

//Routes

app.use('/', indexRoutes);
