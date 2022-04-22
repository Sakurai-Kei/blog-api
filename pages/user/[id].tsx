import { useRouter } from "next/router";
import useSWR from "swr";
import useUser from "../../lib/useUser";
import { IUser } from "../../models/user";
import { mockData } from "../../components/Posts";
import Comments, { mockComments } from "../../components/Comments";

export default function User() {
  const router = useRouter();
  const user = useUser();
  const { data, error } = useSWR<IUser>(
    router.query.id ? `/api/user/${router.query.id}` : null
  );
  const rowClass =
    "flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none";
  const leftClass = "w-full sm:w-1/3 font-medium text-center sm:text-left";
  const rightClass = "flex-1 text-center sm:text-left";

  if (error) return <div>Failed to load user</div>;
  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex w-full m-4 gap-4">
      <div className="flex-1">
        <div className="w-full">
          <h3 className="text-2xl font-medium">User Details</h3>
          <div className="mt-4">
            <div className={rowClass}>
              <span className={leftClass}>Full name</span>
              <span className={rightClass}>{data.fullName}</span>
            </div>
            <div className={rowClass}>
              <span className={leftClass}>Email Address</span>
              <span className={rightClass}>{data.email}</span>
            </div>
            <div className={rowClass}>
              <span className={leftClass}>Username</span>
              <span className={rightClass}>{data.username}</span>
            </div>
            <div className={rowClass}>
              <span className={leftClass}>Author</span>
              <span className={rightClass}>{data.isAuthor.toString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col flex-1 gap-2">
          {mockData.length !== 0 &&
            mockData.map((post) => {
              return (
                <div
                  key={post.title}
                  className="w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                      {post.date}
                    </span>
                  </div>

                  <div className="mt-2">
                    <a
                      href="#"
                      className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
                    >
                      {post.title}
                    </a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {post.text}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Read more
                    </a>

                    <div className="flex items-center">
                      <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                        {data.username}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          {/* {data.posts!.length === 0 && <div>No post history</div>} */}
        </div>
        <div className="flex flex-col flex-1 gap-2">
          {mockComments.length !== 0 && <Comments comments={mockComments} />}
          {/* {data.comments!.length === 0 && <div>No comment history</div>} */}
        </div>
      </div>
    </div>
  );
}
