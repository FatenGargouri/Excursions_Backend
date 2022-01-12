var express = require('express');
var router = express.Router();
var User =require ('../models/User');
const bcrypt= require ("bcrypt");
const auth =require ('../middlewares/auth');
const jwt =require('jsonwebtoken');
//http://emailregex.com/ javascript
const EMAIL_REGEX=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//password Contenir au moins 8 caractères,numéro,1 caractère majuscule,seulement 0-9a-zA-Z
const PASSWRD_REGEX= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{3,}$/
/***
* @route Get api/auth/login
* @desc Login user
*/
router.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    //simple validation
    if(!email||!password){
    return res.status(400).json({msg:'Email or password non saisies'})
    }
    if(!EMAIL_REGEX.test(email)){
    return res.status(400).json({'erreur':'Email non valide'});
    }
    try{
    //vérifier l'existance de l'utilisateur
    const user=await User.findOne({email});
    if(!user) return res.status(400).json({'erreur':'utilisateur non existant'});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) res.status(400).json({msg:'mot de passe incorrect'})
    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');
res.status(200).json({
token,
user: {
id: user._id,
nom: user.nom,
prenom: user.prenom,
email: user.email
}
});
} catch (e) {
res.status(400).json({ msg: e.message });
}
});
/**
* @route POST api/auth/register
* @desc Register new user
* @access Public
*/
router.post("/register",async(req,res)=>{
    const{nom,prenom,email,password}=req.body;
    //simple validation
    if(!email||!password){
    return res.status(400).json({msg:'Email or password non saisies'})
    }
    if(!EMAIL_REGEX.test(email)){
    return res.status(400).json({'erreur':'Email non valide'});
    }
    if(!PASSWRD_REGEX.test(password)){
    return res.status(400).json({'erreur':'password non valide'});
    }
    try{
    const user=await User.findOne({email});
    if(user)return res.status(400).json({'erreur':'utilisateur existe déjà'})
    const salt=await bcrypt.genSalt(10);
const hash=await bcrypt.hash(password,salt);
const newuser=new User({
nom:nom,
prenom:prenom,
email:email,
password:hash,
});
const savedUser=await newuser.save();
if(!savedUser) return res.status('user ne peut pas etre enregistré')
const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
expiresIn: 3600
});
res.status(200).json({
token,
user: {
id: savedUser.id,
nom: savedUser.nom,
prenom: savedUser.prenom,
email: savedUser.email
}
});
}catch(err){
res.json({
message:"Erreur de connexion à la base de données"+err,
})
}
}
);
module.exports = router;