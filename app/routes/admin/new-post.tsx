import { ActionFunction, redirect } from "remix";
import { postsDataService } from "../../services/posts-data.service";
import PostForm from "../../shared/posts/post-form";

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

export default function NewPost() {
  return (
    <div>
      <h1>New Post</h1>
      <PostForm />
    </div>
  );
}
