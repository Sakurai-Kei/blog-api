import { useRouter } from "next/router";
import useSWR from "swr";
import useUser from "../../lib/useUser";
import { IUser } from "../../models/user";
import Posts from "../../components/Posts";
import Comments from "../../components/Comments";
import { IPost } from "../../models/post";
import { IComment } from "../../models/comment";
import { useState } from "react";

interface ProfilePageData {
  user: IUser;
  postList: IPost[];
  commentList: IComment[];
}

export default function User() {
  const router = useRouter();
  const user = useUser();
  const [modal, setModal] = useState(false);
  const { data, error } = useSWR<ProfilePageData>(
    router.query.id ? `/api/user/${router.query.id}` : null
  );

  const rowClass =
    "flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none";
  const leftClass = "w-full sm:w-1/3 font-medium text-center sm:text-left";
  const rightClass = "flex-1 text-center sm:text-left";

  function showWarning() {
    setModal(true);
  }

  function closeWarning() {
    setModal(false);
  }

  async function handleDelete() {
    const username = user.username;
    const JSONdata = JSON.stringify(username);
    const endpoint = "/api/user/delete";
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    if (response.status !== 200) {
      const result = await response.json();
      console.error("Some error has occured: ", result.error);
    } else {
      router.push("/");
    }
  }

  if (error) return <div>Failed to load user</div>;
  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <>
      {modal && (
        <div className="w-full absolute top-0">
          <div className="h-screen w-full z-10 inset-0 overflow-y-auto">
            <div className="absolute w-full h-full inset-0 bg-gray-500 opacity-75"></div>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              ></span>
              <div
                className="inline-block relative overflow-hidden transform transition-all sm:align-middle sm:max-w-lg"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div>
                  <div className="rounded-t-lg p-8 bg-white shadow">
                    <div className="p-4">
                      <div className="text-center">
                        <p className="text-2xl text-gray-800 dark:text-white">
                          {data.user.fullName}
                        </p>
                        <p className="text-xl text-gray-500 dark:text-gray-200 font-light">
                          {data.user.username}
                        </p>
                        <p className="text-md text-gray-500 dark:text-gray-400 max-w-xs py-4 font-light"></p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      DELETE
                    </button>
                    <button
                      type="button"
                      onClick={closeWarning}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap w-full m-4 gap-4 ">
        <div className="h-fit flex-1 m-2 px-4 py-2 rounded-lg shadow-md bg-gradient-to-r from-blue-300 to-indigo-300">
          <div className="w-full">
            <h3 className="text-2xl font-medium">User Details</h3>
            <div className="mt-4">
              <div className={rowClass}>
                <span className={leftClass}>Full name</span>
                <span className={rightClass}>{data.user.fullName}</span>
              </div>
              <div className={rowClass}>
                <span className={leftClass}>Email Address</span>
                <span className={rightClass}>{data.user.email}</span>
              </div>
              <div className={rowClass}>
                <span className={leftClass}>Username</span>
                <span className={rightClass}>{data.user.username}</span>
              </div>
              <div className={rowClass}>
                <span className={leftClass}>Author</span>
                <span className={rightClass}>
                  {data.user.isAuthor.toString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          {user?.username === data.user.username && (
            <button
              onClick={showWarning}
              className="bg-red-400 hover:bg-red-500 rounded-lg shadow-md w-fit p-4 self-center"
            >
              DELETE ACCOUNT
            </button>
          )}
          <div className="flex flex-col flex-1 gap-2">
            {data.postList && <Posts blogPosts={data.postList} />}
          </div>
          <div className="flex flex-col flex-1 gap-2">
            {data.commentList && (
              <Comments
                comments={data.commentList as IComment[]}
                postId={null}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
