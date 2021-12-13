import {
  Link,
  LinksFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
} from "remix";
import { usePageTitle } from "../hooks/page-title.hooks";
import { PostModel } from "../models/post.models";
import { postsDataService } from "../services/posts-data.service";
import adminStylesUrl from "../styles/out/admin.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: adminStylesUrl,
  },
];

export const loader: LoaderFunction = async () => {
  return postsDataService.getPosts();
};

export default function Admin() {
  usePageTitle("Admin");
  const posts = useLoaderData<PostModel[]>();

  return (
    <div className="page__admin">
      <main>
        <aside>
          <h2>Menu</h2>
          <ul>
            <li className="separator">Admin</li>
            <li>
              <Link to="/admin/new-post">Create new Post</Link>
            </li>
            <li className="separator">Posts</li>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={`/admin/${post.slug}/edit`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
