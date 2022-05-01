import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { SyntheticEvent } from "react";
import useSWR from "swr";
import Comments from "../../components/Comments";
import useUser from "../../lib/useUser";
import { IComment } from "../../models/comment";
import { IPost } from "../../models/post";

export interface PostPageSWRProp {
  post: IPost;
  commentList: IComment[];
}

export default function Post<NextPage>() {
  const router = useRouter();
  const { user } = useUser();
  const { data, error, mutate } = useSWR<PostPageSWRProp>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  async function deletePost(event: SyntheticEvent) {
    event.preventDefault();
    const postId = event.currentTarget.id;
    const JSONdata = JSON.stringify(postId);
    const endpoint = "/api/posts/delete";
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    console.log(response.status);
    if (response.status === 200) {
      router.push("/posts");
    } else {
      const result = await response.json();
      console.log("Some error has occured: ", result.error);
    }
  }

  if (error) {
    setTimeout(() => {
      router.push("/posts");
    }, 3000);
    return (
      <>
        <Head>
          <title>No data fetched</title>
          <meta name="description" content="Data fetch failure" />
        </Head>
        <div>Failed to load post. Redirecting back to posts page</div>
      </>
    );
  }
  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Head>
        <title>{data.post.title}</title>
        <meta name="description" content="Post Page" />
      </Head>
      <div className="w-full flex flex-col gap-4">
        {user.isAuthor && (
          <div className="flex justify-end gap-4">
            <button
              onClick={deletePost}
              id={data.post._id.toString()}
              className="w-fit p-2 rounded-lg shadow-md bg-red-400 hover:bg-red-500 text-white"
            >
              Delete Post
            </button>
            <Link
              href={{
                pathname: `/posts/update`,
                query: { id: router.query.id },
              }}
            >
              <a className="w-fit p-2 mr-4 rounded-lg shadow-md bg-blue-400 hover:bg-blue-500 text-white">
                Edit post
              </a>
            </Link>
          </div>
        )}
        <div className="w-full flex flex-col gap-4 px-4 py-2 bg-gradient-to-r from-blue-300 to-indigo-300">
          <div className="flex flex-col gap-4 m-2">
            <div>{data.post.title}</div>
            <div>{data.post.dateFormatted}</div>
            <div>By {data.post.authors.username}</div>
            <div>{data.post.text}</div>
          </div>
          <Comments
            mutate={mutate}
            comments={data.commentList as IComment[]}
            postId={router.query.id as string}
          />
        </div>
      </div>
    </>
  );
}
