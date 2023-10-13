import '../../assets/css/css-for-modal/CongratulationEvent.css'
import congratImg from '../../assets/congrat-img.jpg'

const CongratulationEvent = (props) => {

    const switchMode = () => {
        props.switchEventModalMode('ALL')
        props.switchEnterMode(false) 
    }

    return(
        <div className="modal-congrat">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-congrat">
                <div className="modal-info">
                    <h2 id='congrat-title' className='title-modal'>Ура!</h2>
                    <h4 id='congrat-subtitle' className='subtitle-modal'>Вы добавили новое событие: </h4>
                    <div className="description-event">
                        
                    </div>
                </div>
                <button id='congrat-btn' className='submit'>Отлично</button>
            </div>
            <img className='congrat-img' src={congratImg} alt="" />
        </div>
    )
}

export default CongratulationEvent