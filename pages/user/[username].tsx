import loadConfig from "next/dist/server/config";
import { useRouter } from "next/router";
import useSWR from "swr";
import useUser from "../../lib/useUser";

export default function User() {
  const router = useRouter();
  const user = useUser();
  const { data, error } = useSWR(
    router.query.username ? `/api/user/${router.query.username}` : null
  );

  if (!data) {
    return <div>Loading</div>;
  }

  return <div>{data.username}</div>;
}
