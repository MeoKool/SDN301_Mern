import React from "react";
import NavBar from "../components/navBar/navbar";
import ChangePassword from "../components/userProfile/changePassword";

export default function ChangePasswordUser() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="py-20 mt-10">
        <ChangePassword />
      </div>
    </div>
  );
}
