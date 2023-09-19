import { FastifyReply, FastifyRequest } from 'fastify';
import Joi from 'joi';
import { appCommonTypes } from '../@types/app-common';
import { appModelTypes } from '../@types/app-model';
import HttpResponse = appCommonTypes.HttpResponse;
import HttpStatus from "../helpers/HttpStatus";
import CustomAPIError from "../exceptions/CustomAPIError";
import { TryCatch } from '../decorators';
import {BlogRepository} from '../helpers/CrudRepository';

export const postBlogSchema: Joi.SchemaMap<appModelTypes.IBlog> =
  {
    title: Joi.string().required().label('title'),
    content: Joi.string().required().label('content'),
    author: Joi.string().required().label('author'),
  };

export const updateBlogSchema: Joi.SchemaMap<appModelTypes.IBlog> =
  {
    title: Joi.string().label('title'),
    content: Joi.string().label('content'),
    author: Joi.string().label('author'),
  };

const blogRepository = new BlogRepository();

export default class BlogController {

    @TryCatch
    public async postBlog (req: FastifyRequest) {
        const { error, value } = Joi.object<appModelTypes.IBlog>(
            postBlogSchema
        ).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const blogValue: appModelTypes.IBlog = {
            ...value
        }

        const postBlog = await blogRepository.create(blogValue)

        const response: HttpResponse<appModelTypes.IBlog> = {
            code: HttpStatus.CREATED.code,
            message: 'Successfully created a new blog',
            result: postBlog
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async singleBlog (req: FastifyRequest ) {

        //@ts-ignore
        const blogId =  parseInt(req.params.blogId)

        const blog = await blogRepository.findFirst({id: blogId})
        if(!blog)
            return Promise.reject(CustomAPIError.response('Blog does not exist', HttpStatus.NOT_FOUND.code));

        const response: HttpResponse<appModelTypes.IBlog> = {
            code: HttpStatus.OK.code,
            message: 'Successful',
            result: blog
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async updateBlog (req: FastifyRequest) {
        
        const { error, value } = Joi.object<appModelTypes.IBlog>(
            updateBlogSchema
        ).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        //@ts-ignore
        const blogId =  parseInt(req.params.blogId)

        const blog = await blogRepository.findById(blogId)
        if(!blog)
            return Promise.reject(CustomAPIError.response('Blog does not exist', HttpStatus.NOT_FOUND.code));

        const blogValue: appModelTypes.IBlog = {
            ...value,
            updatedAt: new Date()
        }

        const updatedBlog = await blogRepository.updateById(blog.id as number, blogValue);

        const response: HttpResponse<appModelTypes.IBlog> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated',
            result: updatedBlog
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async deleteBlog (req: FastifyRequest) {

        //@ts-ignore
        const blogId =  parseInt(req.params.blogId)

        const blog = await blogRepository.findById(blogId)
        if(!blog)
            return Promise.reject(CustomAPIError.response('Blog does not exist', HttpStatus.NOT_FOUND.code));

        await blogRepository.deleteById(blog.id as number);

        const response: HttpResponse<appModelTypes.IBlog> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async blogs(req: FastifyRequest) {
        let page = 1;
        let pageSize = 10;
    
        //@ts-ignore
        if (req.query.page) {
            //@ts-ignore
            const parsedPage = parseInt(req.query.page as string, 10);
            if (!isNaN(parsedPage) && parsedPage > 0) {
                page = parsedPage;
            }
        }
    
        //@ts-ignore
        if (req.query.pageSize) {
            //@ts-ignore
            const parsedPageSize = parseInt(req.query.pageSize as string, 10);
            if (!isNaN(parsedPageSize) && parsedPageSize > 0) {
                pageSize = parsedPageSize;
            }
        }
    
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
    
        const paginatedBlogs = await blogRepository.findPaginated(offset, limit);
    
        const response: HttpResponse<appModelTypes.IBlog> = {
            code: HttpStatus.OK.code,
            message: 'Successful',
            results: paginatedBlogs,
        };
    
        return Promise.resolve(response);
    }
    
}