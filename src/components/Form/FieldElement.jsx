import ('./Form.css')

export default function FieldElement({ htmlFor, description, id, value, onChange }) {
    return (
        <div className='form-wrapper'>
            <label htmlFor={htmlFor}>{description}</label>
            <textarea id={id} value={value} onChange={onChange}/>
        </div>
    )
}