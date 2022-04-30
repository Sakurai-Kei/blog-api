import { FormEvent } from "react";
import { IPost } from "../models/post";

interface CreatePostFormComponentProps {
  handleSubmit: (event: FormEvent) => Promise<void>;
  handleChange: (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: Partial<IPost> | undefined;
}

export default function CreatePostForm(props: CreatePostFormComponentProps) {
  const { handleSubmit, handleChange, formData } = props;
  return (
    <div className="w-full flex flex-col m-2 p-4">
      <form
        method="post"
        action="/api/posts/create"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div>
          <input
            type="text"
            onChange={handleChange}
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            name="title"
            value={formData?.title}
            placeholder="Post Title"
          />
        </div>
        <div>
          <textarea
            name="text"
            onChange={handleChange}
            placeholder="Post Content"
            value={formData?.text}
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
        <div>
          <button
            type="submit"
            className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
}
