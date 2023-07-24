const jwt= require("jsonwebtoken");
const SECRET="MYSecret";

const authenticateJwt= (req,res,next)=>{
    const authHeader= req.headers.authorization;
    if(authHeader){
        console.log("Was here");
        const token= authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }else{
        return res.sendStatus(403);
    }
};

module.exports={
    authenticateJwt,
    SECRET
};