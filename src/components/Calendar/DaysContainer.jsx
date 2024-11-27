import Weekdays from "./Weekdays.jsx";
import Days from "./Days.jsx";

export default function DaysContainer() {
    return (
        <div className="days-container">
            <Weekdays/>
            <Days/>
        </div>
    )
}