import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Navbar = () => {
  const { user,setUser } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  // console.log(window.pageYOffset);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onScroll = null);
  };
  // console.log(isScrolled);
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          {user.isAdmin && (
            <Link to="/adminPage" className="link">
              <span>Admin Page</span>
            </Link>
          )}
        </div>
        <div className="right">
          <SearchIcon className="icon" />
          <NotificationsIcon className="icon" />
          <span style={{marginRight: "15px"}}>{user.username}</span>
          <img
            src={user.profilePic}
            alt=""
          />
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span onClick={()=>setUser(null)}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
