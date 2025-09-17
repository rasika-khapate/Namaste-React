import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import ShimmerUI from "./ShimmerUI";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const Body = () => {
  const [searchText, setSearchText] = useState("");

  const onlineStatus = useOnlineStatus();

  const { listOFRestaurants, filteredRestaurantDisplay } = useRestaurantMenu();

  const handleFilteredRestaurants = () => {
    const filtered = filteredRestaurantDisplay.filter(
      (res) => res.info.avgRating > 4.1
    );
    setFilteredRestaurantsDisplay(filtered);
  };

  const handleSearch = () => {
    const filteredRestaurants = listOFRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurantsDisplay(filteredRestaurants);
  };

  // console.log(searchText);

  if (!onlineStatus) {
    return (
      <h1>
        {" "}
        Looks like youre Offline! Please check your internet connectivity!{" "}
      </h1>
    );
  }

  return listOFRestaurants.length === 0 ? (
    <ShimmerUI />
  ) : (
    <>
      <div id="topRes">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </button>
        </div>

        <button onClick={handleFilteredRestaurants}>
          Top‑Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurantDisplay.map((i, index) => (
          <Link
            to={"restaurant/" + i.info.id ?? index}
            key={i.info.id ?? index}
          >
            <RestaurantCard resData={i} />{" "}
          </Link>
        ))}
      </div>
      ``
    </>
  );
};

export default Body;

// ====================================================================================================================

//   const fetchedData = await axios.get(
//     "https://api.allorigins.win/raw?url=https://swiggy-api-4c740.web.app/swiggy-api.json"
//   );

//     console.log(fetchedData);

//      const data = fetchedData.data;

// const resList =
//   data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

// console.log("✅ Restaurant List:", resList);

// ====================================================================================================================

// const restaurantCard = fetchedData.data.cards.find(
//   (card) => card?.card?.id === "restaurant_grid_listing_v2"
// );

// const resList =
//   restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;
