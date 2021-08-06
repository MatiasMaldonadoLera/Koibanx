var mongoose = require("mongoose");
var ComercioModel = mongoose.model('Comercio');
const { validationResult } = require('express-validator');

let totalComercios;

ComercioModel.countDocuments().exec(function (err, totalDoc) {
    if (err) res.send(500, err.message);
    console.log("TotalDoc: ", totalDoc);
    totalComercios=totalDoc;
  }
);

//GET - Return all 
exports.findAllComercioModels = function (req, res) {
  ComercioModel.find(function (err, comercio_Models) {
    if (err) res.send(500, err.message);
    console.log("GET /stores");
    res.status(200).jsonp(comercio_Models);
  });
};

exports.findQueryComercioModels = function (req, res) {
    let page = parseInt(req.query.page,10);
    let limit = parseInt(req.query.limit,10);
    console.log("page: ", page);
    console.log("limit: ", limit);
    console.log("Pages: ", Math.trunc(totalComercios/page));
    if(req.query.q ===null || req.query.q ===undefined ){
        ComercioModel.find().limit(limit*1).skip(limit*(page-1)).exec(
            function (err, comercio_Models) {
                if (err) res.send(500, err.message);
                console.log("GET /stores");
                res.status(200).jsonp({
                    page: page,
                    limit:limit,
                    pages:Math.ceil(totalComercios/limit),
                    total:totalComercios,
                    data:[comercio_Models]
                });
              }
        );
    }else { let q = JSON.parse(req.query.q); 
    console.log("consulta: ", q);
        ComercioModel.find(q,function (err, comercio_Models) {
            if (err) res.send(500, err.message);
            console.log("GET /stores");
            res.status(200).jsonp({
                page: page,
                limit:limit,
                pages:Math.ceil(totalComercios/limit),
                total:totalComercios,
                data:[comercio_Models]
            });
          }).limit(limit*1).skip(limit*(page-1)).exec();
    }
  };
//GET - Return pagination
exports.findComercioModels = function (req, res) {
    let page = parseInt(req.query.page,10);
    let limit = parseInt(req.query.limit,10);
    if(req.query.q ===null || req.query.q ===undefined ){
        ComercioModel.find().limit(limit).skip(limit*page).exec(
            function (err, comercio_Models) {
                if (err) res.send(500, err.message);
                console.log("GET /stores");
                res.status(200).jsonp({
                    page: page,
                    limit:limit,
                    pages:Math.trunc(totalComercios/limit),
                    total:totalComercios,
                    data:[comercio_Models]
                });
              }
        );
    }
};

//GET - ID
exports.findById = function(req, res) {
    ComercioModel.findById(req.params.id, function(err, comercio_Models) {
    if(err) return res.send(500, err.message);

    console.log('GET /stores/' + req.params.id);
        res.status(200).jsonp(comercio_Models);
    });
};

//POST - Insert 
exports.addComercio = function (req, res) {
    console.log("POST");
    console.log(req.body);
    const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
    var comercio = new ComercioModel({
      comercio: req.body.n_comercio,
      cuit: req.body.n_cuit,
      activo: req.body.n_activo,
      balanceActual: req.body.n_balance,
      conceptos: req.body.concepto,
      ultimaVenta: req.body.n_ultVenta
    });
  
    comercio.save(function (err, comercio_Models) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(comercio_Models);
    });
  };

//PUT - Update 
exports.updateComercio = function (req, res) {
    Comercio.findById(req.params.id, function (err, comercio) {
      comercio.comercio = req.body.comercio;
      comercio.cuit = req.body.cuit;
      comercio.activo = req.body.activo;
      comercio.balanceActual = req.body.balanceActual;
      comercio.ultimaVenta = req.body.ultimaVenta;
  
      comercio.save(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(comercio);
      });
    });
  };

//DELETE - Delete 
exports.deleteComercio = function (req, res) {
    Comercio.findById(req.params.id, function (err, comercio) {
      comercio.remove(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send();
      });
    });
  };