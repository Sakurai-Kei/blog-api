import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import CreatePostForm from "../../components/CreatePostForm";
import useUser from "../../lib/useUser";
import { IPost } from "../../models/post";

export default function UpdatePost<NextPage>() {
  const router = useRouter();
  const { user } = useUser();
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

  if (!router.query.id) {
    return <div>No query id provided</div>;
  }

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <CreatePostForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
  );
}
