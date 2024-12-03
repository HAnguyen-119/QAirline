import { useLocation, useNavigate } from 'react-router-dom';
import './ShoppingCart.css';

export default function ShoppingCart() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const tripType = searchParams.get('tripType');
    const departure = searchParams.get('departure');
    const destination = searchParams.get('destination');
    const deptDate = searchParams.get('dept-date');
    const returnDate = searchParams.get('return-date');

    const handleContinue = () => {
        navigate('/booking/traveler');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className='shopping-cart-container'>
            <div className='shopping-cart'>
                <h1>Shopping Cart</h1>
                <ul>
                    <li>Trip Type: {tripType}</li>
                    <li>Departure: {departure}</li>
                    <li>Destination: {destination}</li>
                    <li>Departure Date: {deptDate}</li>
                    <li>Return Date: {returnDate}</li>
                </ul>
                <div className='price'>Price: 100$</div>
                <button className='submit' onClick={handleContinue}>Continue</button>
                <button className='submit' onClick={handleLogin}>Login to Continue</button>
            </div>
        </div>
    );
}