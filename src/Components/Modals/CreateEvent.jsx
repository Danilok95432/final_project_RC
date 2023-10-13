import '../../assets/css/css-for-modal/CreateEvent.css'
import avatar from '../../assets/avatar.png'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const CreateEvent = (props) => {

    const [active, setActive] = useState(false)
    const [user, setUser] = useState(null)

    const inputNameRef = useRef('')
    const inputDescriptionRef = useRef('')
    const inputParticipantsRef = useRef('')
    const inputStartDateRef = useRef('')
    const inputEndDateRef = useRef('')
    const inputTimeRef = useRef('')
    const inputPlaceRef = useRef('')

    const refsArr = [inputNameRef, inputDescriptionRef, inputParticipantsRef, inputStartDateRef, inputEndDateRef, inputTimeRef, inputPlaceRef]
    const refsRequeried = [inputNameRef, inputDescriptionRef, inputStartDateRef, inputTimeRef, inputPlaceRef]

    const checkNonEmptyFields = (refs) => {
        let flag = true
        refs.forEach(ref => {
            if(ref.current.value == ''){
                flag = false
            }
        })
        return flag
    }

    const handleChange = () => {
        if(checkNonEmptyFields(refsRequeried))
            setActive(true)
        else setActive(false)
    }

    const switchMode = () => {
        let flag = checkNonEmptyFields(refsArr)
        if(!flag){
            props.switchEventModalMode('ALL')
            props.switchEnterMode(false) 
        }
        else {
            props.switchEnterMode(false) 
            props.switchEventModalMode('ALERT')
            props.switchEnterMode(true) 
        }
    }

    const handleCreateEvent = () => {
        let event = {
            title: inputNameRef,
            description: inputDescriptionRef,
            dateStart: inputStartDateRef,
            location: inputPlaceRef,
            participants: [1],
        }
        
        axios
            .post('http://localhost:1337/api/events', event, {headers: {
                Authorization: `Bearer ${props.token}`,
                }})
            .then(response => {  
                // Handle success.
                console.log('Well done!');
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            });     
    }

    useEffect(() => {
        axios
            .get('http://localhost:1337/api/users/me', {headers: {
                Authorization: `Bearer ${props.token}`,
                }})
            .then(response => {  
                // Handle success.
                console.log('Well done!');
                console.log(response.data)
                setUser(response.data)
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            }); 
    }, [])


    return(
        <div className="modal-create">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-create">
                <h2 className='title-modal'>Создание события</h2>
                
                <div className="info-event">
                    <div className="what-event">
                        <input id='name' ref={inputNameRef} className='modal-input event-input' onChange={handleChange} type='text' placeholder='Название*'/>
                        <input id='description' ref={inputDescriptionRef} className='modal-input event-input' onChange={handleChange} type='text' placeholder='Описание*'/>
                        <input id='participants' ref={inputParticipantsRef} className='modal-input event-input' onChange={handleChange} type='select' placeholder='Участники'/>
                        <div className="drop-img-area">
                            <input type="file" />
                        </div>
                    </div>
                    <div className="where-event">
                        <div className="info-date">
                            <input id='start-date' ref={inputStartDateRef} className='modal-input event-input' onChange={handleChange} type='date' placeholder='Начало*'/>
                            <input id='end-date' ref={inputEndDateRef} className='modal-input event-input' onChange={handleChange} type='date' placeholder='Конец'/>
                        </div>
                        <input id='time' ref={inputTimeRef} className='modal-input event-input' onChange={handleChange} type='time' placeholder='Время*'/>
                        <input id='place-event' ref={inputPlaceRef} className='modal-input event-input' onChange={handleChange} type='text' placeholder='Место проведения*'/>
                        <div className="event-organizer-info">
                            <img className='avatar-event' src={avatar} alt="" />
                            <div className="organizer">
                                <span className='organizer-name'>{user ? user.username : null}</span>
                                <span className='organizer-status'>Организатор</span>
                            </div>
                        </div>
                    </div>
                </div>        
                <button id='create-btn' className={active ? 'submit' : 'submit disable'} onClick={handleCreateEvent}>
                    Создать
                </button>
            </div>
        </div>
    )
}

export default CreateEvent