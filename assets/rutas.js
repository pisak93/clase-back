const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("./modelos/Plato.js");
require("./modelos/Pedido.js");
const Plato = mongoose.model("platos");
const Pedido = mongoose.model("pedidos");


router.get("/platos", async function (req, res) {

    try{
        const platos = await Plato.find({});
        console.log("Platos encontrados:", platos); 
        res.send({
            status: true,
            message: "Lista de platos",
            data: platos
        });
    }
    catch(err){
        res.send({
            status: false,
            message: "Error al obtener los platos",
            error: err.message
        });
    }
});

router.get("/pedidos", async function (req, res) {
    try{
        const pedidos = await Pedido.find({});
        console.log("Pedidos encontrados:", pedidos); 
        res.send({
            status: true,
            message: "Lista de pedidos",
            data: pedidos
        });
    }
    catch(err){
        res.send({
            status: false,
            message: "Error al obtener los pedidos",
            error: err.message
        });
    }
});

router.get("/pedidos-completos", async function (req, res) {
    try{
        const pedidos = await Pedido.find({}).populate("platos");
        console.log("Pedidos encontrados:", pedidos); 
        res.send({
            status: true,
            message: "Lista de pedidos",
            data: pedidos
        });
    }
    catch(err){
        res.send({
            status: false,
            message: "Error al obtener los pedidos",
            error: err.message
        });
    }
});

router.get("/platos/precio-menor", async function (req, res) {
    try{
        const precioMax= parseInt(req.query.precio);
        
        if(isNaN(precioMax) || precioMax <= 0 || precioMax === null || precioMax === undefined){

            return res.send({
                status: false,
                message: "El precio debe ser un número"
            });
        }

        const pedidos = await Plato.find({precio: {$lt: precioMax}});
        console.log("Pedidos encontrados:", pedidos); 
        res.send({
            status: true,
            message: "Lista de pedidos",
            data: pedidos
        });
    }
    catch(err){
        res.send({
            status: false,
            message: "Error al obtener los pedidos",
            error: err.message
        });
    }
});


router.get("/pedidos/solo-platos", async function (req, res) {


    try{

        const fechaMax = req.query.fecha;
         if (!fechaMax) {
         return res.send({
            status: false,
            message: "La fecha es obligatoria"
        });
    }

        const pedidos = await Pedido.find({fecha:{$lte:fechaMax}},"fecha platos").populate("platos","nombre");
        console.log("Pedidos encontrados:", pedidos); 
        res.send({
            status: true,
            message: "Lista de pedidos",
            data: pedidos
        });
    }
    catch(err){
        res.send({
            status: false,
            message: "Error al obtener los pedidos",
            error: err.message
        });
    }
});
module.exports = router;