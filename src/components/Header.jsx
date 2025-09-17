import { useState } from "react";
import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";

export const Header = () => {
  const [logButtonState, setLogButtonState] = useState(true);

  const handleLogging = () => {
    setLogButtonState(!logButtonState);
  };

  const onlineStatus = useOnlineStatus();

  return (
    <>
      <div className="header">
        <div className="logo-container">
          <img className="logo" src={CDN_URL} />
        </div>
        <div className="nav-main-div">
          <ul className="nav-items">
            <li>Online Status : {onlineStatus ? "✅" : "🔴"}</li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="#">Cart</Link>
            </li>
            <li>
              <Link to="/grocery">Grocery</Link>
            </li>
            <li>
              <button onClick={handleLogging}>
                {logButtonState ? "Login" : "Logout"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
