import { useEffect } from "react";
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { postsDataService } from "../../services/posts-data.service";
import PostForm from "../../shared/posts/post-form";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "slug is required");
  const post = await postsDataService.getMarkdown(params.slug);
  return post;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title")?.toString() ?? "";
  const content = formData.get("content")?.toString() ?? "";
  const slug = formData.get("slug")?.toString() ?? "";

  try {
    await postsDataService.createPost({ title, content, slug });
    return redirect("/admin");
  } catch (errors) {
    return errors;
  }
};

export default function EditPost() {
  let post = useLoaderData();
  useEffect(() => {
    return () => {
      post = null;
    };
  }, [post.slug]);
  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm {...post} />
    </div>
  );
}
