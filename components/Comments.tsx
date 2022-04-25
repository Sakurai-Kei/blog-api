import Link from "next/link";
import { IComment } from "../models/comment";

interface Props {
  comments: IComment[];
}

export default function Comments(props: Props) {
  const { comments } = props;

  if (!comments) {
    return <div>Loading Comments</div>;
  }

  return (
    <>
      {comments.map((comment) => {
        return (
          <div
            key={comment._id}
            className="flex gap-2 justify-between w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <div className="mt-2">
              <h3>{comment.author.username}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {comment.text}
              </p>
              {/* @ts-expect-error */}
              <p>{comment.date}</p>
            </div>
            <Link href={"/posts/" + comment.posts._id}>
              <a className="text-blue-600 dark:text-blue-400 hover:underline mt-4">
                Post link
              </a>
            </Link>
          </div>
        );
      })}
    </>
  );
}
