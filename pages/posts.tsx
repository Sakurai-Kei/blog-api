import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Posts from "../components/Posts";

export default function PostsList<NextPage>() {
  const router = useRouter();
  const { data, error } = useSWR("/api/posts");

  return <Posts blogPosts={data} />;
}
