import { BadRequestResponse, SuccessResponse, UnauthorizedResponse } from '../../../helpers/http';
import { COMMON, USER } from '../../../helpers/message';
import { NextFunction, Request, Response } from 'express';
import { comparePassword, hashPassword } from '../../../helpers/bcrypt';

import User from '../../../models/user.model';
import { loginToken } from '../../../helpers/util';

export class UserController {

    public getAllUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const find_users = await User.find();
            if (find_users) {
                return SuccessResponse(res, COMMON.OK, find_users);
            } else {
                return BadRequestResponse(res, USER.NOT_FOUND)
            }
        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const find_user = await User.findOne({
                _id: id
            }).select('username email mobile_num birth_date')

            if (find_user) {
                return SuccessResponse(res, COMMON.OK, find_user)
            } else {
                return BadRequestResponse(res, USER.NOT_FOUND)
            }

        } catch (error) {
            next(error)
        }
    }

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req;

            const find_user = await User.findOne({
                username: body.username,
                mobile_num: body.mobile_num
            });

            if (!find_user) {
                let hash_password = null;
                if (body.password) {
                    hash_password = await hashPassword(body.password);
                }

                const create_user = await User.create({
                    ...body,
                    password: hash_password
                });
                return SuccessResponse(res, USER.CREATED_SUCCESS, create_user);
            } else {
                return BadRequestResponse(res, USER.ALREADY_EXIST);
            }
        } catch (error) {
            next(error);
        }
    };



    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { body } = req;
          console.log(body);
          const user = await User.findOne({
              email: body.email
          });
          console.log(user);
          if (!user) {
            return UnauthorizedResponse(res, 'AUTH.INVALID_EMAIL');
          }
    
          const is_valid = await comparePassword(body.password, user.password);
          if (!is_valid) {
            return UnauthorizedResponse(res, 'AUTH.INVALID_PASSWORD');
          }
    
          const user_payload = {
            id: user.id,
            email: user.email,
            password: user.password
          }
          const token = loginToken(user_payload);
    
          console.log(token);
          const response = {
            username: user.username,
            email: user.email,
            mobile_num: user.mobile_num,
            token: token,
          };
          return SuccessResponse(res,('AUTH.LOGIN_SUCCESS'), response);
        } catch (err) {
          next(err);
        }
      };
}
