export default function Job({position, location, experience, salary}) {
    return (
        <div className="job-container">
            <div className="job">
                <h2 className="position">{position}</h2>
                <p className="location">{location}</p>
                <p className="experience">{experience}</p>
                <p className="salary">{salary}</p>
            </div>
            <button>Details</button>
        </div>
    )
}
