import SelectElement from "../../components/Form/SelectElement.jsx"
import InputElement from "../../components/Form/InputElement.jsx";
import LabelElement from "../../components/Form/LabelElement.jsx";
import FieldElement from "../../components/Form/FieldElement.jsx";
import {AddPassenger} from "../../utils/AddPassenger.js";
import Ticket from "../../components/Booking/Ticket.jsx";

import ('./Booking.css')

export default function Booking() {
    //useState things
    return (
        <div className='booking-container'>
            <div className='booking'>
                <div className='booking-details'>
                    <div className='form customer-data'>
                        <h1>CUSTOMER DATA</h1>
                        <form>
                            <InputElement htmlFor='first-name' description='First Name' type='text' id='first-name' value='' onChange={() => {}}/>
                            <InputElement htmlFor='last-name' description='Last Name' type='text' id='last-name' value='' onChange={() => {}}/>
                            <InputElement htmlFor='Address' description='Address' type='text' id='address' value='' onChange={() => {}}/>
                            <InputElement htmlFor='city' description='City' type='text' id='city' value='' onChange={() => {}}/>
                            <InputElement htmlFor='postal-code' description='Postal Code' type='text' id='postal-code' value='' onChange={() => {}}/>
                            <InputElement htmlFor='country' description='Country' type='text' id='country' value='' onChange={() => {}}/>
                        </form>
                    </div>
                    <div className='form itinerary'>
                        <h1>ITINERARY</h1>
                        <form>
                            <InputElement htmlFor='one-way' description='One-way Trip' type='radio' id='one-way' value='one-way' onChange={() => {}}/>
                            <InputElement htmlFor='round-trip' description='Round Trip' type='radio' id='round-trip' value='round-trip' onChange={() => {}}/>
                            <SelectElement htmlFor='departure' description='Departure Airport' id='departure' value='departure' onChange={() => {}} options={['Airport 1', 'Airport 2', 'Airport 3', 'Airport 4', 'etc']}/>
                            <SelectElement htmlFor='destination' description='Destination Airport' id='destination' value='destination' onChange={() => {}} options={['Airport A', 'Airport B', 'Airport C', 'Airport D', 'etc']}/>
                            <SelectElement htmlFor='ticket-class' description='Ticket Class' id='ticket-class' value='ticket-class' onChange={() => {}} options={['Economy', 'Business', 'First Class']}/>
                            <SelectElement htmlFor='prefer-seating' description='Prefer Seating' id='prefer-seating' value='prefer-seating' onChange={() => {}} options={['A1', 'A2', 'A3', 'etc']}/>
                            <InputElement htmlFor='dept-date' description='Start Date' id='dept-date' type='date' value='dept-date' onChange={() => {}}/>
                            <InputElement htmlFor='dept-time' description='Start Time' id='dept-time' type='time' value='dept-time' onChange={() => {}}/>
                            <InputElement htmlFor='return-date' description='Return Date' id='return-date' type='date' value='return-date' onChange={() => {}}/>
                            <LabelElement description='Return Time' text="01/01/2020"/>
                            <FieldElement htmlFor='comment' description='Comment Field' id='comment' value='' onChange={() => {}}/>
                        </form>
                    </div>
                    <div className='form passengers'>
                        <h1>PASSENGERS</h1>
                        <button onClick={() => AddPassenger(5)}>Add passengers</button>
                        <table className='table passengers'>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Passport Data</th>
                                    <th>Expiration Date of Exit Visa</th>
                                    <th>Date of Birth</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
                <button type='submit'>Submit</button>
            </div>
            <div className='form my-booking'>
                <h1>My Bookings</h1>
                <div className='ticket-list'>
                    <Ticket/>
                    <Ticket/>
                </div>

            </div>
        </div>
    )
}