import jwt from "jsonwebtoken";

export function verifyToken(req,res,next){
    console.log('Cookies: ', req.cookies); // log in production 
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({msg: "Not Autenticated" });
    };

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) {
            return res.status(403).json({msg: "Token is not Valid" });
        };
        req.userId = payload.id;

        next();
    });
    
};