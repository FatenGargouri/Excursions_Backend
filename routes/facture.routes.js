module.exports = (app) => {
    const factures= require('../controllers/facture.controllers.js');
    app.post('/factures',factures.creer); 
    app.get('/factures',factures.afficherTout);
    app.get('/factures/:factureId',factures.afficherUn);
    app.put('/factures/:factureId',factures.modifier);
    app.delete('/factures/:factureId',factures.supprimer)
}