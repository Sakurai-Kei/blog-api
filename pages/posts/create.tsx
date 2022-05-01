import { useRouter } from "next/router";
import Head from "next/head";
import { FormEvent, useState } from "react";
import useUser from "../../lib/useUser";
import CreatePostForm from "../../components/CreatePostForm";

export default function CreatePost<NextPage>() {
  const router = useRouter();
  const { user } = useUser();

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
      <>
        <Head>
          <title>Not Authorized</title>
          <meta
            name="description"
            content="You do not have the appropriate auth"
          />
        </Head>
        <div>
          Verifying user auth status. If the page does not respond, please make
          sure you are logged in and have correct auth permission
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Create a Post</title>
        <meta name="description" content="Create a Post" />
      </Head>
      <CreatePostForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={undefined}
      />
    </>
  );
}
