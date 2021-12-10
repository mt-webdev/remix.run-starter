import parseFrontMatter from "front-matter";
import fs from "fs/promises";
import { marked } from "marked";
import path from "path";
import invariant from "tiny-invariant";
import { MarkdownPostModel, PostModel } from "./../models/post.models";

class PostsDataService {
  #path = path.join(__dirname, "../data/posts/");

  async getPosts(): Promise<Omit<PostModel, "content">[]> {
    const dir = await fs.readdir(this.#path);
    return Promise.all(
      dir.map(async (filename) => {
        const file = await fs.readFile(path.join(this.#path, filename));

        const { attributes } = parseFrontMatter<MarkdownPostModel>(
          file.toString()
        );
        invariant(
          this.#isValidPostAttributes(attributes),
          `${filename} has bad meta data!`
        );

        return {
          slug: filename.replace(/\.md$/, ""),
          title: attributes.title,
        };
      })
    );
  }

  async getMarkdown(slug: string): Promise<PostModel> {
    const postpath = path.join(this.#path, `${slug}.md`);
    const file = await fs.readFile(postpath);

    const { attributes, body } = parseFrontMatter<MarkdownPostModel>(
      file.toString()
    );
    invariant(
      this.#isValidPostAttributes(attributes),
      `Post ${postpath} is missing attributes`
    );

    return {
      slug,
      title: attributes.title,
      content: body,
    };
  }

  async getPost(slug: string): Promise<PostModel> {
    const postpath = path.join(this.#path, `${slug}.md`);
    const file = await fs.readFile(postpath);

    const { attributes, body } = parseFrontMatter<MarkdownPostModel>(
      file.toString()
    );
    invariant(
      this.#isValidPostAttributes(attributes),
      `Post ${postpath} is missing attributes`
    );

    return {
      slug,
      title: attributes.title,
      content: marked(body),
    };
  }

  #isValidPostAttributes(attributes: any): attributes is MarkdownPostModel {
    return attributes?.title;
  }

  async createPost(newPost: PostModel) {
    const errors = this.#hasErrors(newPost);
    if (errors) throw errors;

    const postpath = path.join(this.#path, `${newPost.slug}.md`);
    fs.writeFile(
      postpath,
      `---\ntitle: ${newPost.title}\n---\n${newPost.content}`
    );

    return this.getPost(newPost.slug);
  }

  async editPost(editPost: PostModel) {
    const errors = this.#hasErrors(editPost);
    if (errors) throw errors;

    const postpath = path.join(this.#path, `${editPost.slug}.md`);
    fs.writeFile(
      postpath,
      `---\ntitle: ${editPost.title}\n---\n${editPost.content}`
    );

    return this.getPost(editPost.slug);
  }

  #hasErrors(postData: PostModel) {
    let errors: Record<string, string> | undefined = undefined;
    if (!postData.title?.length) {
      errors = { ...(errors ?? {}), title: "Title is required" };
    }
    if (!postData.content?.length) {
      errors = { ...(errors ?? {}), content: "Content is required" };
    }
    if (!postData.slug?.length) {
      errors = { ...(errors ?? {}), slug: "Slug is required" };
    }

    return errors;
  }
}

export const postsDataService = new PostsDataService();
