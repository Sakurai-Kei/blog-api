import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withSessionSsr } from "../lib/withSession";
import { isPast, parseISO, parseJSON } from "date-fns";
import Layout from "../components/Layout";
import { IronSessionData } from "iron-session";
import { NextApiRequest } from "next";
import { SWRConfig } from "swr";
import fetchJson from "../lib/fetchJson";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
