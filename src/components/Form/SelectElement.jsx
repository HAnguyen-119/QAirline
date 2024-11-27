import ('./Form.css')

export default function SelectElement({ htmlFor, description, id, value, onChange, options }) {
    return (
        <div className='form-wrapper'>
            <label htmlFor={htmlFor}>{description}</label>
            <select id={id} value={value} onChange={onChange}>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    )

}