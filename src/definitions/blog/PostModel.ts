import PostDTO from "./PostDTO";
import dayjs from "dayjs";

class PostModel {
  title: string;
  slug: string;
  author: any;
  body: any;
  categories: any;
  publishedAt: any;
  mainImage: string;
  constructor(post: PostDTO) {
    this.title = post.title;
    this.slug = post.slug;
    this.author = post.author;
    this.body = post.body;
    this.categories = post.categories;
    this.publishedAt = dayjs(post.publishedAt).format("MMM D, YYYY");
    this.mainImage = post.mainImage;
  }
  toJSON() {
    return { ...this };
  }
}

export default PostModel;
