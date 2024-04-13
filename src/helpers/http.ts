import { Response } from 'express';

const HTTP_MESSAGE = {
    SUCCESS: 'Success',
    BAD_REQUEST: 'Bad request',
    UNAUTHORIZED: 'Unauthorized request',
    CONFLICT: 'Conflict request',
    FORBIDDEN: 'Forbidden request',
    NOT_FOUND: 'Not found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    CANNOT_DELETE: `This Record Can't Deleted, It Contain References to other data`,
    GATEWAY_TIMEOUT: 'Gateway timeout',
    UNKNOWN_ERROR: 'Unknown error',
};

const SuccessResponse = <T>(res: Response, message: string | null = HTTP_MESSAGE.SUCCESS, data?: T) => {
    const response = { status: 200, success: true, data: data, message: message };
    if (res) {
        return res.status(200).json(response);
    } else {
        return response;
    }
};


const BadRequestResponse = <T>(res: Response, message: string | null = HTTP_MESSAGE.BAD_REQUEST, data?: T) => {
    const response = { status: 400, success: false, data: data, message: message };
    if (res) {
        return res.status(400).json(response);
    } else {
        return response;
    }
};
const UnauthorizedResponse = <T>(res: Response, message: string | null = HTTP_MESSAGE.UNAUTHORIZED, data?: T) => {
    const response = { status: 401, success: false, data: data, message: message };
    if (res) {
        return res.status(401).json(response);
    } else {
        return response;
    }
};
const InvalidTokenResponse = <T>(res: Response, message: string | null = HTTP_MESSAGE.UNAUTHORIZED, data?: T) => {
    const response = { status: 498, success: false, data: data, message: message };
    if (res) {
        return res.status(498).json(response);
    } else {
        return response;
    }
};

const NotFoundResponse = <T>(res: Response, message: string | null = HTTP_MESSAGE.NOT_FOUND, data?: T) => {
    const response = { status: 404, success: false, data: data, message: message };
    if (res) {
        return res.status(404).json(response);
    } else {
        return response;
    }
};

const InternalServerErrorResponse = <T>(res: Response, message: string | null = HTTP_MESSAGE.INTERNAL_SERVER_ERROR, data?: T,) => {
    const response = { status: 500, success: false, data: data, message: message };
    if (res) {
        return res.status(500).json(response);
    } else {
        return response;
    }
};

const UnprocessableResponse = <T>(res: Response, message: string | null, data?: T) => {
    const response = { status: 422, success: false, data: data, message: message };
    if (res) {
        return res.status(422).json(response);
    } else {
        return response;
    }
};

export {
    SuccessResponse,
    BadRequestResponse,
    UnauthorizedResponse,
    NotFoundResponse,
    InternalServerErrorResponse,
    UnprocessableResponse,
    InvalidTokenResponse
};