import './Career.css'
import BasicInfo from "../../../components/About/BasicInfo.jsx";
import BenefitsContainer from "../../../components/About/BenefitsContainer.jsx";
import AvailableJobs from "../../../components/About/AvailableJobs.jsx";

export default function Career() {
    return (
        <div className="career">
            <h1>Become a part of QAirline today !</h1>
            <div style={{display: "flex", justifyContent: "center", gap: "1rem"}}>
                <BasicInfo></BasicInfo>
                <BasicInfo></BasicInfo>
                <BasicInfo></BasicInfo>
            </div>
            <br/><br/>
            <h2>Employee benefits</h2>
            <BenefitsContainer/>
            <br/><br/>
            <h2>Available jobs</h2>
            <AvailableJobs/>
        </div>
    )
}