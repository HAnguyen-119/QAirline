import React, { useState } from "react";
import Date from "./Date.jsx";
import './Days.css';
import Icon from "../../Icon/icon.jsx";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import { numberToMonth } from "../../../utils/Month.js";

export default function Days({ days, activeDate, setActiveDate }) {

    const [startIndex, setStartIndex] = useState(0);
    const daysToShow = 7;

    const handleNext = () => {
        if (startIndex + daysToShow < days.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const displayedDays = days.slice(startIndex, startIndex + daysToShow);

    return (
        <div className='calendar'>
            <button onClick={handlePrev} disabled={startIndex === 0}><Icon iconName={faCaretLeft} /></button>
            {displayedDays.map((day, index) => (
                <Date
                    key={index}
                    thingDay={day[0]}
                    day={day[1]}
                    month={numberToMonth(day[2])}
                    cost='100USD'
                    isActive={index + startIndex === activeDate}
                    onClick={() => setActiveDate(index + startIndex)}
                />
            ))}
            <button onClick={handleNext} disabled={startIndex + daysToShow >= days.length}><Icon iconName={faCaretRight} /></button>
        </div>
    );
}