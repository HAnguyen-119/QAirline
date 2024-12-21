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
                              description="Founded by Nguyen Hoang Anh, Do Dinh Dung and Hoang Dang Khai in 2024, QAirline is now one of the most famous airlines in the world. Renowned for our dedication to safety, innovation, and world-class service, we connect millions of passengers to over 300 destinations globally. With a modern fleet of state-of-the-art aircraft and a commitment to sustainability, QAirline is redefining the travel experience by prioritizing comfort, convenience, and care. Our team of passionate professionals works tirelessly to ensure every journey is as seamless and enjoyable as the destination itself. At QAirline, we don’t just fly; we elevate your travel experience."
                              isLightMode={isLightMode}/>
                <AboutContent content='Partners'
                              background='https://cdn.prod.website-files.com/61353c043de1979119872ac8/635bb0ff6dc1851216160621_become-a-configurator-and-cpq-partner.jpg'
                              description="At QAirline, collaboration is at the heart of our global reach and exceptional service. We proudly partner with leading airlines, hospitality groups, and travel organizations worldwide to enhance your travel experience. Through strategic alliances, such as interline agreements and codeshare partnerships, we connect you seamlessly to over 300 destinations across continents. Our partners share our commitment to safety, reliability, and superior customer service, ensuring that wherever you go, the QAirline experience accompanies you. Together, we bring the world closer, making travel more convenient and rewarding for you."
                              isLightMode={isLightMode}/>
                <AboutContent content='Career'
                              background='https://bcp.cdnchinhphu.vn/334894974524682240/2024/6/22/anh-minh-hoa-3-1719021267699277678465.jpg'
                              description="Join the dynamic team at QAirline and take your career to new heights! We are passionate about fostering a workplace that inspires innovation, inclusivity, and professional growth. Whether you’re a skilled aviation professional, a customer service enthusiast, or an aspiring leader, we offer diverse opportunities to make your mark in the airline industry. From piloting cutting-edge aircraft to providing exceptional care for our passengers, every role at QAirline contributes to shaping the future of travel. Explore your potential with us and become a part of a company that values its employees as much as its customers."
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