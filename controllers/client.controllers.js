const Client =require('../models/client.models.js')
const router=require("express").Router() ;
const body=require("body-parser") ;
exports.creer= async (req, res) => { 
    try {
         var client= Client(req.body);
         
            var result=await client.save(); 
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
            }
};


exports.afficherTout = async(req, res) => {
    try{
        var result = await Client.find();
        res.send(result);
    }
    catch(error) {
        res.status(500).send(error);
    }
};
exports.afficherUn= async (req, res) => {
    try {
        var n=await Client.findById(req.params.clientId).exec();
        var result = await n.save();
        res.send(result);
    } catch (error) {
    res.status(500).send(error);
    }
};
exports.modifier = async(req, res) => {
        try 
        {
        var n =  await Client.findById({ _id: req.params.clientId});
            n.clNom = req.body.clNom || "Updated nom" ; 
            n.clPrenom = req.body.clPrenom || "Updated prenom" ;
            n.clDate=req.body.clDate || "updated Date" ;
            n.clMail = req.body.clMail || "Updated mail" ;
            n.clTel = req.body.clTel || "Updated tel";
            n.clPays=req.body.clPays || "Updated pays";
            n.clVille=req.body.clVille || "Updated Ville";
            n.clMess=req.body.clMess || "Updated Message";
            n.clCodePostal=req.body.clCodePostal || "Updated Code Postal";
             var result = await n.save();
            res.send(result);
             }
        catch (error){
                res.status(400).send("unable to update the database");
          }
};
exports.supprimer= async (req, res) => {
    try {
        var result=await Client.deleteOne({_id: req.params.clientId}).exec();
        res.send(result);
    } catch (error) {
    res.status(500).send(error);
    }
};