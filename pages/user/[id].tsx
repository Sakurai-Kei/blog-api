import { useRouter } from "next/router";
import useSWR from "swr";
import useUser from "../../lib/useUser";
import { IUser } from "../../models/user";
import Posts from "../../components/Posts";
import Comments from "../../components/Comments";
import { IPost } from "../../models/post";
import { IComment } from "../../models/comment";

interface ProfilePageData {
  user: IUser;
  postList: IPost[];
  commentList: IComment[];
}

export default function User() {
  const router = useRouter();
  const userSession = useUser();
  const { data, error } = useSWR<ProfilePageData>(
    router.query.id ? `/api/user/${router.query.id}` : null
  );
  console.log(data);

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
        <div className="flex flex-col flex-1 gap-2">
          {data.postList && <Posts blogPosts={data.postList} />}
        </div>
        <div className="flex flex-col flex-1 gap-2">
          {data.commentList && (
            <Comments comments={data.commentList as IComment[]} />
          )}
        </div>
      </div>
    </div>
  );
}
