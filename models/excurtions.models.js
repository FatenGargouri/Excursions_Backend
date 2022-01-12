const mongoose = require('mongoose');
const excurtionsSchema = mongoose.Schema({
//Définir les champs
    titre :String,
    desc:String,
    duree:String,
    prix:Number,
    nomHotel:String,
    activites:String,
    destination:String,
    img:String
}, { timestamps: true
/* Définir timestamps. Lorsqu’on l’active, Mongoose ajoute les propriétés
createdAt et updatedAt au schéma. */
});
module.exports = mongoose.model('excurtions', excurtionsSchema);