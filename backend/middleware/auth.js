const jwt= require("jsonwebtoken");
const SECRET="MYSecret";

const authenticateJwt= async (req,res,next)=>{
    const authHeader= req.header.authorization;
    if(authHeader){
        const token= authHeader.split(' ')[1];
        await jwt.verify(token, SECRET, (err,user)=>{
            if(err){
                return res.status(403);
            }
            req.user=user;
            next();
        });
    }else{
        return res.status(401);
    }
};

module.exports={
    authenticateJwt,
    SECRET
};