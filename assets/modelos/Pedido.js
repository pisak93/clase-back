const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  
    platos: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "platos"}],
    total: Number,
    fecha: Date,
}, { collection: "pedidos" });


mongoose.model("pedidos", PedidoSchema);