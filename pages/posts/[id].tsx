import { useRouter } from "next/router";
import useSWR from "swr";
import Comments from "../../components/Comments";
import useUser from "../../lib/useUser";
import { IComment } from "../../models/comment";
import { IPost } from "../../models/post";

export default function Post<NextPage>() {
  const router = useRouter();
  const user = useUser();
  const { data, error } = useSWR(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  if (error) return <div>Failed to load post</div>;
  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 m-2">
        <div>{data.post.title}</div>
        <div>{data.post.date}</div>
        <div>{data.post.text}</div>
      </div>
      <Comments comments={data.commentList as IComment[]} />
    </div>
  );
}
