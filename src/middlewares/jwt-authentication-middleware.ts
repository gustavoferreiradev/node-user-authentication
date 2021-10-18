import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';
import userRepository from "../repositories/user.repository";


async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas')
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de autenticação inválido!');            
        }

        try {


        const tokenPayLoad = JWT.verify(token, 'my_secret_key');


        if(typeof tokenPayLoad !== 'object' || !tokenPayLoad.sub) {
            throw new ForbiddenError('Token Inválido!');
        }

        const user = { uuid: tokenPayLoad.sub, username: tokenPayLoad.username };
        req.user = user;
        next();       
       
            
        } catch (error) {
            throw new ForbiddenError('Token Inválido!');
        }

       
    } catch (error) {
        next(error);
    }
}

export default jwtAuthenticationMiddleware;