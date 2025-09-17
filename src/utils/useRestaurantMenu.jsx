import { useState, useEffect } from "react";
import { NAMASTEREACTSWIGGYAPI } from "../utils/constant";

const useRestaurantMenu = () => {
  const [listOFRestaurants, setlistOFRestaurants] = useState([]);
  const [filteredRestaurantDisplay, setFilteredRestaurantsDisplay] = useState(
    []
  );

  useEffect(() => {
    fetchedRestaurants();
  }, []);

  const fetchedRestaurants = async () => {
    const data = await fetch(NAMASTEREACTSWIGGYAPI);
    const fetchedData = await data.json();

    const resList =
      fetchedData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    console.log(resList);

    setlistOFRestaurants(resList);
    setFilteredRestaurantsDisplay(resList);
  };

  return { listOFRestaurants, filteredRestaurantDisplay };
};

export default useRestaurantMenu;
