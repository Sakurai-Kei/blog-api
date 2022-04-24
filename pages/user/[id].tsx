import { useRouter } from "next/router";
import useSWR from "swr";
import useUser from "../../lib/useUser";
import { IUser } from "../../models/user";
import Posts from "../../components/Posts";
import Comments, { mockComments } from "../../components/Comments";
import { IPost } from "../../models/post";

export default function User() {
  const router = useRouter();
  const userSession = useUser();
  const { data: user, error: userError } = useSWR<IUser>(
    router.query.id ? `/api/user/${router.query.id}` : null
  );
  const { data: postList, error: postListError } =
    useSWR<IPost[]>("/api/posts");

  const rowClass =
    "flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none";
  const leftClass = "w-full sm:w-1/3 font-medium text-center sm:text-left";
  const rightClass = "flex-1 text-center sm:text-left";

  if (userError) return <div>Failed to load user</div>;
  if (!user) {
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
              <span className={rightClass}>{user.fullName}</span>
            </div>
            <div className={rowClass}>
              <span className={leftClass}>Email Address</span>
              <span className={rightClass}>{user.email}</span>
            </div>
            <div className={rowClass}>
              <span className={leftClass}>Username</span>
              <span className={rightClass}>{user.username}</span>
            </div>
            <div className={rowClass}>
              <span className={leftClass}>Author</span>
              <span className={rightClass}>{user.isAuthor.toString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col flex-1 gap-2">
          <Posts blogPosts={postList} />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          {mockComments.length !== 0 && <Comments comments={mockComments} />}
          {/* {data.comments!.length === 0 && <div>No comment history</div>} */}
        </div>
      </div>
    </div>
  );
}
