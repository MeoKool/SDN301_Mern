import React from "react";
import NavBar from "../components/navBar/navbar";
import DashBoardWatch from "../components/Admin/DashBoardWatches/DashBoardWatches";

export default function DashBoardWatches() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="py-10 mt-10">
        <DashBoardWatch />
      </div>
    </div>
  );
}
