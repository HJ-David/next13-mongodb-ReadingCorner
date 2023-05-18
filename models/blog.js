import { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  content: {
    type: String,
    required: [true, "Content is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;