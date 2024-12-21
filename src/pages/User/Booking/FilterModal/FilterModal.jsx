import { useState } from 'react';
import './FilterModal.css';

export default function FilterModal({ isOpen, onClose, onFilters }) {
    const [priceRange, setPriceRange] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [flightTime, setFlightTime] = useState('all');
    const handleFilters = () => {
        onFilters({ priceRange, sortOrder, flightTime });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>Filter Options</h2>
                <div className='filter-group'>
                    <label>Price Range:</label>
                    <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                        <option value='all'>All</option>
                        <option value='<1000'>$0 - $999</option>
                        <option value='<2000'>$1000 - $1999</option>
                        <option value='<3000'>$2000 - $2999</option>
                        <option value='>=3000'>From $3000</option>
                    </select>
                </div>
                <div className='filter-group'>
                    <label>Sort Order:</label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value='asc'>Ascending</option>
                        <option value='desc'>Descending</option>
                    </select>
                </div>
                <div className='filter-group'>
                    <label>Flight Time:</label>
                    <select value={flightTime} onChange={(e) => setFlightTime(e.target.value)}>
                        <option value='all'>All</option>
                        <option value='nighttime'>Nighttime (0 AM to 6 AM)</option>
                        <option value='morning'>Morning (6 AM to 12 PM)</option>
                        <option value='afternoon'>Afternoon (12 PM to 18PM)</option>
                        <option value='evening'>Evening (18 PM to 0 AM)</option>
                    </select>
                </div>
                <div className={`filter-button`}>
                    <button className='' onClick={handleFilters}>Apply</button>
                    <button className='' onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}