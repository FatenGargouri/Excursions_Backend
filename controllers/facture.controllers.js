const Facture=require('../models/factures.models.js')
const router=require("express").Router() 
const body=require("body-parser") 
router.use(body.json()); 
const Client=require('../models/client.models.js');
const Excurtions=require('../models/excurtions.models.js');
const Paiement=require('../models/paiement.models.js');
// Créer et sauvegarder une nouvelle Article 
exports.creer= async (req, res) => { 
    try { 
         var facture= Facture(req.body);
            var result=await facture.save(); 
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
            }
};


exports.afficherTout = async(req, res) => {
    try{
        var result = await Facture.find().populate('client').populate('excurtions').populate('paiement');
        res.send(result);
    }
    catch(error) {
        res.status(500).send(error);
    }
};
exports.afficherUn= async (req, res) => {
    try {
        var n=await Facture.findById(req.params.factureId).populate('client').populate('excurtions').populate('paiement').exec();
        var result = await n.save();
        res.send(result);
    } catch (error) {
    res.status(500).send(error);
    }
};
exports.modifier = async(req, res) => {
        try 
        {
        var n =  await Facture.findById({ _id: req.params.factureId}).exec();
            n.codeFact = req.body.codeFact  ||"Updated code facture",
            n.client = req.body.client ||"Updated client",
            n.excurtions = req.body.excurtions ||"Updated excurtions",
            n.paiement = req.body.paiement ||"Updated paiement"      
             var result = await n.save();
            res.send(result);
             }
        catch (error){
                res.status(400).send("unable to update the database");
          }
};
exports.supprimer= async (req, res) => {
    try {
        var result=await Facture.deleteOne({_id: req.params.factureId}).exec();
        res.send(result);
    } catch (error) {
    res.status(500).send(error);
    }
    };