import '../../assets/css/css-for-modal/CreateEvent.css'
import avatar from '../../assets/avatar.png'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const CreateEvent = (props) => {

    const [active, setActive] = useState(false)
    const [user, setUser] = useState(null)
    const [drag, setDrag] = useState(false)

    const inputNameRef = useRef('')
    const inputDescriptionRef = useRef('')
    const inputParticipantsRef = useRef('')
    const inputStartDateRef = useRef('')
    const inputEndDateRef = useRef('')
    const inputTimeRef = useRef('')
    const inputPlaceRef = useRef('')

    const refsArr = [inputNameRef, inputDescriptionRef, inputParticipantsRef, inputStartDateRef, inputEndDateRef, inputTimeRef, inputPlaceRef]
    const refsRequeried = [inputNameRef, inputDescriptionRef, inputStartDateRef, inputPlaceRef]

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
        if(flag){
            props.switchEventModalMode('ALL')
            props.switchEnterMode(false) 
        }
        else {
            props.switchEnterMode(false) 
            props.switchEventModalMode('ALERT')
            props.switchEnterMode(true) 
        }
    }

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };

    const handleCreateEvent = () => {

        let event = {
            title: inputNameRef.current.value,
            description: inputDescriptionRef.current.value,
            dateStart: inputStartDateRef.current.value,
            location: inputPlaceRef.current.value,
            participant: props.user,
        }
        
        axios
            .post('https://planner.rdclr.ru/api/events', JSON.stringify(event,getCircularReplacer()), { headers: {
                "Authorization": `Bearer ${props.token}`,
                "Content-Type": "application/json"
                }})
            .then(response => { 
                props.switchEnterMode(false) 
                props.switchEventModalMode('CONGRATULATION')
                props.switchEnterMode(true) 
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error);
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            });   
    }

    const dragStartHandler = (e) => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault()
        setDrag(false)
    }

    const dropHandler = (e) => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        console.log(files)
        setDrag(false)
    }

    useEffect(() => {
        axios
            .get('https://planner.rdclr.ru/api/users/me', {headers: {
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
                                <div className="drop-area" 
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}
                                    onDrop={e => dropHandler(e)}
                                >{drag ? 'Отпустите файлы, чтобы загрузить их' : 'Выберите фото или перетащите сюда'}</div>
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