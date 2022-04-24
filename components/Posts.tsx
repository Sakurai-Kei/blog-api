import Link from "next/link";
import { IPost } from "../models/post";

interface PostsProp {
  blogPosts: IPost[] | undefined;
}

export default function Posts(props: PostsProp) {
  const { blogPosts } = props;
  if (!blogPosts) {
    return <div>Loading Posts</div>;
  }
  return (
    <div className="flex flex-col flex-1 gap-2">
      {blogPosts!.length !== 0 &&
        blogPosts!.map((post) => {
          return (
            <div
              key={post._id.toString()}
              className="w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                  {/* @ts-expect-error */}
                  {post.date}
                </span>
              </div>

              <div className="mt-2">
                <a
                  href="#"
                  className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
                >
                  {post.title}
                </a>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {post.text}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Link href={"/posts/" + post._id}>
                  <a className="text-blue-600 dark:text-blue-400 hover:underline">
                    Read more
                  </a>
                </Link>

                <div className="flex items-center">
                  <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                    {post.authors.username}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      {/* {data.posts!.length === 0 && <div>No post history</div>} */}
    </div>
  );
}
