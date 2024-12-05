import './Dashboard.css'
import {useOutletContext} from "react-router-dom";

export default function Dashboard() {
    const isLightMode = useOutletContext();
    return (
        <div className='dashboard'>
            Welcome back admin !
        </div>
    )
}