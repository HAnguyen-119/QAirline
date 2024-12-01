export default function Job({position, experience, salary}) {
    return (
        <div className="job-container">
            <div className="job">
                <h2 className="position">{position}</h2>
                <p className="experience">{experience}</p>
                <p className="salary">{salary}</p>
            </div>
            <button>Details</button>
        </div>
    )
}