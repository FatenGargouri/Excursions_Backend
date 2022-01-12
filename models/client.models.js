const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
//Définir les champs
    clNom :String,
    clPrenom:String,
    clDate:String,
    clMail:String,
    clTel:String,
    clPays:String,
    clVille:String,
    clMess:String,
    clCodePostal:String
}, { timestamps: true
/* Définir timestamps. Lorsqu’on l’active, Mongoose ajoute les propriétés
createdAt et updatedAt au schéma. */
});
module.exports = mongoose.model('client', clientSchema);