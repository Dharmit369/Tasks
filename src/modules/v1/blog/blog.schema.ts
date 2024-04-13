import { Joi } from 'celebrate';

export const blogSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required(),
});
