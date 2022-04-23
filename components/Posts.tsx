// export interface IPost {
//   title: string;
//   date: string;
//   text: string;
//   authors: string;
//   comments: string;
// }
import { IPost } from "../models/post";

interface PostsProp {
  blogPosts: IPost[];
}

export const mockData: IPost[] = [
  {
    title: "Post 1",
    date: new Date().toString(),
    text: "Content of post 1",
    authors: "mock Author",
    comments: "mock Comment 1",
    _id: "1",
  },
  {
    title: "Post 2",
    date: new Date().toString(),
    text: "Content of post 2",
    authors: "mock Author",
    comments: "mock Comment 1",
    _id: "2",
  },
  {
    title: "Post 3",
    date: new Date().toString(),
    text: "Content of post 3",
    authors: "mock Author",
    comments: "mock Comment 1",
    _id: "3",
  },
];

export default function Posts(props: PostsProp) {
  const { blogPosts } = props;
  return (
    <div className="flex flex-col gap-2">
      {blogPosts.map((post: IPost) => {
        return (
          <div
            key={post.title}
            className="flex flex-col px-2 py-2 flex-wrap w-full"
          >
            <div>{post.title}</div>
            {/* @ts-expect-error */}
            <div>{post.authors}</div>
            {/* @ts-expect-error */}
            <div>{post.date}</div>
            <div>{post.text}</div>
          </div>
        );
      })}
    </div>
  );
}
