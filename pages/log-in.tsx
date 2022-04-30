import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import LogInForm from "../components/LogInForm";
import useUser from "../lib/useUser";

export default function LogIn<NextPage>() {
  const router = useRouter();
  const { user, mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    error: "",
  });

  function handleChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    setFormData({
      ...formData,
      [event.currentTarget.name]: value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const JSONdata = JSON.stringify(formData);
    const endpoint = "/api/log-in";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      await mutateUser();
      router.push("/");
    } else {
      const result = await response.json();
      setErrors({
        error: `Status Code: ${response.status}(${result.error})`,
      });
    }
  }

  return (
    <div className="w-full flex justify-center bg-gradient-to-br from-pink-300 to-pink-500">
      <LogInForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
      />
    </div>
  );
}
