import '../../assets/css/css-for-modal/CongratulationEvent.css'
import congratJoinImg from '../../assets/congratJoinImg.png'

const CongratulationJoinEvent = (props) => {

    const switchMode = () => {
        props.switchEventModalMode('ALL') 
        props.switchEnterMode(false) 
    }

    const convertDay = (date) => {
        let dateOutput
        const days = [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ];
        let dateNew = new Date(date)
        let day = dateNew.getDay()
        return dateOutput = days[day]
    }

    const convertMonth = (date) => {
        let dateOutput = ''

        const MONTH = [
            'Января',
            'Февраля',
            'Марта',
            'Апреля',
            'Мая',
            'Июня',
            'Июля',
            'Августа',
            'Сентября',
            'Октября',
            'Ноября',
            'Декабря',
        ] 
        let dateNew = new Date(date)
        let dayNumber = dateNew.getDate()
        let month = dateNew.getMonth()
        return dateOutput = dayNumber + " " + MONTH[month]
    }

    const convertTime = (date) => {
        let dateOutput = ''
        let time = date.split("T")
        let timeDepth = time[1].split(":")
        let hourNMinute = timeDepth[0] + ":" + timeDepth[1]
        return dateOutput = hourNMinute
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
                            <div className="day-of-week-event-desc">{convertDay(props.currentEvent.data.dateStart)}</div>
                            <div className="date-event-desc">{convertMonth(props.currentEvent.data.dateStart)}</div>
                            <div className="time-event-info-desc">{convertTime(props.currentEvent.data.dateStart)}</div>
                        </div>
                        <div className="where">
                            <p>{props.currentEvent.data.location}</p>
                        </div>
                    </div>
                </div>
                <button id='congrat-btn' className='submit' onClick={switchMode}>Отлично</button>
            </div>
            <img className='congrat-img' src={congratJoinImg} alt="" />
        </div>
    )
} 

export default CongratulationJoinEvent