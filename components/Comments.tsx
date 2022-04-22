import { IComment } from "../models/comment";

interface Props {
  comments: IComment[];
}

export const mockComments: IComment[] = [
  {
    text: "I like this article",
    date: "random date",
    author: "user",
  },
  {
    text: "Good job",
    date: "random date",
    author: "user",
  },
  {
    text: "Best",
    date: "random date",
    author: "user",
  },
];

export default function Comments(props: Props) {
  const { comments } = props;

  return (
    <>
      {comments.map((comment) => {
        return (
          <div
            key={comment.text}
            className="flex gap-2 justify-between w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <div className="mt-2">
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {comment.text}
              </p>
            </div>
            <a className="text-blue-600 dark:text-blue-400 hover:underline mt-4">
              Post link
            </a>
          </div>
        );
      })}
    </>
  );
}
