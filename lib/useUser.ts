import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { IronSessionData } from "iron-session";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user } = useSWR<IronSessionData>("/api/user");

  useEffect(() => {
    if (!redirectTo || !user) return;
    if (
      (redirectTo && !redirectIfFound && !user) ||
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);
  return user;
}
