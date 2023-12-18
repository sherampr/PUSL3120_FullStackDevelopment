import { Link, useNavigate } from "react-router-dom";
import "../CSS pages/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <header>
      <div className="navbar-container">
        <Link to="/">
          <h1>Felicon Hotel</h1>
        </Link>
        <button className="login-button" onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </header>
  );
};

export default Navbar;
