import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


const Navbar = () => {
  const { user , dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  var verify = 0;
  try {
    const admin = user.isAdmin;
    if (admin ==1) {
      verify += 1
    }
  }catch{}
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    try {
      await axios.post("https://houseinn1.herokuapp.com/api/auth/logout");
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">House Inn</span>
        </Link>
        
        {verify == 1 ? 
        <button className="admin">Dashboard</button> 
        : <></>}

        {user ? <div className="logout">
        <Link to="/seller">
        <button className="partner">Add your Property?</button>
        </Link>
        &nbsp;&nbsp;Hello,&nbsp;
        {user.username}
        
            <button onClick={handleClick} className="navButton">Logout</button>
          </div>
           : 
           (
          <div className="navItems">
            <Link to="/register">
            <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
            <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;