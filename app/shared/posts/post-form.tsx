import {Form, useActionData, useTransition} from 'remix'
import {PostModel} from '../../models/post.models'

type AdminFormProps = Partial<PostModel>

export default function PostForm(props: AdminFormProps) {
  const transition = useTransition()
  const {title, content, slug} = props
  const isNew = !slug
  const errors = useActionData<Record<string, string>>()

  return (
    <Form method="post">
      <p>
        <label htmlFor="title">
          Title:
          {errors?.title && <em> {errors.title}</em>}
        </label>
        <input type="text" name="title" id="title" defaultValue={title} />
      </p>
      <p>
        <label htmlFor="title">
          Slug:
          {errors?.slug && (
            <em className="font-bold italic text-red-500"> {errors.slug}</em>
          )}
        </label>
        <input type="text" name="slug" id="slug" defaultValue={slug} />
      </p>
      <p>
        <label htmlFor="content">
          Content:
          {errors?.content && <em> {errors.content}</em>}
        </label>
        <br />
        <textarea
          defaultValue={content}
          name="content"
          id="content"
          cols={80}
          rows={30}
        ></textarea>
      </p>
      <p>
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 focus:outline-none border-none text-slate-50 text-base p-4 uppercase transition-colors duration-200 ease-in-out"
        >
          {transition.submission ? (
            <>
              Processing <span className="animate-pulse">💾</span>
            </>
          ) : isNew ? (
            'Create Post'
          ) : (
            'Edit Post'
          )}
        </button>
      </p>
    </Form>
  )
}
