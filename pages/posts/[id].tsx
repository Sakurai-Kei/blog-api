import { useRouter } from "next/router";
import useSWR from "swr";
import Comments from "../../components/Comments";
import useUser from "../../lib/useUser";
import { IComment } from "../../models/comment";
import { IPost } from "../../models/post";

export default function Post<NextPage>() {
  const router = useRouter();
  const user = useUser();
  const { data: post, error: postError } = useSWR<IPost>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  const { data: commentList, error: commentListError } = useSWR<IComment[]>(
    router.query.id ? `/api/comments/${router.query.id}` : null
  );

  if (postError) return <div>Failed to load post</div>;
  if (!post) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 m-2">
        <div>{post.title}</div>
        {/* @ts-expect-error */}
        <div>{post.date}</div>
        <div>{post.text}</div>
      </div>
      <Comments comments={commentList as IComment[]} />
    </div>
  );
}
