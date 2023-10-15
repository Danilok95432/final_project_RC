import { useEffect, useState } from 'react'
import axios from 'axios'
import avatar from '../../assets/avatar.png'
import '../../assets/css/css-for-modal/CheckEvent.css'

const CheckEvent = (props) => {

    const [step, setStep] = useState(0)

    const switchMode = () => {
        props.switchEventModalMode('ALL')
        props.switchEnterMode(false) 
    }

    useEffect(() => {
        if(props.token){
            axios
            .get(`https://planner.rdclr.ru/api/events/${props.currentEvent}?populate=*&filters[dateStart][$gte]=2022-10-14T14:00:00.000Z&filters[dateStart][$lte]=2024-10-14T14:00:00.000Z`, {headers: {
                Authorization: `Bearer ${props.token}`,
                }})
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

    const nextSlide = (diff) => {
        let item = step + diff
        setStep(item)
    }

    const prevSlide = (diff) => {
        let item = step - diff
        setStep(item)
    }

    const createPagination = () => {
        const dots = []
        console.log(step, (props.currentEvent.data.photos.length / 4))
        for (let i = 0; i < (props.currentEvent.data.photos.length - 1) / 2; i++) {
            dots.push(
                step == (props.currentEvent.data.photos.length / 4) * i ?
                <span className="pagination-vector-active" key={`dot-${i}`} number={i}></span>
                :
                <span className="pagination-vector" key={`dot-${i}`} number={i}></span>
            );
        }
        return dots;
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
                                <span id='dateEvent'>{props.currentEvent.data.dateStart}</span>
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
                                            <div className="participant">
                                                <img src={avatar} alt="" width='40px' height='40px'/>
                                                <span>{participant.username}</span>
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
                                        <button className={step == 0 ? 'btn-switch prev disable-btn' : 'btn-switch prev'} onClick={() => prevSlide((props.currentEvent.data.photos.length / 4))}></button>
                                        <button className={step == (props.currentEvent.data.photos.length - (props.currentEvent.data.photos.length / 4) ) ? 'btn-switch next disable-btn' : 'btn-switch next'} onClick={() => nextSlide((props.currentEvent.data.photos.length / 4))}></button>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            {
                                props.currentEvent.data.photos ?
                                <>
                                <div className="gallery" style={{ transform: `translateX(-${step * props.currentEvent.data.photos[0].width}px)` }}>
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
                                null
                            }
                        </div>
                    </div>
                    
                    </>
                    :
                    null
                }
        </div>
    )
}


export default CheckEvent