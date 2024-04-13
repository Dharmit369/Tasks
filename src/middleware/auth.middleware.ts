import { InternalServerErrorResponse, InvalidTokenResponse } from '../helpers/http';
import { NextFunction, Request, Response } from 'express';

import { decode } from '../helpers/jwt';

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer/i, '').trim();
        if (!token) return InvalidTokenResponse(res);
        const decoded_token = decode(token);

        if (!decoded_token.email) return InvalidTokenResponse(res);

        const email = true;
        if (!email) return InvalidTokenResponse(res);

        res.locals.user = decoded_token;
        return next();
    } catch (err: any) {
        return InternalServerErrorResponse(res, err.message);
    }
};