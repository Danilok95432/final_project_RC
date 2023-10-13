import '../../assets/css/css-for-modal/ErrorEvent.css'
import errorImg from '../../assets/error-img.jpg'

const ErrorEvent = (props) => {

    const switchMode = () => {
        props.switchEventModalMode('ALL')
        props.switchEnterMode(false) 
    }

    return(
        <div className="modal-error">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-error">
                <div className="modal-info">
                    <h2 id='error-title' className='title-modal'>Что-то пошло не так</h2>
                    <h4 id='error-subtitle' className='subtitle-modal'>Попробуйте позже</h4>
                </div>
                <button id='error-btn' className='submit' onClick={switchMode}>Хорошо</button>
            </div>
            <img className='error-img' src={errorImg} alt="" />
        </div>
    )
}

export default ErrorEvent