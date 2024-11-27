import ('./Form.css')

export default function LabelElement({ description, text }) {
    return (
        <div className='form-wrapper label'>
            <label>{description}</label>
            <label>{text}</label>
        </div>
    )

}