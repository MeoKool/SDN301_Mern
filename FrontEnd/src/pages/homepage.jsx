import React from "react";
import NavBar from "../components/navBar/navbar";
import GetAllCard from "../components/Card/getAllCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="py-8 mt-10">
        <GetAllCard />
      </div>
    </div>
  );
}
