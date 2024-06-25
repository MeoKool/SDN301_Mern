import React from "react";
import NavBar from "../components/navBar/navbar";
import UserProfile from "../components/userProfile/userProfile";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="py-20 mt-10">
        <UserProfile />
      </div>
    </div>
  );
}
