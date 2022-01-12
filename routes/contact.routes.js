module.exports = (app) => {
    const contacts= require('../controllers/contact.controllers.js');
    app.post('/contacts',contacts.creer); 
    app.get('/contacts',contacts.afficherTout);
    app.get('/contacts/:contactId',contacts.afficherUn);
    app.put('/contacts/:contactId',contacts.modifier);
    app.delete('/contacts/:contactId',contacts.supprimer)
}