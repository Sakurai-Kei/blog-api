import { useRouter } from "next/router";
import useSWR from "swr";
import useUser from "../../lib/useUser";
import { IPost } from "../../models/post";

export default function Post<NextPage>() {
  const router = useRouter();
  const user = useUser();
  const { data, error } = useSWR<IPost>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  if (error) return <div>Failed to load post</div>;
  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col gap-4 m-2">
      <div>{data.title}</div>
      {/* @ts-expect-error */}
      <div>{data.date}</div>
      <div>{data.text}</div>
    </div>
  );
}
