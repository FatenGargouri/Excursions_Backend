module.exports = (app) => {
    const clients= require('../controllers/client.controllers.js');
    app.post('/clients',clients.creer); 
    app.get('/clients',clients.afficherTout);
    app.get('/clients/:clientId',clients.afficherUn);
    app.put('/clients/:clientId',clients.modifier);
    app.delete('/clients/:clientId',clients.supprimer)
}