import '../../assets/css/css-for-modal/CongratulationEvent.css'
import congratJoinImg from '../../assets/congratJoinImg.png'

const CongratulationJoinEvent = (props) => {

    const switchMode = () => {
        props.switchEventModalMode('ALL') 
        props.switchEnterMode(false) 
    }

    const test = () => {
        let date = props.currentEvent.data.dateStart.split('T')
        let time = date[1].split('.')
        let timeHourMinute = time[0].split(':')
        timeHourMinute[0] = '15'
        timeHourMinute[1] = '30' 
        let dateTime = date[0] + 'T' + timeHourMinute[0] + ':' + timeHourMinute[1] + ':' + timeHourMinute[2] + '.' + time[1]
        console.log(date, dateTime)
    }

    return(
        <div className="modal-congrat">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-congrat">
                <div className="modal-info">
                    <h2 id='congrat-title' className='title-modal'>Поздравляем!</h2>
                    <h4 id='congrat-subtitle' className='subtitle-modal'>Вы присоединились к событию: </h4>
                    <h4 className='event-title-congrat'>{props.currentEvent.data.title}</h4>
                    <div className="description-event">
                        <div className="when">
                            <div className="day-of-the-week"></div>
                            <div className="day-n-month"></div>
                            {
                                props.currentEvent.data.time ?
                                <div className="time-event">
                                    <span>{props.currentEvent.data.time}</span>
                                </div>
                                :
                                null
                            }
                        </div>
                        <div className="where">
                            <p>{props.currentEvent.data.location}</p>
                        </div>
                    </div>
                </div>
                <button id='congrat-btn' className='submit' onClick={test}>Отлично</button>
            </div>
            <img className='congrat-img' src={congratJoinImg} alt="" />
        </div>
    )
} 

export default CongratulationJoinEvent