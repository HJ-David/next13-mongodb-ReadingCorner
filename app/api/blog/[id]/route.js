import Blog from "@models/blog";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const blog = await Blog.findById(params.id).populate("creator");
        if (!blog) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(blog), { status: 200 });

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { title, content, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingBlog = await Blog.findById(params.id);

        if (!existingBlog) {
          return new Response("Blog not found", { status: 404 });
        }

        // Update the blog with new data
        existingBlog.title = title;
        existingBlog.content = content;
        existingBlog.tag = tag;

        await existingBlog.save();

        return new Response("Successfully updated the Blogs", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Blog", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Blog.findByIdAndRemove(params.id);

        return new Response("Blog deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting blog", { status: 500 });
    }
};
