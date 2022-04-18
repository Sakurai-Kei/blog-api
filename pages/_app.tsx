import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withIronSessionSsr } from "iron-session/next";
import { isPast, parseISO, parseJSON } from "date-fns";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
