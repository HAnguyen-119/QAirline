import './Form.css';
import airports from '../../assets/data/airports.json';

export default function SelectElement({ htmlFor, description, id, value, onChange }) {
    return (
        <div className='form-wrapper'>
            <label htmlFor={htmlFor}>{description}</label>
            <select id={id} value={value} onChange={onChange}>
                {airports.map(region => (
                    <optgroup key={region.region} label={region.region}>
                        {region.airports.map(airport => (
                            <option key={airport.code} value={`${airport.name} (${airport.code})`}>
                                {airport.name}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>
    );
}

