import React from "react";
import NavBar from "../components/navBar/navbar";
import EditProfile from "../components/userProfile/editUser";

export default function EditProfileUser() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="py-20 mt-10">
        <EditProfile />
      </div>
    </div>
  );
}
