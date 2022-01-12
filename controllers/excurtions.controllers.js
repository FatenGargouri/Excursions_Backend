const Excurtions =require('../models/excurtions.models.js')
const router=require("express").Router() ;
const body=require("body-parser") ;
exports.creer= async (req, res) => { 
    try {
         var excurtions= Excurtions(req.body);
         
            var result=await excurtions.save(); 
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
            }
};


exports.afficherTout = async(req, res) => {
    try{
        var result = await Excurtions.find();
        res.send(result);
    }
    catch(error) {
        res.status(500).send(error);
    }
};
exports.afficherUn= async (req, res) => {
    try {
        var n=await Excurtions.findById(req.params.excurtionsId).exec();
        var result = await n.save();
        res.send(result);
    } catch (error) {
    res.status(500).send(error);
    }
};
exports.modifier = async(req, res) => {
        try 
        {
        var n =  await Excurtions.findById({ _id: req.params.excurtionsId});
            n.titre = req.body.titre || "Updated titre" ; 
            n.desc = req.body.desc || "Updated description" ;
            n.duree=req.body.duree || "updated Durée" ;
            n.prix = req.body.prix || "Updated Prix" ;
            n.nomHotel = req.body.nomHotel || "Updated nom Hotel";
            n.activites=req.body.activites || "Updated Activites";
            n.destination=req.body.destination || "Updated Destination";
            n.img=req.body.img || "Updated image";
             var result = await n.save();
            res.send(result);
             }
        catch (error){
                res.status(400).send("unable to update the database");
          }
};
exports.supprimer= async (req, res) => {
    try {
        var result=await Excurtions.deleteOne({_id: req.params.excurtionsId}).exec();
        res.send(result);
    } catch (error) {
    res.status(500).send(error);
    }
};