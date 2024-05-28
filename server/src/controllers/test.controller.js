import jwt from "jsonwebtoken";

export async function shouldBeLoggedIn(req,res){

    // console.log(req.userId)
    
    return res.status(200).json({msg: "you are Autenticated" });

}

export async function shouldBeAdmin(req,res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({msg: "Not Autenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) {
            return res.status(403).json({msg: "Token is not Valid" });
        };

        if(!payload.isAdmin){
            return res.status(403).json({msg: "Not authorized" });
        }

        return res.status(200).json({msg: "you are Autenticated" });
    })

}