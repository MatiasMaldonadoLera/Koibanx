const express = require('express');
const router = express.Router();
require('../libs/db-connection');

const Comercio = require('../model/Comercio');
const {check, validationResult}= require('express-validator');

var ControllersComercio = require('../controllers/comercio');

// API routes
// authentication middleware
router
  .route("/stores")
  .all(function (req,res,next) {

    const auth ={login: 'test@koibanx.com', password: 'test123'} 
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (login && password && login === auth.login && password === auth.password) {
        return next()
      };
  res.set('WWW-Authenticate-Express', 'Basic realm="401"')
  res.status(401).send('Autenticacion Requerida.') 
})
  .get(ControllersComercio.findQueryComercioModels)
  .post([
      check('n_comercio').isLength({min:3}).withMessage("El campo minimo es de 3 caracteres"),
      check('concepto').notEmpty().withMessage("No debe estar el campo vacio"),
      check('n_cuit').notEmpty().withMessage("No debe estar el campo vacio"),
      check('n_activo').isBoolean().notEmpty().withMessage("No debe estar el campo vacio y debe ser true o false"),
      check('n_balance').isNumeric().notEmpty().withMessage("No debe estar el campo vacio y debe ser numerico"),
      check('n_ultVenta').trim().isDate().notEmpty().withMessage("No debe estar el campo vacio. Formato yyyy-mm-dd")
    ],ControllersComercio.addComercio);
 // .get(ControllersComercio.findComercioModels)
  //.get(ControllersComercio.findAllComercioModels)

router
  .route("/stores/:id")
  .get(ControllersComercio.findById)
  .put(ControllersComercio.updateComercio)
  .delete(ControllersComercio.deleteComercio);

router.get('/home', (req,res)=>{
    Comercio.find({}, (error, comercios)=>{
        if(error) throw error;
        res.render('frontend', {
            title: 'Tabla de Cliente',
            comercios: comercios
        });
    });
 });

 router
    .route('/addComercio')
    .post((req,res)=>{
     let body=  req.body;
     createStrore(body,res); 
 });

 router.get('/formulario', (req,res)=>{
    Comercio.find({}, (error, comercios)=>{
        if(error) throw error;
        res.render('form',{
            title:'Formulario de Comercio'
        }) 
    })
 });
 router.get('/activar/:id', (req, res)=>{
     let id = req.params.id;
     Comercio.findById(id, (err, comercio)=>{
         if(err) throw err;
         console.log("ANTES _ACTIVO ",comercio.activo);
         comercio.activo = !comercio.activo;
         comercio.save()
         .then(()=> res.redirect('/home'))
         console.log("DESPUES _ACTIVO",comercio.activo);
        });
    });
    
    function stringToBoolean(string){
      if(string ==undefined)  return false;
      else{
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }}
}

    function createStrore(body,res){
    const newComercio= new Comercio({
        comercio:body.n_comercio,
        cuit:body.n_cuit,
        activo:stringToBoolean(body.n_activo),
        balanceActual:body.n_balance,
        conceptos: body.concepto,
        ultimaVenta:body.n_ultVenta
    });
    
    console.log("BODY:  ",body);
    console.log("CONCEPTO: ",body.concepto);
    body.activo= false;
    newComercio.save((err,document)=>{
        if(err) throw console.log(err);
        console.log(document)
        res.redirect('/formulario');
    }) 
}

module.exports = router; 