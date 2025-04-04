const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    nombre:String,
    apellido:String,
    correo:{ type: String, unique: true },
    password:String,
    celular:Number,
    activo:Boolean
},{collection:"usuarios"});

mongoose.model("usuarios",UserSchema);