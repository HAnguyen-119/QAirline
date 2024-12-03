import React from 'react';
import './FilterModal.css';

export default function FilterModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>Filter Options</h2>
                <p>Filter</p>
                <p>Filter</p>
                <p>Filter</p>
                <button className='submit' onClick={onClose}>Close</button>
            </div>
        </div>
    );
}