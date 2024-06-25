import React from "react";
import NavBar from "../components/navBar/navbar";
import DashBoardMember from "../components/Admin/DashBoardMember/DashBoardMember";

export default function DashBoardAdmin() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="py-10 mt-10">
        <DashBoardMember />
      </div>
    </div>
  );
}
