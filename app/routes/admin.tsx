import {Link, LinksFunction, LoaderFunction, Outlet, useLoaderData} from 'remix'
import adminStylesUrl from '~/styles/admin.css'
import {usePageTitle} from '../hooks/page-title.hooks'
import {PostModel} from '../models/post.models'
import {postsDataService} from '../services/posts-data.service'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: adminStylesUrl,
  },
]

export const loader: LoaderFunction = async () => {
  return postsDataService.getPosts()
}

export default function Admin() {
  usePageTitle('Admin')
  const posts = useLoaderData<PostModel[]>()

  return (
    <div className="page__admin">
      <main className="flex flex-row gap-8">
        <aside>
          <h2>Menu</h2>
          <ul className="list-none py-8 px-4 border border-gray-500 dark:border-zinc-700 rounded-sm">
            <li className="border-b border-gray-500 dark:border-zinc-700 mt-4 mr-0 mb-2 ml-0 font-bold">
              Admin
            </li>
            <li className="before:content-['🔗'] before:mr-1">
              <Link to="/admin/new-post">Create new Post</Link>
            </li>
            <li className="border-b border-gray-500 dark:border-zinc-700 mt-4 mr-0 mb-2 ml-0 font-bold">
              Posts
            </li>
            {posts.map(post => (
              <li key={post.slug} className="before:content-['🔗'] before:mr-1">
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
  )
}
