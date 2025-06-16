import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  const [ListOfRestaurants, setListOfRestaurants] = useState(resList);

  const handleFilteredRestaurants = () => {
    const filteredList = ListOfRestaurants.filter((res) => res.avgRating > 4.3);
    setListOfRestaurants(filteredList);
  };

  return (
    <>
      <div id="topRes">
        <button onClick={handleFilteredRestaurants}> Top Rated Restaurants</button>
      </div>
      <div className="res-container">
        {ListOfRestaurants.map((i) => (
          <RestaurantCard key={i.id} resData={i} />
        ))}
      </div>
    </>
  );
};

export default Body;


// React's event loop here:
// Event handler runs — button is clicked, handleFilteredRestaurants executes, filters list, and calls setListOfRestaurants.
//React schedules an update — but the component doesn’t re-render immediately within that function.
// After the event handler completes, React processes state updates, and triggers a re-render of the component with the new state value.
// Now, during render, your JSX:

// {ListOfRestaurants.map((i) => (
//   <RestaurantCard key={i.id} resData={i} />
// ))}

// is evaluated using the new updated state value.

// 🔍 Why doesn’t it "stop" at 5th line?
// In React functional components:
// State updates via useState are asynchronous
// The function body (Body component function) is not "run again" immediately — it re-runs in the next render cycle after React completes its state reconciliation.

// At runtime:

// First render → initial state (resList)
// User clicks → handleFilteredRestaurants filters, setListOfRestaurants(filteredList)
// React schedules re-render
// On next render:
// ListOfRestaurants now holds filteredList

// JSX re-evaluates

// map generates new RestaurantCard components for the filtered list
// React updates the DOM
// 💡 Important principle:
// React treats function components as render blueprints.
// They aren't "live" functions waiting to be paused/resumed. Each time React renders, it invokes your function from the top, with the latest state values.

// So handleFilteredRestaurants just schedules an update — the rendering happens separately afterward.


