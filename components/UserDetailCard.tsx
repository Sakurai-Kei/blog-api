import { ProfilePageData } from "../pages/user/[id]";

interface UserDetailCardComponentProps {
  data: ProfilePageData;
}

export default function UserDetailCard(props: UserDetailCardComponentProps) {
  const { data } = props;
  const rowClass =
    "flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none";
  const leftClass = "w-full sm:w-1/3 font-medium text-center sm:text-left";
  const rightClass = "flex-1 text-center sm:text-left";

  return (
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
            <span className={rightClass}>{data.user.isAuthor.toString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
