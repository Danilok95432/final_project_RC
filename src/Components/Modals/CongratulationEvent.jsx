import '../../assets/css/css-for-modal/CongratulationEvent.css'
import congratImg from '../../assets/congrat-img.jpg'

const CongratulationEvent = (props) => {

    const switchMode = () => {
        props.switchEventModalMode('ALL') 
        props.switchEnterMode(false) 
    }

    const convertDay = (date) => {
        let dateOutput = ''
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

    console.log(props)

    return(
        <div className="modal-congrat">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-congrat">
                <div className="modal-info">
                    <h2 id='congrat-title' className='title-modal'>Ура!</h2>
                    <h4 id='congrat-subtitle' className='subtitle-modal'>Вы добавили новое событие: </h4>
                    <h4 className='event-title-congrat'>{props.createdEvent ? props.createdEvent.title : null}</h4>
                    <div className="description-event">
                        <div className="when">
                            <div className="day-of-week-event-desc">{convertDay(props.createdEvent.dateStart)}</div>
                            <div className="date-event-desc">{convertMonth(props.createdEvent.dateStart)}</div>
                            <div className="time-event-info-desc">{convertTime(props.createdEvent.dateStart)}</div>
                        </div>
                        <div className="where">
                            <p>{props.createdEvent.location}</p>
                        </div>
                    </div>
                </div>
                <button id='congrat-btn' className='submit' onClick={switchMode}>Отлично</button>
            </div>
            <img className='congrat-img' src={congratImg} alt="" />
        </div>
    )
}

export default CongratulationEvent