import React, { useEffect, useState } from "react";
import { getWatchesById } from "../../api/ApiConfig";
import { useParams } from "react-router-dom";
import Details from "./details";

const GetDetailsWatches = () => {
  const id = useParams();
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getWatchesById(id.id);
        setData(response.data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, [data.comments]);
  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto px-4">
      <Details data={data} />
    </div>
  );
};

export default GetDetailsWatches;
