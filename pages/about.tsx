import Head from "next/head";
import AboutMeText from "../components/AboutMeText";
import AboutMeCard from "../components/AboutMeCard";

export default function Contact<NextPage>() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About me" />
      </Head>
      <section className=" bg-white">
        <div className="container px-6 py-8 mx-auto">
          <div className="items-center lg:flex">
            <AboutMeText />
            <AboutMeCard />
          </div>
        </div>
      </section>
    </>
  );
}
