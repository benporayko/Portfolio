import BlogPost from "../models/blogpost.js";

export default class BlogPostsDAO {

    static async getBlogPosts() {
        const posts = await BlogPost.find();
        return posts;
    }

    static async getBlogPostById(id) {
        const post = await BlogPost.find({_id: id});
        return post;
    }

    static async deleteBlogPostById(id) {
        try {
            const deleteResponse = await BlogPost.deleteOne({_id: id});
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete blog post: ${e}`);
            return {error: e};
        }
    }

    static async updateBlogPost(id, title, subtitle, published, body, tags, author, publicUrl) {
        try {
            const updateResponse = await BlogPost.updateOne({_id: id},
                {
                    title: title,
                    subtitle: subtitle,
                    published: published,
                    body: body,
                    tags: tags,
                    author: author,
                    publicUrl: publicUrl
                });
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update blog post: ${e}`);
            return {error: e};
        }
    }

    static async postNewBlogPost(title, subtitle, published, body, tags, author, publicUrl) {
        const blogPost = new BlogPost({
            title: title,
            subtitle: subtitle,
            published: published,
            body: body,
            tags: tags,
            author: author,
            publicUrl: publicUrl
        });
    await blogPost.save();
    }
}