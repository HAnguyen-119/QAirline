import InputElement from "../Form/InputElement.jsx";
import Button from "../Button/Button.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Search() {
    const navigate = useNavigate();

    const [bookingId, setBookingId] = useState('');
    const handleSearchBookingSubmit = (event) => {
        event.preventDefault();
        navigate(`/booking/details?bookingId=${bookingId}`);
    }
    return (
        <div className='search'>
            <h1>SEARCH BOOKING</h1>
            <form className='search-form' onSubmit={handleSearchBookingSubmit}>
                <div className='info'>
                    <InputElement htmlFor='booking-id' description='Booking ID' id='booking-id' name='booking-id' type='text' required={true} onChange={(e) => setBookingId(e.target.value)}/>
                    <InputElement htmlFor='last-name' description='Last Name' id='last-name' name='last-name' type='text' required={true}/>
                </div>
                <Button className='submit' type='submit' text='Search'/>
            </form>
        </div>
    )
}