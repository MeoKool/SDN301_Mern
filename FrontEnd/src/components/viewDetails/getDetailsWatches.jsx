import React, { useEffect, useState } from "react";
import { getWatchesById } from "../../api/ApiConfig";
import { useParams } from "react-router-dom";
import Details from "./details";

const GetDetailsWatches = () => {
  const id = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getWatchesById(id.id);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, [id]);
  return (
    <div className="container mx-auto px-4">
      <Details data={data} />
    </div>
  );
};

export default GetDetailsWatches;
