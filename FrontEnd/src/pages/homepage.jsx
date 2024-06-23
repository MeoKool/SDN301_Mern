import React from "react";
import CardProduct from "../components/Card/Card";
import NavBar from "../components/navBar/navbar";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="container sm-auto">
        <CardProduct />
      </div>
    </>
  );
}
