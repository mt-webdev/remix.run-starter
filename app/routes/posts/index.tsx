// remix.run blogs index.tsx

import { Link, LoaderFunction, useLoaderData } from "remix";
import { PostModel } from "../../models/post.models";
import { postsDataService } from "../../services/posts-data.service";

type LoaderData = Omit<PostModel, "content">[];
export const loader: LoaderFunction = async () => {
  return await postsDataService.getPosts();
};

export default function Blogs() {
  const posts = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
