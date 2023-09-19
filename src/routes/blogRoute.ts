import { FastifyReply, FastifyRequest } from 'fastify';
import BlogController from '../controller/BlogController';

const blogController = new BlogController();

export const postBlogHandler = async (req: FastifyRequest, res: FastifyReply ) => {
    const response = await blogController.postBlog(req);

    res.status(response.code).send(response);
}

export const findBlogHandler = async (req: FastifyRequest, res: FastifyReply ) => {
    const response = await blogController.singleBlog(req);

    res.status(response.code).send(response);
}

export const fetchBlogsHandler = async (req: FastifyRequest, res: FastifyReply ) => {
    const response = await blogController.blogs(req);

    res.status(response.code).send(response);
}

export const updateBlogHandler = async (req: FastifyRequest, res: FastifyReply ) => {
    const response = await blogController.updateBlog(req);

    res.status(response.code).send(response);
}

export const deleteBlogHandler = async (req: FastifyRequest, res: FastifyReply ) => {
    const response = await blogController.deleteBlog(req);

    res.status(response.code).send(response);
}