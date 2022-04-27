import Link from "next/link";
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
    <div className="w-full flex flex-col gap-4">
      {user.isAuthor && (
        <Link
          href={{
            pathname: `/posts/update`,
            query: { id: router.query.id },
          }}
        >
          <a className="w-fit p-2 ml-auto mr-4 rounded-lg shadow-md bg-blue-400 hover:bg-blue-500 text-white">
            Edit post
          </a>
        </Link>
      )}
      <div className="w-full flex flex-col gap-4 px-4 py-2 bg-gradient-to-r from-blue-300 to-indigo-300">
        <div className="flex flex-col gap-4 m-2">
          <div>{data.post.title}</div>
          <div>{data.post.date}</div>
          <div>{data.post.text}</div>
        </div>
        <Comments comments={data.commentList as IComment[]} />
      </div>
    </div>
  );
}
