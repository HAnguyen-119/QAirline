import './subscribe.css';

// eslint-disable-next-line react/prop-types
export default function Subscribe({isLightMode}) {
    return (
        <div className={`subscribeContainer${isLightMode ? "" : " dark"}`} >
            <h1 style={{color :"var(--light)"}}>Never miss an offer</h1>
            <div className={`subscribe${isLightMode ? "" : " dark"}`}>
                <h2>Subscribe now !</h2>
                <input className="josefin-sans" type="text" placeholder="Email address"/>
                <div style={{display: "flex"}}>
                    <input type="checkbox"/>
                    <p>I would like to get offers and news from QAirline</p>
                </div>
                <button>Subscribe</button>
            </div>
        </div>
    )
}