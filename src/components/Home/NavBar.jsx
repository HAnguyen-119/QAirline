import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div>
            <button><Link to='/booking'>Booking</Link></button>
            <button><Link to='/explore'>Explore</Link></button>
            <button><Link to='/about'>About</Link></button>
        </div>
    )
}