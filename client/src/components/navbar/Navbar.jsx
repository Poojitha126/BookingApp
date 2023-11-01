import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
 faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    
    navigate("/")
    
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo"> Inn Booking</span>
        </Link>
        {user ? 
          <div className="navItems">
            
              <FontAwesomeIcon icon={faUserCircle} />
            <span className="logo"> {user}</span>
            <button className="navButton" onClick={handleClick}>Log Out</button>
           
          </div>: (
          <div className="navItems">
            <Link to="/login"> <button className="navButton">Login</button></Link>
            <button className="navButton"> Register</button>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;