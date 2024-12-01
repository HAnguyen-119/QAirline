export default function JobFinder() {
    return (
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
                <input type="text" placeholder="Destination"/>
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
    )
}