import { loginSchema, userSchema } from './user.schema';

import { Router } from 'express';
import { UserController } from './user.controller';
import { bodyValidator } from '../../../middleware/validate.middleware';

export class UserRoutes {
    router = Router();
    private userCtrl: UserController = new UserController();
    constructor() {
        this.router.get('/get', this.userCtrl.getAllUser);

        this.router.get('/get/:id', this.userCtrl.getUserById);

        this.router.post('/create', [bodyValidator(userSchema)], this.userCtrl.createUser);

        this.router.post('/login', [bodyValidator(loginSchema)], this.userCtrl.login);
    }
}
