import LabelElement from "../../Form/LabelElement.jsx";
import HorizontalRule from "../../HorizontalRule.jsx";
import Logo from "../../Logo.jsx";
import ('./Ticket.css')

export default function Ticket() {
    return (
        <div className='ticket-container'>
            <Logo/>
            <div className='ticket-inner'>
                <div className='passenger-data'>
                    <div className='seat-info'>
                        <LabelElement description='CLASS' text='ECONOMY'/>
                        <LabelElement description='SEAT NO.' text='A-1'/>
                        <LabelElement description='TICKET NO.' text='123456789'/>
                    </div>
                    <div className='passenger-info'>
                        <LabelElement description='PASSENGER NAME' text='Nguyen Van A'/>
                    </div>
                    <div className='ticket-qr'>
                        <h4>For more information</h4>
                        <div>
                            QR CODE
                        </div>
                    </div>
                </div>

                <div className='boarding-data'>
                    <div className=''>
                        <div className='boarding-data'>
                            <h1>BOARDING PASS</h1>
                            <div className='form-wrapper boarding'>
                                <div className='dept-'>
                                    <LabelElement description='Departure' text='Gate 01'/>
                                    <h2>HANOI</h2>
                                    <LabelElement description='Departure Date' text='01/01/2020'/>
                                    <LabelElement description='Arrival Date' text='01/01/2020'/>

                                </div>
                                <div className='arrv-'>
                                    <LabelElement description='Arrival' text='Gate 02'/>
                                    <h2>HO CHI MINH CITY</h2>
                                    <LabelElement description='Departure Time' text='00:00'/>
                                    <LabelElement description='Arrival Time' text='00:00'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}