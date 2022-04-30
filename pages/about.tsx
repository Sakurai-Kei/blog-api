import AboutMeText from "../components/AboutMeText";
import AboutMeCard from "../components/AboutMeCard";

export default function Contact<NextPage>() {
  return (
    <section className=" bg-white dark:bg-gray-800">
      <div className="container px-6 py-8 mx-auto">
        <div className="items-center lg:flex">
          <AboutMeText />
          <AboutMeCard />
        </div>
      </div>
    </section>
  );
}
