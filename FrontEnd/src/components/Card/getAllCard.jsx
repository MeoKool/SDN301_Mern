import React, { useEffect, useState } from "react";
import axios from "axios";
import CardProduct from "./Card";
import { getAllWatches } from "../../api/ApiConfig";

const GetAllCard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getAllWatches();
        setCards(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <CardProduct key={card._id} data={card} />
        ))}
      </div>
    </div>
  );
};

export default GetAllCard;
