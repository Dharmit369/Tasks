import { ParsedQs } from 'qs';
import { Token } from '../interface/auth.interface';
import { encode } from './jwt';

export const pageLimit = (size: string | undefined | ParsedQs | string[] | ParsedQs[],): number => {
    let pageSize = 10;
    if (size) pageSize = +size;
    return pageSize;
};

export const loginToken = (payload: Token): string => {
    const date = new Date();
    const token = encode({
        _id: payload.id,
        email: payload.email,
        password: payload.password,
        iat: Math.floor(date.getTime() / 10000000),
        exp: Math.floor(date.setDate(date.getDate() + 15) / 1000)
    });
    return token;
};

export const generateRandomNum = (length: number): string => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};


