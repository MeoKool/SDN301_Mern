import React from "react";
import NavBar from "../components/navBar/navbar";
import GetDetailsWatches from "../components/viewDetails/getDetailsWatches";

export default function DetailsWatches() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="py-8 mt-10">
        <GetDetailsWatches />
      </div>
    </div>
  );
}
