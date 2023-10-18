import { useEffect, useState } from 'react'
import axios from 'axios'
import avatar from '../../assets/avatar.png'
import '../../assets/css/css-for-modal/CheckEvent.css'
import moment from 'moment/moment'

const CheckEvent = (props) => {

    const [step, setStep] = useState(0)
    const [currentItem, setCurrentItem] = useState(0)

    const switchMode = () => {
        props.switchEventModalMode('ALL')
        props.switchEnterMode(false) 
    }

    useEffect(() => {
        if(props.token){
            axios
            .get(`https://planner.rdclr.ru/api/events/${props.currentEvent}?populate=*&filters[dateStart][$gte]=2022-10-14T14:00:00.000Z&filters[dateStart][$lte]=2024-10-14T14:00:00.000Z`, 
                {
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                    }
                })
            .then(response => {
                console.log(response.data)
                props.setCurrentEvent(response.data)
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            });
        }
        else{
            axios
                .get(`https://planner.rdclr.ru/api/events/${props.currentEvent}?populate=*&filters[dateStart][$gte]=2022-10-14T14:00:00.000Z&filters[dateStart][$lte]=2024-10-14T14:00:00.000Z`)
                .then(response => {
                    console.log(response.data)
                    props.setCurrentEvent(response.data)
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error.response);
                    props.switchEnterMode(false) 
                    props.switchEventModalMode('ERROR')
                    props.switchEnterMode(true) 
                });
        }
    }, [])

    const nextSlide = () => {
        let item = step + 1
        let nextItemPhoto = currentItem + 1
        setCurrentItem(nextItemPhoto)
        setStep(item)
    }

    const prevSlide = () => {
        let item = step - 1
        let nextItemPhoto = currentItem - 1
        setCurrentItem(nextItemPhoto)
        setStep(item)
    }

    const createPagination = () => {
        const dots = []
        for (let i = 0; i < (props.currentEvent.data.photos.length); i++) {
            dots.push(
                step ==  i ?
                <span className="pagination-vector-active" key={`dot-${i}`} number={i}></span>
                :
                <span className="pagination-vector" key={`dot-${i}`} number={i}></span>
            );
        }
        return dots;
    }

    const handleAuth = () => {
        props.switchEnterMode(false)
        props.switchEventModalMode('ALL')
        props.switchEnterMode(true)
        props.switchModalMode('EMAIL')
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

    const handleParticipation = () => {
        if(props.currentEvent.data.participants.filter((participant) => participant.email == props.user).length == 0)
        {
            console.log(props.token)
            axios.post(`https://planner.rdclr.ru/api/events/${props.currentEvent.data.id}/join`, {},
                    {
                        headers: {
                            Authorization: `Bearer ${props.token}`,
                        }
                    })
                .then(response => {
                    props.updateParticipantMe(response.data)
                    props.switchEnterMode(false) 
                    props.switchEventModalMode('CONGRATULATION-JOIN')
                    props.switchEnterMode(true) 
                })
                .catch(error => {
                    props.switchEnterMode(false) 
                    props.switchEventModalMode('ERROR')
                    props.switchEnterMode(true) 
                })
        }
        else{
            props.switchEnterMode(false) 
            props.switchEventModalMode('ALERT-LEAVE')
            props.switchEnterMode(true) 
        }
    }

    return(
        <div className="modal-check">
            <button className="close-btn" onClick={switchMode}></button>
                {
                    props.currentEvent.data ?
                    <>
                    <div className="modal-content-create">
                        <h2 className='title-modal'>{props.currentEvent.data.title}</h2>
                        <div className="view-info-event">
                            <div className="info-where-event">
                                <div id='dateEvent'>
                                    <div className="day-of-week-event">{convertDay(props.currentEvent.data.dateStart)}</div>
                                    <div className="date-event">{convertMonth(props.currentEvent.data.dateStart)}</div>
                                    <div className="time-event-info">{convertTime(props.currentEvent.data.dateStart)}</div>
                                </div>
                                <span id='locationEvent'>{props.currentEvent.data.location}</span>
                            </div>
                            <div className="info-what-event">
                                <p id='descriptionEvent'>{props.currentEvent.data.description}</p>
                            </div>
                        </div>
                        <div className="participants-event">
                            <h3 className='subtitle-modal'>Участники</h3>
                            <div className="participants-list">
                                {
                                    props.currentEvent.data.participants ? 
                                    props.currentEvent.data.participants.map(participant => {
                                        return(
                                            <div key={participant.id} className="participant">
                                                <img src={avatar} alt="" width='40px' height='40px'/>
                                                <div className="participant-info">
                                                    <span>{participant.username}</span>  
                                                    {
                                                        props.currentEvent.data.owner && participant.id == props.currentEvent.data.owner.id ?
                                                        <span className='organizer-status-check'>Организатор</span> 
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className="photos-event">
                            <div className="header-gallery">
                                <h3 className='subtitle-modal'>Галерея</h3>
                                {
                                    props.currentEvent.data.photos ?
                                    <div className="btns-navigate">
                                        <button className={step == 0 ? 'btn-switch prev disable-btn' : 'btn-switch prev'} onClick={() => prevSlide()}></button>
                                        <button className={step == props.currentEvent.data.photos.length - 1 ? 'btn-switch next disable-btn' : 'btn-switch next'} onClick={() => nextSlide()}></button>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            {
                                props.currentEvent.data.photos ?
                                <>
                                <div className="gallery" style={{ transform: `translateX(-${props.currentEvent.data.photos[currentItem].formats.small ? currentItem * props.currentEvent.data.photos[currentItem].formats.small.width : currentItem * props.currentEvent.data.photos[currentItem].width}px)` }}>
                                    {
                                        props.currentEvent.data.photos.map(photo => {
                                            return(
                                                <img key={photo.id} src={photo.formats.small ? `https://planner.rdclr.ru${photo.formats.small.url}` : `https://planner.rdclr.ru${photo.url}`} alt='' width={photo.formats.small ? photo.formats.small.width : photo.width} height={photo.formats.small ? photo.formats.small.height : photo.height} />
                                            )
                                        })
                                    }
                                </div>
                                <div className="pagination">
                                    {
                                        createPagination()
                                    }
                                </div>
                                </>
                                :
                                <p className='no-photo-disclaimer'>У мероприятия нет фото</p>
                            }
                        </div>
                        {
                                props.token ? 
                                <button className='submit btn-join-event' onClick={handleParticipation}>{
                                    props.currentEvent.data.participants.filter((participant) => participant.email == props.user).length == 0 ?
                                    'Присоединиться к событию'
                                    :
                                    'Отменить участие в событии'
                                }</button>
                                :
                                <div className='enter-to-join-event'>
                                    <button className='btn-enter-to-join-event' onClick={handleAuth}>Войдите</button>
                                    <span className='enter-to-join-event-text'>, чтобы присоединиться к событию</span>
                                </div>
                            }
                    </div>          
                    </>
                    :
                    null
                }
        </div>
    )
}


export default CheckEvent