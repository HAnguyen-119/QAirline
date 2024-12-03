import {useState} from "react";
import Benefit from "./Benefit.jsx";

export default function BenefitsContainer() {
    const [benefit, setBenefit] = useState("Income");

    const chooseBenefit = () => {
        switch (benefit) {
            case "Income":
                return <Benefit content="Income"/>
            case "Medical":
                return <Benefit content="Medical"/>
            case "Travel":
                return <Benefit content="Travel discounts"/>
            case "Career":
                return <Benefit content="Career"/>
            case "Social":
                return <Benefit content="Social"/>
        }
    }

    return (
        <div className="benefits-container">
            <div className="benefits">
                <div onClick={() => {setBenefit("Income")}}>Income</div>
                <div onClick={() => {setBenefit("Medical")}}>Medical insurance</div>
                <div onClick={() => {setBenefit("Travel")}}>Travel discounts</div>
                <div onClick={() => {setBenefit("Career")}}>Bright career path</div>
                <div onClick={() => {setBenefit("Social")}}>Social activities</div>
            </div>
            <div>
                {chooseBenefit()}
            </div>
        </div>
    )
}