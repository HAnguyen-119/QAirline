import DivContainer from "../../DivContainer.jsx";
import InputElement from "../../Form/InputElement.jsx";
import Icon from "../../Icon/icon.jsx";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faChild } from "@fortawesome/free-solid-svg-icons/faChild";
import { faBabyCarriage } from "@fortawesome/free-solid-svg-icons/faBabyCarriage";
import Button from "../../Button/Button.jsx";

import './Passenger.css';
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {faMinus} from "@fortawesome/free-solid-svg-icons/faMinus";

export default function Passenger({ passengers, setPassengers }) {
    const MAX_VALUES = { adults: 5, children: 3, infants: 1 };
    const MIN_VALUES = { adults: 1, children: 0, infants: 0 };

    const updatePassengers = (type, value) => {
        setPassengers((prev) => ({
            ...prev,
            [type]: value
        }))
    }

    const handleAdd = (type) => {
        if (passengers[type] < MAX_VALUES[type]) {
            updatePassengers(type, passengers[type] + 1);
        }
    }

    const handleRemove = (type) => {
        if (passengers[type] > MIN_VALUES[type]) {
            updatePassengers(type, passengers[type] - 1);
        }
    }

    return (
        <DivContainer parentClass='passenger-container'>
            <DivContainer parentClass='passenger adult'>
                <Button type='button' buttonClass='passenger-button' icon={faMinus } onClick={() => handleRemove('adults')} />
                <DivContainer parentClass='info adults'>
                    <DivContainer parentClass='number adults'>
                        <span>{passengers.adults}&times;</span>
                        <Icon name='passenger' iconName={faUser} />
                    </DivContainer>
                    <span>From 12 yrs</span>
                </DivContainer>
                <Button type='button' buttonClass='passenger-button' icon={faPlus} onClick={() => handleAdd('adults')} />
            </DivContainer>
            <DivContainer parentClass='passenger child'>
                <Button type='button' buttonClass='passenger-button' icon={faMinus } onClick={() => handleRemove('children')} />
                <DivContainer parentClass='info children'>
                    <DivContainer parentClass='number children'>
                        <span>{passengers.children}&times;</span>
                        <Icon name='passenger' iconName={faChild} />
                    </DivContainer>
                    <span>2-11 yrs</span>
                </DivContainer>
                <Button type='button' buttonClass='passenger-button' icon={faPlus} onClick={() => handleAdd('children')} />
            </DivContainer>
            <DivContainer parentClass='passenger infant'>
                <Button type='button' buttonClass='passenger-button' icon={faMinus } onClick={() => handleRemove('infants')} />
                <DivContainer parentClass='info infants'>
                    <DivContainer parentClass='number infants'>
                        <span>{passengers.infants}&times;</span>
                        <Icon name='passenger' iconName={faBabyCarriage} />
                    </DivContainer>
                    <span>Under 2 yrs</span>
                </DivContainer>
                <Button type='button' buttonClass='passenger-button' icon={faPlus } onClick={() => handleAdd('infants')} />
            </DivContainer>
        </DivContainer>
    );
}