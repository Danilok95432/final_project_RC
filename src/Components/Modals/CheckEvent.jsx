import { useEffect, useState } from 'react'
import axios from 'axios'
import avatar from '../../assets/avatar.png'
import '../../assets/css/css-for-modal/CheckEvent.css'

const CheckEvent = (props) => {

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

    return(
        <div className="modal-create">
            <button className="close-btn" onClick={switchMode}></button>
                {
                    props.currentEvent.data ?
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
                            <h3 className='subtitle-modal'>Галерея</h3>
                            <div className="gallery">
                            {
                                /*
                                    props.currentEvent.data.photos ?
                                    props.currentEvent.data.photos.map(photo => {
                                        axios.get(`https://planner.rdclr.ru/api${photo.url}`)
                                             .then(response => {
                                                console.log(response)
                                             })
                                             .catch(error => {
                                                console.log(error.response)
                                             })
                                        return(
                                            <img src='#' alt='' width={photo.width} height={photo.height} />
                                        )
                                    })
                                    :
                                    null
                                */
                                }
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
        </div>
    )
}


export default CheckEvent