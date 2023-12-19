import { Link } from "react-router-dom";
import '../styles/Navbar.css'

const Navbar = ()=>{

    return(
        <header>
            <div className="nav__logo">
                <Link  to="/">
                    <h1 className="felicon">Felicon Hotel</h1>
                </Link>
            </div>
            <div className="nav__links">
            <Link className="link" to="/rooms">
                    <h5>Rooms</h5>
                </Link>
                <Link className="link" to="/">
                    <h5>Services</h5>
                </Link>
                <Link className="link" to="/login">
                    <h5>Login</h5>
                </Link>
                
            </div>
        
        </header>
    )
}
export default Navbar;
