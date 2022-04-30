import { useRouter } from "next/router";
import useSWR from "swr";
import useUser from "../../lib/useUser";
import { IUser } from "../../models/user";
import Posts from "../../components/Posts";
import Comments from "../../components/Comments";
import { IPost } from "../../models/post";
import { IComment } from "../../models/comment";
import { useState } from "react";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import UserDetailCard from "../../components/UserDetailCard";

export interface ProfilePageData {
  user: IUser;
  postList: IPost[];
  commentList: IComment[];
}

export default function User() {
  const router = useRouter();
  const { user } = useUser();
  const [modal, setModal] = useState(false);
  const { data, error, mutate } = useSWR<ProfilePageData>(
    router.query.id ? `/api/user/${router.query.id}` : null
  );

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
        <DeleteAccountModal
          data={data}
          handleDelete={handleDelete}
          closeWarning={closeWarning}
        />
      )}

      <div className="flex flex-wrap w-full m-4 gap-4 ">
        <UserDetailCard data={data} />
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
                mutate={mutate}
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
