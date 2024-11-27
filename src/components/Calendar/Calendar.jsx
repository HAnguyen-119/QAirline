import './Calendar.css';
import CalendarItems from "./CalendarItems.jsx";
import DaysContainer from "./DaysContainer.jsx";

export default function Calendar() {
    return (
        <div className="calendar">
            <div className="calendar-header">
                Nov 2024
            </div>
            <CalendarItems>
                <DaysContainer/>
            </CalendarItems>
        </div>
    )
}