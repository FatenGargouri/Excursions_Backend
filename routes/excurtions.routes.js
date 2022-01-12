module.exports = (app) => {
    const excurtionss= require('../controllers/excurtions.controllers.js');
    app.post('/excurtionss',excurtionss.creer); 
    app.get('/excurtionss',excurtionss.afficherTout);
    app.get('/excurtionss/:excurtionsId',excurtionss.afficherUn);
    app.put('/excurtionss/:excurtionsId',excurtionss.modifier);
    app.delete('/excurtionss/:excurtionsId',excurtionss.supprimer)
}