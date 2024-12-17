import './Dashboard.css'
import {useOutletContext} from "react-router-dom";
import DashboardItem from "../../../components/Dashboard/DashboardItem.jsx";

export default function Dashboard() {
    const isLightMode = useOutletContext();
    return (
        <div className='dashboard'>
            Welcome back admin !
            <div className="dashboard-container">
                <DashboardItem title="User">
                    <div>
                        user
                    </div>
                </DashboardItem>
                <DashboardItem title="Flights">
                    <div>
                        <div>Total flights :</div>
                        <div>Scheduled</div>
                        <div>In air</div>
                        <div>Arrived</div>
                        <div>Cancelled</div>
                    </div>
                </DashboardItem>
                <DashboardItem title="Planes">
                    <div>
                        <div>Total planes:</div>
                        <div>Active</div>
                        <div>Inactive</div>
                    </div>
                </DashboardItem>
                <DashboardItem title="Airports">
                    <div>
                        <div>Total planes:</div>
                        <div>Active</div>
                        <div>Inactive</div>
                    </div>
                </DashboardItem>
                <DashboardItem title="Bookings">
                    <div>
                        <div>Total planes:</div>
                        <div>Active</div>
                        <div>Inactive</div>
                    </div>
                </DashboardItem>
                <DashboardItem title="Posts">
                    <div>
                        <div>Total planes:</div>
                        <div>Active</div>
                        <div>Inactive</div>
                    </div>
                </DashboardItem>
            </div>
        </div>
    )
}