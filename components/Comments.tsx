import Link from "next/link";
import React, { BaseSyntheticEvent, SyntheticEvent, useReducer } from "react";
import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";
import useUser from "../lib/useUser";
import { IComment } from "../models/comment";

interface Props {
  comments: IComment[];
  postId: string;
}

export default function Comments(props: Props) {
  const { comments, postId } = props;
  const user = useUser();

  const [formData, setFormData] = useState({
    text: "",
    author: "",
    postId,
  });

  if (user && user.username !== formData.author) {
    setFormData({
      ...formData,
      author: user.username,
    });
  }

  async function deleteComment(event: SyntheticEvent) {
    event.preventDefault();
    const commentId = (event.target as HTMLElement).id;
    const JSONdata = JSON.stringify(commentId);
    const endpoint = "/api/posts/deleteComment";
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    if (response.status !== 200) {
      const result = await response.json();
      console.log("Some error has occured: ", result.error);
    }
  }

  function handleChange(
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.currentTarget.value;
    setFormData({
      ...formData,
      [event.currentTarget.name]: value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const JSONdata = JSON.stringify(formData);
    const endpoint = "/api/posts/addComment";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    setFormData({
      ...formData,
      text: "",
    });

    if (response.status !== 200) {
      const result = await response.json();
      console.log("Some error has occured: ", result.error);
    }
  }

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
        {postId && (
          <div className="flex gap-2 justify-between w-full px-8 py-4 rounded-lg shadow-md dark:bg-gray-800 bg-gradient-to-b from-blue-300 to-blue-400">
            <form
              method="post"
              action="/api/posts/addComment"
              onSubmit={handleSubmit}
              className="flex gap-4 w-full"
            >
              <div>
                <textarea
                  name="text"
                  onChange={handleChange}
                  className="w-full rounded-lg flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Add your comments here"
                  value={formData.text}
                  cols={50}
                />
              </div>
              <button
                type="submit"
                className="flex items-center bg-white rounded-lg shadow-md px-4 py-2 text-blue-600 dark:text-blue-400 hover:underline m-2"
              >
                Comment
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg">
      <div className="flex w-full justify-center mb-2">Comment Section</div>
      {comments.map((comment) => {
        return (
          <div
            key={comment._id}
            className="flex gap-2 justify-between w-full px-8 py-4  rounded-lg shadow-md dark:bg-gray-800 bg-gradient-to-b from-blue-300 to-blue-400"
          >
            <div className="mt-2 bg-white w-full rounded-lg shadow-md px-4 py-2">
              <div className="flex gap-2 justify-between">
                <h3>{comment.author.username}</h3>
                {comment.author.username === user.username && (
                  <button onClick={deleteComment}>
                    <svg
                      id={comment._id.toString()}
                      className="w-8 hover:stroke-red-500 hover:rounded-lg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
              <p className="b mt-2 text-gray-600 dark:text-gray-300">
                {comment.text}
              </p>
              <p>{comment.date.toString()}</p>
            </div>
            <Link href={"/posts/" + comment.posts._id}>
              <a className="flex items-center bg-white rounded-lg shadow-md px-4 py-2 text-blue-600 dark:text-blue-400 hover:underline mt-2">
                Post Link
              </a>
            </Link>
          </div>
        );
      })}
      {postId && (
        <div className="flex gap-2 justify-between w-full px-8 py-4 rounded-lg shadow-md dark:bg-gray-800 bg-gradient-to-b from-blue-300 to-blue-400">
          <form
            method="post"
            action="/api/posts/addComment"
            onSubmit={handleSubmit}
            className="flex gap-4 w-full"
          >
            <div>
              <textarea
                name="text"
                onChange={handleChange}
                value={formData.text}
                className="w-full rounded-lg flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Add your comments here"
                cols={50}
              />
            </div>
            <button
              type="submit"
              className="flex items-center bg-white rounded-lg shadow-md px-4 py-2 text-blue-600 dark:text-blue-400 hover:underline m-2"
            >
              Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
