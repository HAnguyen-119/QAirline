import { useLocation, useNavigate } from 'react-router-dom';
import './ShoppingCart.css';
import H1Text from "../../../../components/H1Text.jsx";
import DivContainer from "../../../../components/DivContainer.jsx";
import {useEffect, useState} from "react";
import userAPI from "../../../../api/userAPI.jsx";

export default function ShoppingCart() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    console.log(searchParams)
    // const {}
    const passengerNumber = searchParams.get('passenger');
    const outboundId = searchParams.get('outbound-id');
    const outboundSeatType = searchParams.get('outbound-seat')
    const returnId = searchParams.toString().includes('return-id') ? searchParams.get('return-id') : '';
    const returnSeatType = searchParams.toString().includes('return-seat') ? searchParams.get('return-seat') : '';

    const tripType = returnId !== '' ? 'round-trip' : 'one-way';

    const [outboundFlight, getOutboundFlight] = useState({});
    const [returnFlight, getReturnFlight] = useState({});

    useEffect(() => {
        try {
            const fetchFlights = async() => {
                const outboundFlight = await userAPI.findFlightById(outboundId);
                getOutboundFlight(outboundFlight);
                if (tripType === 'round-trip') {
                    const returnFlight = await userAPI.findFlightById(returnId);
                    getReturnFlight(returnFlight);
                }
            }
            fetchFlights()
        } catch (error) {
            console.error("Error finding flights:", error);
        }
    }, []);

    console.log(outboundFlight)
    console.log(returnFlight)

    const handleContinue = () => {
        navigate('/booking/traveler');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className='cart-container'>
            <H1Text content={'Flight Itineraries'}/>
            <DivContainer parentClass={'cart-content'}>
                <DivContainer className={'departure-flight'}>
                    <DivContainer parentClass={'flight-name'}>
                        {
                            `Selected Departure Flight`
                        }
                    </DivContainer>
                    <DivContainer parentClass={'flight-detail'}>

                    </DivContainer>
                </DivContainer>
                {tripType === 'round-trip' && (
                    <DivContainer parentClass={'return-flight'}>
                        <DivContainer parentClass={'flight-name'}>

                        </DivContainer>
                        <DivContainer parentClass={'flight-detail'}>

                        </DivContainer>
                    </DivContainer>
                )}
                <DivContainer parentClass={'submit-container'}>
                    <button className='submit' onClick={handleContinue}>Continue</button>
                    <button className='submit' onClick={handleLogin}>Login to Continue</button>
                </DivContainer>
            </DivContainer>
            <DivContainer parentClass={'cart-details'}></DivContainer>
        </div>
    );
}