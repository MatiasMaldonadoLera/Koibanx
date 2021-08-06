var mongoose = require('mongoose');
 const {Schema , model} = require('mongoose');
 require('mongoose-currency').loadType(mongoose);
    const Currency = mongoose.Types.Currency;

 const comercioSchema= new Schema({
    comercio:String,
    cuit: String,
    conceptos: [String],
    activo: Boolean,
    balanceActual: Number,
    ultimaVenta:Date 
});

module.exports = model('Comercio', comercioSchema);