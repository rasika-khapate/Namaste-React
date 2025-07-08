import { useEffect, useState } from "react";
import mockData from "../utils/mockData.json";
import RestaurantCard from "./RestaurantCard";

const Body = () => {

  const [restaurants, setRestaurants] = useState([]);
  console.log("==> restaurants", restaurants);


  useEffect(() => {
    const timer = setTimeout(() => {
      setRestaurants(mockData);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilteredRestaurants = () => {
    const filtered = restaurants.filter((res) => res.avgRating > 4.3);
    setRestaurants(filtered);
  };

  return (
    <>
      <div id="topRes">
        <button onClick={handleFilteredRestaurants}>
          Top‑Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {restaurants.map((i) => (
          <RestaurantCard key={i.id} resData={i} />
        ))}
        
      </div>
     
    </>
  );
};

export default Body;
