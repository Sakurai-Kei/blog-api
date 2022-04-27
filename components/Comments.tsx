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

  if (comments.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex w-full justify-center mb-2">Comment Section</div>
        <div className="flex w-full justify-center mb-2">
          No comment posted yet
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex w-full justify-center mb-2">Comment Section</div>
      {comments.map((comment) => {
        return (
          <div
            key={comment._id}
            className="flex gap-2 justify-between w-full px-8 py-4  rounded-lg shadow-md dark:bg-gray-800 bg-gradient-to-b from-blue-300 to-blue-400"
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
    </div>
  );
}
