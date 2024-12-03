import Logo from "../../../components/Logo.jsx";
import BasicInfo from "../../../components/About/BasicInfo.jsx";

import "./Company.css"

export default function Company() {
    return (
        <div className="company">
            <Logo/>
            <h1>QAirline</h1>
            <div className="basic-info-container">
                <BasicInfo icon="../../src/assets/images/calendar.png" number="2024" info="Founded" />
                <BasicInfo icon="../../src/assets/images/airline.png" number="#10" info="Best airline in Vietnam" />
                <BasicInfo icon="../../src/assets/images/international.png" number="50" info="Branches global" />
                <BasicInfo icon="../../src/assets/images/employees.png" number="10000+" info="Employees" />
            </div>
            <div>
                QAirline is a blah blah company
            </div>
        </div>
    )
}