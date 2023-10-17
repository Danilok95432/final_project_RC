import '../../assets/css/css-for-modal/AlertEvent.css'

const AlertEvent = (props) => {

    const switchMode = () => {
        props.switchEnterMode(false) 
        props.switchEventModalMode('CREATE')
        props.switchEnterMode(true) 
    }

    const exit = () => {
        props.clearParticipants()
        props.changeForm('ALL', '')
        props.switchEventModalMode('ALL')
        props.switchEnterMode(false) 
    }

    return(
        <div className="modal-alert">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-alert">
                <h2 className='title-modal'>Передумали создавать событие?</h2>
                <div className="btns-alert">
                    <button id='btn-alert' className='submit' onClick={switchMode}>Нет</button>
                    <button id='btn-alert' className='submit' onClick={exit}>Да</button>
                </div>
            </div>
        </div>
    )
}

export default AlertEvent