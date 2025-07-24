import menuData from "../utils/menuData.json";
// import { MENU_URL } from "../utils/constant";

// We can read resId here using usePraams hook given by react-router-dom and substitute it in api

const RestaurantMenu = () => {
  const { name, cuisines, avgRating, costForTwoMessage } =
    menuData?.data?.cards[2]?.card?.card?.info;

  const { itemCards } =
    menuData?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[0]?.card
      ?.card;
  console.log(itemCards);

  // useEffect(() => {
// fetchMenu()
  // }, []);

  // const fetchMenu = async () => {
  //   const data = await fetch(MENU_URL);
  //   const fetchedMenuData = await data.json();
  //   console.log(fetchedMenuData);

  //   // Swiggy rejecting the above api call
  // };

  return (
    <>
      <div>
        <h1>{name}</h1>
        <h3>{cuisines.join(", ")}</h3>
        <h3>{avgRating}</h3>
        <h3>{costForTwoMessage}</h3>
        <ul>
          {itemCards.map((i) => (
            <li key={i.card?.info?.id}>
              DISH : {i?.card?.info?.name} -- CATEGORY : {i?.card?.info?.category}{" "}
              -- PRICE : {i?.card?.info?.price / 100}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RestaurantMenu;
