import { useEffect, useState } from "react";
import mockData from "../utils/mockData.json";
import RestaurantCard from "./RestaurantCard";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  console.log("==> restaurants", restaurants);


  useEffect(() => {
    const timer = setTimeout(() => {
      const resList =
        mockData[0]?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      // const restaurantCard = mockData[0]?.data?.cards.find(
      //   (card) => card?.card?.card?.id === "restaurant_grid_listing_v2"
      // );  // TO DETERMINE WHICH INDEX OF CARD KEY CONTAINS DATA OF RESTAURANTS, AND THIS WILL BE COMMUNNICATED TO US VIA Backend

      // const resList = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      if (Array.isArray(resList)) {
        setRestaurants(resList);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilteredRestaurants = () => {
    const filtered = restaurants.filter((res) => res.info.avgRating > 4.3);
    setRestaurants(filtered);
  };

  console.log("Rendering with restaurants:", restaurants);

  return (
    <>
      <div id="topRes">
        <button onClick={handleFilteredRestaurants}>
          Top‑Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {restaurants.map((i, index) => (
          <RestaurantCard key={i.info.id ?? index} resData={i} />
        ))}
      </div>
    </>
  );
};

export default Body;
