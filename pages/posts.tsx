import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Comments from "../components/Comments";
import Posts from "../components/Posts";

export default function PostsList<NextPage>() {
  const router = useRouter();
  const { data: post, error: postError } = useSWR("/api/posts");
  return (
    <>
      <Posts blogPosts={post} />
    </>
  );
}
