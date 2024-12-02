import Date from "./Date.jsx";
import React from "react";
import ('./Days.css');


export default function Days({ days, activeDate, setActiveDate }) {
    return(
        <div className='calendar'>
            {days.map((day, index) => (
                <Date thingDay={day[0]} day={day[1]} month={day[2]} cost='100USD' isActive={index === activeDate} onClick={() => setActiveDate(index)} />
            ))}
        </div>
    )
}