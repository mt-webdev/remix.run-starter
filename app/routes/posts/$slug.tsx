import { useEffect } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { PostModel } from "../../models/post.models";
import { postsDataService } from "../../services/posts-data.service";

type LoaderData = PostModel;
export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  invariant(params.slug, "expected params.slug");
  return await postsDataService.getPost(params.slug!);
};

export default function Post() {
  const post = useLoaderData<LoaderData>();

  useEffect(() => {
    window.document.title = `${post.title}`;
  }, [post.title]);

  return <div dangerouslySetInnerHTML={{ __html: post.content }}></div>;
}
