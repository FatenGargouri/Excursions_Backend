const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
//Définir les champs
    nomEtPren :String,
    mail:String,
    tel:String,
    mess:String,
}, { timestamps: true
/* Définir timestamps. Lorsqu’on l’active, Mongoose ajoute les propriétés
createdAt et updatedAt au schéma. */
});
module.exports = mongoose.model('contact', contactSchema);