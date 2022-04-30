import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Posts from "../components/Posts";
import useUser from "../lib/useUser";

export default function PostsList<NextPage>() {
  const router = useRouter();
  const { user } = useUser();
  const { data: post, error: postError } = useSWR("/api/posts");

  if (!user || !user.isAuthor) {
    return (
      <div className="w-full flex flex-col">
        <Posts blogPosts={post} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <Link href={"/posts/create"}>
        <a className="w-fit p-2 ml-auto mr-4 rounded-lg shadow-md text-white bg-blue-400 hover:bg-blue-500">
          Create a new post
        </a>
      </Link>
      <Posts blogPosts={post} />
    </div>
  );
}
