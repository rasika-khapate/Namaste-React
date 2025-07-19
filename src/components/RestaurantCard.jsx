import { LOGO_URL } from "../utils/constant";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, sla, costForTwo } =
    resData?.info;
  // or sla : {slaString} then use directly deliveryTime in span
  return (
    <>
      <div className="res-card">
        <img
          alt="image"
          className="res-logo"
          src={LOGO_URL + cloudinaryImageId}
        />
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwo}</h4>
        <h4>{sla?.slaString}</h4>
      </div>
    </>
  );
};

export default RestaurantCard;
