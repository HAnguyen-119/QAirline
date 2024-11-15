export default function FlightSearcher() {
    return (
        <div className="flightSearcherContainer" style={
            {backgroundImage:"url('https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2024/05/ascend-airways-fleet-boeing-737-800-ly-tfs-exterior-1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center center"
            }}>
            <div className="flightSearcher">
                <div style={{display: "flex", alignItems: "center"}}><input type="radio" style={{width: "15px", height: "15px"}}/> One way <input type="radio" style={{width: "15px", height: "15px"}}/> Round trip</div>
                <div style={{display: "flex"}}><span>Number of guest</span> <input type="text"/></div>
                <input className="josefin-sans" type="text" placeholder="From..."/>
                <input className="josefin-sans" type="text" placeholder="To..."/>
                <button className="josefin-sans">Search Flight</button>
            </div>
        </div>
    )
}