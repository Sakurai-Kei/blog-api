import Image from "next/image";
import Link from "next/link";
import macbookPicture from "../public/macbook.png";

export default function Hero() {
  const buttonClass =
    "w-full px-3 py-2 mt-6 text-xs font-medium text-white uppercase transition-colors duration-200 transform bg-gradient-to-br from-indigo-500 via-blue-400 to-pink-500 rounded-md lg:w-auto hover:bg-gradient-to-br hover:from-indigo-600 hover:via-blue-500 hover:to-pink-600 focus:outline-none hover:bg-gradient-to-br focus:from-indigo-600 focus:via-blue-500 focus:to-pink-600";
  return (
    <div className="container px-6 py-16 mx-auto bg-gradient-to-r from-indigo-300 via-blue-200 to-indigo-400">
      <div className="items-center lg:flex">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-2xl font-semibold text-gray-800 uppercase lg:text-3xl">
              Blog web app made by using NextJs Framework
            </h1>
            <p className="mt-2 mb-4 text-gray-600">
              The web app allows user to make an account and register, allowing
              them to leave a comment on any post. Users are allowed to delete
              their own comments and account(should the user request account
              deletion).
            </p>
            <Link href={"/posts"}>
              <a className={buttonClass}>Go to posts list</a>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <Image src={macbookPicture} alt={"Macbook"} priority={true} />
        </div>
      </div>
    </div>
  );
}
