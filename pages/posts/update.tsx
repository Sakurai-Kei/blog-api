import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import useUser from "../../lib/useUser";
import { IPost } from "../../models/post";

export default function UpdatePost<NextPage>() {
  const router = useRouter();
  const user = useUser();
  const postId = router.query.id;
  const { data, error } = useSWR(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  const [formData, setFormData] = useState<Partial<IPost>>({});

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
    const endpoint = "/api/posts/update";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      const result = await response.json();
      router.push(result.url);
    } else {
      const result = await response.json();
      setErrors({
        ...errors,
        error: result.error,
      });
      router.push(data.post.url);
    }
  }

  if (!user || !user.isAuthor) {
    return <div>You do not have the appropriate auth</div>;
  }

  if (data && data.post._id !== formData._id) {
    setFormData(data.post);
  }

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full flex flex-col px-4 py-2">
      <form
        method="put"
        action="/api/posts/update"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div>
          <input
            type="text"
            onChange={handleChange}
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            name="title"
            value={formData.title}
            placeholder="Post Title"
          />
        </div>
        <div>
          <textarea
            name="text"
            onChange={handleChange}
            placeholder="Post Content"
            value={formData.text}
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
