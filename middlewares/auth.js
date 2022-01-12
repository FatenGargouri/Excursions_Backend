const jwt =require('jsonwebtoken');
module.exports=async(req,res,next)=>{
const token = req.header('x-auth-token');
if(!token)
return res.status(401).json({msg:'pas de token, opération non autorisée'})
try{
var decoded=jwt.verify(token,process.env.SECRET);
req.user=decoded;
next();
}catch(err){
res.status(401).json({msg:"token non valide"})
}
}