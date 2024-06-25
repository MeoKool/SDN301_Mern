import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../api/ApiConfig";
import SideBarProfile from "./sideBar";

export default function UserProfile() {
  const [dataUser, setDataUser] = useState();
  const userLogin = sessionStorage.getItem("memberName");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await getUserInfo(userLogin);
        setDataUser(response.data);
        setIsDataLoaded(true);
      } catch (error) {
        setIsDataLoaded(false);
        console.log(error);
      }
    };
    fetchDataUser();
  }, []);
  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex w-full max-w-7xl mx-auto">
      <SideBarProfile dataUser={dataUser} />
      <div className="w-full bg-background rounded-2xl overflow-hidden shadow-lg">
        <div className="relative h-32 bg-[#f1f5f9]"></div>
        <div className="pt-20 pb-6 px-6 text-center">
          <h2 className="text-2xl font-bold">{dataUser.name}</h2>
        </div>
        <div className="border-t border-muted/20 px-6 py-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-muted/20 p-2 rounded-full">
              <UserIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Personal Info</p>
              <p className="text-xs text-muted-foreground">
                Age: 32 | Location: San Francisco
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-muted/20 p-2 rounded-full">
              <BriefcaseIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Occupation</p>
              <p className="text-xs text-muted-foreground">
                Software Engineer at Acme Inc.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-muted/20 p-2 rounded-full">
              <HeartIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Interests</p>
              <p className="text-xs text-muted-foreground">
                Hiking, Reading, Learning
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-muted/20 p-2 rounded-full">
              <LinkIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Social</p>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <Link href="#" className="hover:underline" prefetch={false}>
                  Twitter
                </Link>
                <Link href="#" className="hover:underline" prefetch={false}>
                  LinkedIn
                </Link>
                <Link href="#" className="hover:underline" prefetch={false}>
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

function HeartIcon(props) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
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

function LinkIcon(props) {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
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
