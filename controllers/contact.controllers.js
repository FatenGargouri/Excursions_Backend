const Contact =require('../models/contact.models.js')
const router=require("express").Router() ;
const body=require("body-parser") ;
exports.creer= async (req, res) => { 
    try {
         var contact= Contact(req.body);
         
            var result=await contact.save(); 
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
            }
};


exports.afficherTout = async(req, res) => {
    try{
        var result = await Contact.find();
        res.send(result);
    }
    catch(error) {
        res.status(500).send(error);
    }
};
exports.afficherUn= async (req, res) => {
    try {
        var n=await Contact.findById(req.params.contactId).exec();
        var result = await n.save();
        res.send(result);
    } catch (error) {
    res.status(500).send(error);
    }
};
exports.modifier = async(req, res) => {
        try 
        {
        var n =  await Contact.findById({ _id: req.params.contactId});
            n.nomEtPren = req.body.nomEtPren || "Updated nom et prenom" ; 
            n.mail = req.body.mail || "Updated mail" ;
            n.tel=req.body.tel || "updated telephone" ;
            n.mess = req.body.mess || "Updated message" ;
             var result = await n.save();
            res.send(result);
             }
        catch (error){
                res.status(400).send("unable to update the database");
          }
};
exports.supprimer= async (req, res) => {
    try {
        var result=await Contact.deleteOne({_id: req.params.contactId}).exec();
        res.send(result);
    } catch (error) {
    res.status(500).send(error);
    }
};