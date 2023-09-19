import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoints = appCommonTypes.RouteEndpoints;
import { deleteBlogHandler, fetchBlogsHandler, findBlogHandler, postBlogHandler, updateBlogHandler } from '../../routes/blogRoute';

const blogEndpoints: RouteEndpoints = [
    {
        name: 'blog',
        method: 'post',
        path: '/blog',
        handler: postBlogHandler
    },
    {
        name: 'get single blog',
        method: 'get',
        path: '/blog/:blogId',
        handler: findBlogHandler
    },
    {
        name: 'fetch blogs',
        method: 'get',
        path: '/blogs',
        handler: fetchBlogsHandler
    },
    {
        name: 'update blog',
        method: 'put',
        path: '/blog/:blogId',
        handler: updateBlogHandler
    },
    {
        name: 'delete blog',
        method: 'delete',
        path: '/blog/:blogId',
        handler: deleteBlogHandler
    },
];

export default blogEndpoints;