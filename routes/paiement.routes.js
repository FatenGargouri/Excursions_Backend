module.exports = (app) => {
    const paiements= require('../controllers/paiement.controllers.js');
    app.post('/paiements',paiements.creer); 
    app.get('/paiements',paiements.afficherTout);
    app.get('/paiements/:paiementId',paiements.afficherUn);
    app.put('/paiements/:paiementId',paiements.modifier);
    app.delete('/paiements/:paiementId',paiements.supprimer)
}