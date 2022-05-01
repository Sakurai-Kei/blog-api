import type { NextPage } from "next";
import useSWR from "swr";
import Head from "next/head";
import Hero from "../components/Hero";
import Posts from "../components/Posts";
import useUser from "../lib/useUser";
import { IPost } from "../models/post";

const Home: NextPage = () => {
  const user = useUser();
  const { data: postList, error: postListError } =
    useSWR<IPost[]>("/api/posts");

  return (
    <>
      <Head>
        <title>SK BLOG-API Project</title>
        <meta name="description" content="Sakurai Kei's Blog Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <Hero />
        <Posts blogPosts={postList} />
      </div>
    </>
  );
};

export default Home;
