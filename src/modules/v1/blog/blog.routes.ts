import { Auth } from '../../../middleware/auth.middleware';
import { BlogController } from './blog.controller';
import { Multer } from '../../../helpers/multer';
import { Router } from 'express';
import { blogSchema } from './blog.schema';
import { bodyValidator } from '../../../middleware/validate.middleware';
export class BlogRoutes {
    
    router = Router();
    private multer: Multer;

    private blogCtrl: BlogController = new BlogController();
    constructor() {
        this.multer = new Multer('public/image', true);
        
        this.router.get('/get',[Auth], this.blogCtrl.getAllBlog);

        this.router.get('/get/:id',[Auth], this.blogCtrl.getBlogById);

        this.router.post('/create', [Auth, this.multer.upload, bodyValidator(blogSchema)], this.blogCtrl.createBlog);

        this.router.put('/update/:id', [Auth], this.blogCtrl.updateBlog);

        this.router.delete('/delete/:id',[Auth] ,this.blogCtrl.deleteBlog);

        this.router.get('/search/:keyword',[Auth], this.blogCtrl.getSearchBlog);

    }
}
