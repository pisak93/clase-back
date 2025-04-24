const mongoose = require('mongoose');

const PlatoSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    precio: Number,
}, { collection: "platos" });

mongoose.model("platos", PlatoSchema);