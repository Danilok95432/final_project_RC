import { useEffect, useState } from 'react'
import '../../../assets/css/Calendar.css'
import Preloader from '../Common/Preloader'
import axios from 'axios'

const Calendar = (props) => {

    const [data, setData] = useState([])
    const [eventsData, setEventsData] = useState([])
    let eventsStore = []

    const NAME_OF_DAYS = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс',
    ]

    useEffect(() => {
        axios
            .get('https://planner.rdclr.ru/api/events?populate=*&filters[dateStart][$gte]=2022-10-14T14:00:00.000Z&filters[dateStart][$lte]=2024-10-14T14:00:00.000Z')
            .then((response) => {
                console.log(response)
                setEventsData(response.data)
            })
            .catch((error) => {
                console.log('An error occurred:', error.response);
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            })
            props.getMonthData()
        setData(props.monthData)
    }, [props.currentMonth])

    const isCurrentMonthDate = (date) => {
        if(date.getMonth() == props.currentMonth)
            return true
        else return false
    }

    const formatDate = (date) => {
        let eventDate = date.split('T')
        let eventDateArr = eventDate[0].split('-')
        let formattedDate = eventDateArr[2] + '/' + eventDateArr[1] + '/' + eventDateArr[0]
        return formattedDate
    }

    const hasEvents = (date) => {
        eventsStore = []
        let dateFormat = date.toLocaleDateString('en-GB')
        let flag = false
        if(eventsData.data)
            eventsData.data.map(event => {
                let eventFormatted = formatDate(event.dateStart)
                if(eventFormatted == dateFormat){
                    flag = true
                    eventsStore.push(event)
                }
            })
        return flag
    }



    const handlerClickEvents = (e) => {
        props.switchEnterMode(true)
        props.setCurrentEvent(e.target.id)
        props.switchEventModalMode('CHECK')
    }

    return(
        <div className="calendar">
            <div className="days-of-week">
                {
                    NAME_OF_DAYS.map( (name, index) => {
                        return <div key={index} className="names">{name}</div>
                    })
                }
            </div>
            <div className="number-of-days">
                {   data.length !=0 ?
                    data.map((week, index) => {
                        return <div key={index} className='week'>
                            {
                                week.map( (day, index) => {
                                    return(
                                        <div key={index} className={isCurrentMonthDate(day.date) ? 'day' : 'day non-current'}>
                                            <span className='day-number'>{day.date.getDate()}</span>
                                            {
                                                hasEvents(day.date) && eventsStore != [] ?
                                                
                                                    eventsStore.map(event => {
                                                        return <span key={event.id} id={event.id} className='event-calendar' onClick={handlerClickEvents}>{event.title}</span>
                                                    }) 
                                                   
                                                :
                                                null
                                            }
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
    )
}

export default Calendar