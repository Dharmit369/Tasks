import { Joi } from 'celebrate';

export const userSchema = Joi.object({
    username: Joi.string().required(),
    mobile_num: Joi.string().required(),
    email: Joi.string().required(),
    birth_date: Joi.date().required(),
    password: Joi.string().required()
});

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})
