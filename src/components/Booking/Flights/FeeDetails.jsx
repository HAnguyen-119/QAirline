import React from 'react';
import './FeeDetails.css';

export default function FeeDetails({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className='popup-overlay'>
            <div className='popup-content'>
                <h2>Fee and Tax Details</h2>
                <div className='fee-details'>
                    <p>Base Fee: Base on your flight!</p>
                    <p>VAT: 10% of your total fee! </p>
                    <p>Service Charge: 5% per passenger!</p>
                    <p>Security Fee: $5 per passenger!</p>
                    <p>Ticket Fee: $2 per passenger!</p>
                    <p>Baggage Fee: $10 for all!</p>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}