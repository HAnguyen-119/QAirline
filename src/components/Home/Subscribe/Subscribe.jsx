import {useState} from "react";
import {sendEmailWithText} from "../../../utils/SendEmail.js";

import ('./Subscribe.css')

export default function Subscribe({isLightMode}) {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        const subject = "SUBSCRIBE SUCCESSFULLY!!";
        const title = "Subscribe";
        const text = "You have successfully subscribed to QAirline, QAirline will bring our customers best experience!";
        const to_email = email;
        const name = "sir/madam";
        sendEmailWithText(to_email, name, subject, title, text);
        alert("Subscribed successfully, please check your email for more information!");
        document.querySelector("input").value = "";
    }

    return (
        <div className={`subscribeContainer${isLightMode ? "" : " dark"}`} >
            <h1 style={{color :"var(--light)"}}>Never miss an offer</h1>
            <div className={`form-wrapper subscribe${isLightMode ? "" : " dark"}`}>
                <h2>Subscribe now !</h2>
                <input className="josefin-sans" type="text" placeholder="Email address" onChange={(e) => setEmail(e.target.value)}/>
                <div style={{display: "flex"}}>
                    <input type="checkbox"/>
                    <p>I would like to get offers and news from QAirline</p>
                </div>
                <button className='button' onClick={handleSubscribe}>Subscribe</button>
            </div>
        </div>
    )
}