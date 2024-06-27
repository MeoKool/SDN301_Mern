import React from "react";
import NavBar from "../components/navBar/navbar";
import DashBoardBrand from "../components/Admin/DashBoardBrand/DashBoardBrand";

export default function DashBoardBrands() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="py-10 mt-10">
        <DashBoardBrand />
      </div>
    </div>
  );
}
