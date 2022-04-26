import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import useUser from "../../lib/useUser";

export default function CreatePost<NextPage>() {
  const router = useRouter();
  const user = useUser();

  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const [errors, setErrors] = useState({
    error: "",
  });

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
    const endpoint = "/api/posts/create";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      const result = await response.json();
      router.push(`/posts/${result._id}`);
    } else {
      const result = await response.json();
      setErrors({
        error: `Status Code: ${response.status}(${result.error})`,
      });
    }
  }

  if (!user || !user.isAuthor) {
    return (
      <div>
        Verifying user auth status. If the page does not respond, please make
        sure you are logged in and have correct auth permission
      </div>
    );
  }

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
            placeholder="Post Title"
          />
        </div>
        <div>
          <textarea
            name="text"
            onChange={handleChange}
            placeholder="Post Content"
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
