import {useState} from "react";
import DivContainer from "../../DivContainer.jsx";
import HorizontalRule from "../../HorizontalRule.jsx";
import ('./Date.css')

export default function Date({ thingDay, day, month, isActive, onClick}) {
    return (
        <div className={`date ${isActive ? 'active' : ''} `} onClick={onClick}>
            <DivContainer parentClass={'month'}>
                <li>{month}</li>
            </DivContainer>
            <HorizontalRule/>
            <DivContainer parentClass={'day'}>
                <li>{day}</li>
            </DivContainer>
            <DivContainer parentClass={'thing-day'}>
                <li>{thingDay}</li>
            </DivContainer>
            <HorizontalRule/>
        </div>
    );

}