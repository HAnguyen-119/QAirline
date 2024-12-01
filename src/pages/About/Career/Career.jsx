import './Career.css'
import Job from "../../../components/About/Job.jsx";
import JobFinder from "../../../components/About/JobFinder.jsx";
import BasicInfo from "../../../components/About/BasicInfo.jsx";
import BenefitsContainer from "../../../components/About/BenefitsContainer.jsx";

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
            <JobFinder/>
            <br/><br/>
            <div className="jobs">
                <Job position="Captain" experience="> 3 years" salary="$2000"/>
                <Job position="Flight operations" experience="> 3 year" salary="$2000"/>
                <Job position="In-flight service support" experience="1 year" salary="$500"/>
                <Job position="Business finance manager" experience="> 5 years" salary="$2000"/>
                <Job position="Senior data engineer" experience="> 3 years" salary="$2000"/>
                <Job position="Recruitment advisor" experience="2 years" salary="$2000"/>
                <Job position="Graphical designer intern" experience="< 1 year" salary="$200"/>
                <Job position="Security controller" experience="2 years" salary="$2000"/>
            </div>
        </div>
    )
}