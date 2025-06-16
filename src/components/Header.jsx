import { CDN_URL } from "../utils/constant";

export const Header = () => {
  return (
    <>
      <div className="header">
        <div className="logo-container">
          <img
            className="logo"
            src={CDN_URL}
          />
        </div>
        <div className="nav-main-div">
          <ul className="nav-items">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Cart</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header