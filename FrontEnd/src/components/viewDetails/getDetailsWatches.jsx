import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWatchesById } from "../../api/ApiConfig";
import Details from "./details";

const GetDetailsWatches = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    const fetchWatchesDetails = async () => {
      try {
        const response = await getWatchesById(id);
        setData(response.data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Failed to fetch watch details:", error);
        setIsDataLoaded(false);
      }
    };
    fetchWatchesDetails();
  }, [id]);
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
