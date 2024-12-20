import DivContainer from "../../DivContainer.jsx";
import ConfirmationCard from "../../Card/ConfirmationCard.jsx";

import './BoardingPass.css';

export default function BoardingPass({ tripType, outboundFlight, returnFlight, passengerNumber, outboundSeatType, returnSeatType, handleOutbound, handleReturn, hasButton }) {
    return (
        <DivContainer parentClass={'boarding-pass'}>
            <DivContainer parentClass={'departure-flight'}>
                <DivContainer parentClass={'flight-name'}>
                    Departure Flight
                </DivContainer>
                <DivContainer parentClass={'departure-card'}>
                    <ConfirmationCard flight={outboundFlight} passengerNumber={passengerNumber} seatType={outboundSeatType} handle={handleOutbound} type={'DEP'} hasButton={hasButton}/>
                </DivContainer>
            </DivContainer>
            {tripType === 'round-trip' && (
                <DivContainer parentClass={'return-flight'}>
                    <DivContainer parentClass={'flight-name'}>
                        Return Flight
                    </DivContainer>
                    <DivContainer parentClass={'return-card'}>
                        <ConfirmationCard flight={returnFlight} passengerNumber={passengerNumber} seatType={returnSeatType} handle={handleReturn} type={'RET'} hasButton={hasButton}/>
                    </DivContainer>
                </DivContainer>
            )}
        </DivContainer>
    )
}