import { BLOG, COMMON } from '../../../helpers/message';
import { BadRequestResponse, SuccessResponse } from '../../../helpers/http';
import { NextFunction, Request, Response } from 'express';

import Blog from '../../../models/blog.model';
import fs from 'fs';
import { generateRandomNum } from '../../../helpers/util';
import path from 'path';

export class BlogController {

    public getAllBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const page: number = parseInt(req.query.page as string, 10) || 5;
        const limit: number = parseInt(req.query.limit as string, 10) || 5;
        const skip: number = (page - 1) * limit;
            const find_blog = await Blog.find().select('title content authorId publishDate category') .skip(skip)
            .limit(limit);;

            if (find_blog) {;
            if (find_blog) {
                return SuccessResponse(res, COMMON.OK, find_blog);
            } else {
                return BadRequestResponse(res, BLOG.NOT_FOUND)
            }
        }
        } catch (err) {
            next(err);
        }
    };


    public getBlogById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const find_blog = await Blog.findOne({
                _id: id
            }).select('title content authorId publishDate category')

            if (find_blog) {
                return SuccessResponse(res, COMMON.OK, find_blog)
            } else {
                return BadRequestResponse(res, BLOG.NOT_FOUND)
            }

        } catch (error) {
            next(error)
        }
    }


    public createBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req;
            const author_Id = res.locals.user._id;
            let postId: string;
            let isPostIdUnique: boolean = false;
            do {
                postId = generateRandomNum(6).toString();
                const existingPost = await Blog.findOne({ postId }); 
                isPostIdUnique = !existingPost; 
            } while (!isPostIdUnique);

            const imagePath = req.file ? req.file.destination + '/' + req.file.filename : '';
            const create_blog = await Blog.create({
                postId,
                title: body.title,
                content: body.content,
                authorId: author_Id,
                publishDate: new Date(),
                lastUpdated: new Date(),
                category: body.category,
                featuredImage: imagePath
            });
            return SuccessResponse(res, BLOG.UPDATED_SUCCESS, create_blog);
        } catch (err) {
            next(err);
        }
    };

    public updateBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req;
            const { id } = req.params;

            body.lastUpdated = new Date();

                const updated_blog = await Blog.findOneAndUpdate({ _id: id },
                    { $set: body },
                    { new: true }).select("title content authorId publishDate category lastUpdated");

                return SuccessResponse(res, BLOG.UPDATED_SUCCESS, updated_blog);
        } catch (err) {
            next(err);
        }
    };

    public deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const blog = await Blog.findById(id);
            if (!blog) {
                return BadRequestResponse(res, BLOG.NOT_FOUND);
            }
    
            const imagePath = blog.featuredImage;
    
            if (imagePath) {
                const imagePathOnDisk = path.join(__dirname, '..', imagePath);
                if (fs.existsSync(imagePathOnDisk)) {
                    fs.unlinkSync(imagePathOnDisk);
                }
            }
            const delete_blog = await Blog.deleteOne({ _id: id });
    
            if (delete_blog.deletedCount) {
                return SuccessResponse(res, BLOG.DELETED_SUCCESS);
            } else {
                return BadRequestResponse(res, BLOG.NOT_FOUND);
            }
        } catch (err) {
            next(err);
        }
    };


    public getSearchBlog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const searchString: string = req.params.keyword;

            const searchRegex = new RegExp(searchString, 'i');
    
            const searchResults = await Blog.find({
                $or: [
                    { title: { $regex: searchRegex } },
                    { content: { $regex: searchRegex } },
                    { category: { $regex: searchRegex } }
                ]
            }).select('title content authorId publishDate category');
    
            return SuccessResponse(res, COMMON.OK, searchResults);
        } catch (err) {
            next(err);
        }
    };
}


