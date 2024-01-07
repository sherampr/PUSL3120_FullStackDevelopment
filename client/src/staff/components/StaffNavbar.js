import { Link } from "react-router-dom";
import '../../styles/Navbar.css'

const StaffNavbar = ()=>{

    return(
        <header>
            <div className="nav__logo">
                <Link  to="/">
                    <h1 className="felicon">Felicon Hotel</h1>
                </Link>
            </div>
            <div className="nav__links">
            <Link className="link" to="/staff/newroom">
                    <h5>New Room</h5>
                </Link>

                <Link className="link" to="/staff/currentrooms">
                    <h5>Current Rooms</h5>
                </Link>


                <Link className="link" to="/staff/viewbook">
                    <h5>Reserved Tables</h5>
                </Link>

                <Link className="link" to="/staff/bookinglist">
                    <h5>Booking</h5>
                </Link>

                <Link className="link" to="/staff/menu">
                    <h5>Manage Restaurant Menu</h5>
                </Link>

                <Link className="link" to="/login">
                    <h5>Login</h5>
                </Link>
                
            </div>
        
        </header>
    )
}
export default StaffNavbar;
