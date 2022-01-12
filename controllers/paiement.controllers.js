const Paiement =require('../models/paiement.models.js')
const router=require("express").Router() ;
const body=require("body-parser") ;
exports.creer= async (req, res) => { 
    try {
         var paiement= Paiement(req.body);
         
            var result=await paiement.save(); 
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
            }
};


exports.afficherTout = async(req, res) => {
    try{
        var result = await Paiement.find();
        res.send(result);
    }
    catch(error) {
        res.status(500).send(error);
    }
};
exports.afficherUn= async (req, res) => {
    try {
        var n=await Paiement.findById(req.params.paiementId).exec();
        var result = await n.save();
        res.send(result);
    } catch (error) {
    res.status(500).send(error);
    }
};
exports.modifier = async(req, res) => {
        try 
        {
        var n =  await Paiement.findById({ _id: req.params.paiementId});
            n.type = req.body.type || "Updated Type de paiement" ; 
            n.numCarte = req.body.numCarte || "Updated numero carte" ;
            n.codeSec=req.body.codeSec || "updated code securite" ;
            n.ville = req.body.ville || "Updated ville" ;
            n.datePaie = req.body.datePaie || "Updated dete de paiement" ;
            n.CodePostal = req.body.CodePostal || "Updated code postal" ;
             var result = await n.save();
            res.send(result);
             }
        catch (error){
                res.status(400).send("unable to update the database");
          }
};
exports.supprimer= async (req, res) => {
    try {
        var result=await Paiement.deleteOne({_id: req.params.paiementId}).exec();
        res.send(result);
    } catch (error) {
    res.status(500).send(error);
    }
};