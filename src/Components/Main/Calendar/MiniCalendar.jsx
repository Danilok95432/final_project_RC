import { useEffect, useState } from 'react'
import '../../../assets/css/Calendar.css'
import '../../../assets/css/MiniCalendar.css'
import Preloader from '../Common/Preloader'
import moment from 'moment/moment'

const MiniCalendar = (props) => {

    const currentDate = Date.now()
    const [data, setData] = useState([])
    const [acitveDate, setActiveDate] = useState(null)

    const NAME_OF_DAYS = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс',
    ]

    const MONTH = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ] 

    useEffect(() => {
        props.getMonthDataMini()
        setData(props.monthDataMini)
    }, [props.currentMonthMini])

    const isCurrentMonthDateAvaliable = (date) => {
        const dateCurrent = new Date()
        if(date.getMonth() == props.currentMonthMini && dateCurrent <= date)
            return true
        else return false
    }

    const prevMonth = () => {
        props.prevMini(props.currentMonthMini)
        props.getMonthDataMini()
    }

    const nextMonth = () => {
        props.nextMini(props.currentMonthMini)
        props.getMonthDataMini()
    }

    const handleSubmitDate = () => {
        const dateCurrent = new Date()
        if(acitveDate >= dateCurrent)
            if(props.startDate == '')
                props.changeForm('STARTDATE', acitveDate)
            else if(acitveDate > props.startDate) props.changeForm('ENDDATE', acitveDate)
    }

    return(
        <>
        <div className="select-month">
            <div className="vector-prev" onClick={prevMonth}></div>
            <p className='month'>{MONTH[props.currentMonthMini]}</p>
                {
                    props.calendarYearMini != props.currentYearMini ?
                    <p className="year">{props.currentYearMini}</p>
                    :
                    null
                }
            <div className="vector-next" onClick={nextMonth}></div>
        </div>
        <div className="mini-calendar">
            <div className="days-of-week-mini">
                {
                    NAME_OF_DAYS.map( (name, index) => {
                        return <div key={index} className="names">{name}</div>
                    })
                }
            </div>
            <div className="number-of-days-mini">
                {   data.length !=0 ?
                    data.map((week, index) => {
                        return <div key={index} className='week-mini'>
                            {
                                week.map( (day, index) => {
                                    return(
                                        <div key={index} className={isCurrentMonthDateAvaliable(day.date) ? (day.date == acitveDate ? 'day-mini active-date' : 'day-mini') : 'day-mini non-current'} onClick={() => setActiveDate(day.date)}>
                                            <span className='day-number day-number-mini'>{day.date.getDate()}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    })
                    :
                    <Preloader />
                }
            </div>
        </div>
        <button className='submit sumbit-date-btn' onClick={handleSubmitDate}>Применить</button>
        </>
    )
}

export default MiniCalendar