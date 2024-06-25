import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Link } from "react-router-dom";

export default function SideBarProfile({ dataUser }) {
  console.log(dataUser);
  return (
    <div className="bg-background border-r border-muted/20 p-10 hidden md:block">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 ring-4 ring-background">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-bold">{dataUser.name}</h2>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            to="/profile"
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
          >
            <UserIcon className="w-5 h-5" />
            <span>Thông tin</span>
          </Link>
          <Link
            to="/changePassword"
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
          >
            <KeyIcon className="w-5 h-5" />
            <span>Đổi mật khẩu</span>
          </Link>
          {dataUser.isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
            >
              <BriefcaseIcon className="w-5 h-5" />
              <span>Quản lý</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}

function KeyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.5" cy="15.5" r="5.5" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}
