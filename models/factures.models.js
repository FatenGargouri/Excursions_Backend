const mongoose = require('mongoose');
const factureSchema = mongoose.Schema({
//Définir les champs
    codeFact :String,
    client:{type:mongoose.Schema.Types.ObjectId,
        ref:'client'
    },
    excurtions:{type:mongoose.Schema.Types.ObjectId,
    ref:'excurtions'
    },
    paiement:{type:mongoose.Schema.Types.ObjectId,
        ref:'paiement'
    },
}, { timestamps: true
/* Définir timestamps. Lorsqu’on l’active, Mongoose ajoute les propriétés
createdAt et updatedAt au schéma. */
});
module.exports = mongoose.model('facture', factureSchema);