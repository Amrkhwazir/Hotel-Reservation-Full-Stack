import jwt from "jsonwebtoken";
import { errorCreate } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(errorCreate(401, "Your Token is not Authenticated or Expired"));
    };

    jwt.verify(token, process.env.TOKEN, (err, user) => {
        if(err) return next(errorCreate(403, "Token in invalid"));
        req.user = user;
        next();
    })
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, ()  => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(errorCreate(403, "You are not Authorized!"));
        }
    })
}


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin){
            next();
        }else{
            return next(errorCreate(403, "You are not Authorized!"));
        }
    })
}

