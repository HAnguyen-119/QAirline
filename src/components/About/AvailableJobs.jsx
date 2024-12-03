import Job from "./Job.jsx";
import {JobData} from "../../utils/JobData.js";

export default function AvailableJobs() {

    const jobs = JobData.map(job =>
        <Job key={job.id}
             position={job.position}
             location={job.location}
             experience={job.experience}
             salary={job.salary}/>
    )

    return (
        <div className="available-jobs">
            <div className="job-finder">
                <div>
                    <input type="text" placeholder="Category"/>
                    <ul>
                        <li>Pilot</li>
                        <li>Cabin Crew</li>
                        <li>Engineering</li>
                        <li>Technology</li>
                        <li>Service</li>
                    </ul>
                </div>
                <div>
                    <input type="text" placeholder="Location"/>
                    <ul>
                        <li>Vietnam</li>
                        <li>USA</li>
                        <li>Japan</li>
                        <li>Australia</li>
                        <li>Singapore</li>
                    </ul>
                </div>
                <button>Search</button>
            </div>
            <br/><br/>
            <div className="jobs">
                {/*<Job position="Captain" experience="> 3 years" salary="$2000"/>*/}
                {/*<Job position="Flight operations" experience="> 3 year" salary="$2000"/>*/}
                {/*<Job position="In-flight service support" experience="1 year" salary="$500"/>*/}
                {/*<Job position="Business finance manager" experience="> 5 years" salary="$2000"/>*/}
                {/*<Job position="Senior data engineer" experience="> 3 years" salary="$2000"/>*/}
                {/*<Job position="Recruitment advisor" experience="2 years" salary="$2000"/>*/}
                {/*<Job position="Graphical designer intern" experience="< 1 year" salary="$200"/>*/}
                {/*<Job position="Security controller" experience="2 years" salary="$2000"/>*/}
                {jobs}
            </div>
        </div>
    )
}