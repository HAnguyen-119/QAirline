import './About.css'
import AboutContent from "../../../components/About/AboutContent.jsx";
import BasicInfo from "../../../components/About/BasicInfo.jsx";
import {faCalendarDays, faEarthAmerica, faPeopleGroup, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import {useOutletContext} from "react-router-dom";

export default function About() {
    const isLightMode = useOutletContext();
    return (
        <div className='about'>
            <h1>QAirline</h1>
            <div className="basic-info-container">
                <BasicInfo icon={faCalendarDays} number="2024" info="Founded" isLightMode={isLightMode} />
                <BasicInfo icon={faPlaneDeparture} number="#10" info="Best airline in Vietnam" isLightMode={isLightMode} />
                <BasicInfo icon={faEarthAmerica} number="50" info="Branches global" isLightMode={isLightMode} />
                <BasicInfo icon={faPeopleGroup} number="10000+" info="Employees" isLightMode={isLightMode} />
            </div>
            <div className='about-content-container'>
                <AboutContent content='Company'
                              background='https://images.indianexpress.com/2024/08/Worlds-10-Best-Airlines-in-2024-The-dominance-of-Asian-and-Middle-Eastern-carriers-is-evident-with-seven-of-the-top-10-spots-going-to-airlines-from-these-regions.-Source-Qatar-Airways-Official-.jpg'
                              description="fwfewfewfew"
                              isLightMode={isLightMode}/>
                <AboutContent content='Partners'
                              background='https://image.cnbcfm.com/api/v1/image/106174405-1570711107124gettyimages-1083841638.jpeg?v=1570711118&w=1600&h=900'
                              description="partners"
                              isLightMode={isLightMode}/>
                <AboutContent content='Career'
                              background='https://bcp.cdnchinhphu.vn/334894974524682240/2024/6/22/anh-minh-hoa-3-1719021267699277678465.jpg'
                              description="careers"
                              isLightMode={isLightMode}/>
            </div>
            <div>
                <h2>Need to find out more?</h2>
                We want to hear from you. <br/>
                Get in touch if you’re looking for more information or have questions about any of our services. <br/>
                If you’re a journalist and have a press enquiry, please contact our Press Office. <br/>
                If you have a query about a booking or anything else please contact us.
            </div>
        </div>
    )
}