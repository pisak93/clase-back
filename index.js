const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, function(){
    console.log("Server is running on port 5000");
});


const bbdd="menu";
const url= "mongodb+srv://pisak93:pisak93@cluster0.vsffz.mongodb.net/"+bbdd+"?retryWrites=true&w=majority&appName=Cluster0";

const connection=mongoose.connect(url);

connection.then(function(){
    console.log("Conectado a la base de datos")
}).catch(function(err){
    console.log("Error de conexión: "+err);
});


require("./assets/modelos/UserInfo.js");
const Usuario = mongoose.model("usuarios");

app.post("/registrar",async function(req,res){
const {nombre, apellido, correo, password, celular, activo} = req.body;

const usuarioExistente = await Usuario.findOne({ correo });

if(usuarioExistente) {
   return res.send({
       status: false,
       message: "El correo ya está registrado"
   });
}

try {
    
    await Usuario.create({
        nombre,
        apellido,
        correo,
        password,
        celular,
        activo
    });
    res.send({
        status: true,
        message: "Usuario registrado correctamente"
    });

} catch (error) {
    res.send({
        status: false,
        message: "Error al registrar el usuario",
        error: error.message
    });
}


});

const rutas=require("./assets/rutas.js");

app.use("/assets", rutas);