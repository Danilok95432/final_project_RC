import '../../assets/css/css-for-modal/CreateEvent.css'
import avatar from '../../assets/avatar.png'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const CreateEvent = (props) => {
    const [active, setActive] = useState(false)
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [filtredUsers, setFiltredUsers] = useState([])
    const [drag, setDrag] = useState(false)
    const [select, setSelect] = useState(false)
    const [files, setFiles] = useState([])

    const inputNameRef = useRef('')
    const inputDescriptionRef = useRef('')
    const inputParticipantsRef = useRef('')
    const inputStartDateRef = useRef('')
    const inputEndDateRef = useRef('')
    const inputTimeRef = useRef('')
    const inputPlaceRef = useRef('')
    const inputFileRef = useRef(null);

    const refsArr = [inputNameRef, inputDescriptionRef, inputParticipantsRef, inputStartDateRef, inputEndDateRef, inputTimeRef, inputPlaceRef]
    const refsRequeried = [inputNameRef, inputDescriptionRef, inputStartDateRef, inputTimeRef, inputPlaceRef]

    const checkNonEmptyFields = (refs) => {
        let flag = true
        refs.forEach(ref => {
            if(ref.current.value != '' && flag){
                flag = false
            }
        })
        return flag
    }

    const checkNonEmptyReqFields = (refs) => {
        let flag = true
        refs.forEach(ref => {
            if(ref.current.value == '' && flag)
            {
                flag = false
            }
        })
        return flag
    }

    const handleChange = (field, data) => {
        props.changeForm(field, data)
        if(checkNonEmptyReqFields(refsRequeried))
            setActive(true)
        else setActive(false)
    }

    const switchMode = () => {
        let flag = checkNonEmptyFields(refsArr)
        if(flag){
            props.clearParticipants()
            props.changeForm('ALL', '')
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
        let participantsList = props.participants
        let orgExist = props.participants.filter((element) => element == user)
        if(orgExist.length == 0){
            participantsList.push(user)
        }
        let participantsId = []
        participantsList.map(item => {
            participantsId.push(item.id)
        })
        participantsId.reverse()

        let splitStartDateEvent = inputStartDateRef.current.value.split('-')
        let splitEndDateEvent = inputEndDateRef.current.value.split('-')
        let splitTimeEvent = inputTimeRef.current.value.split(':')
        let dateStartEvent = new Date(splitStartDateEvent[0], splitStartDateEvent[1] - 1, splitStartDateEvent[2], splitTimeEvent[0], splitTimeEvent[1], 0, 0)
        let dateEndEvent = new Date(splitEndDateEvent[0], splitEndDateEvent[1], splitEndDateEvent[2], 0, 0, 0, 0)

        let event = {
            title: inputNameRef.current.value,
            description: inputDescriptionRef.current.value,
            dateStart: dateStartEvent,
            dateEnd: inputEndDateRef.current.value == '' ? null : dateEndEvent,
            location: inputPlaceRef.current.value,
            participants: participantsId,
        }

        console.log(event)
        
        axios
            .post('https://planner.rdclr.ru/api/events', JSON.stringify(event,getCircularReplacer()), { headers: {
                "Authorization": `Bearer ${props.token}`,
                "Content-Type": "application/json"
                }})
            .then(response => { 
                console.log(response.data)
                props.createdEvent(response.data)
                props.switchEnterMode(false) 
                props.switchEventModalMode('CONGRATULATION')
                props.switchEnterMode(true) 
            })
            .catch(error => {
                console.log(error.response)
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            });   
    }

    const handleParticipantSelect = () => {
        props.activeSelect(!select)
        setSelect(!select)
    }

    const filterUsers = (userData) => {
        if(userData){
            let filtred = userData.filter((user) => ~user.username.toLowerCase().indexOf(inputParticipantsRef.current.value.toLowerCase()))
            if(inputParticipantsRef.current.value != '')
            {
                setFiltredUsers(filtred)
            }
            else setFiltredUsers(userData)
        }
    }

    const handleSelectUser = (selectedUser) => {
        props.changeForm('PARTICIPANTS-ARR', selectedUser)
        let newUsersList = filtredUsers.filter((user) => user != selectedUser)
        setFiltredUsers(newUsersList)
        props.activeSelect(false); 
        setSelect(false)
    }

    const deleteSelectedUser = (item) => {
        props.deleteParticipant(item)
        let newListUsers = [...filtredUsers, item]
        setFiltredUsers(newListUsers)
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
        let file = files
        file.push(...e.dataTransfer.files)
        console.log(file, files)
        setDrag(false)
        setFiles(file)
    }

    const handleFileChange = (e) => {
        if (!e.target.files) {
            return;
        }
        let file = files
        file.push(e.target.files[0])
        console.log(file, files)
        props.changeForm('PHOTOS', file)
        setFiles(file);
    }

    console.log(props)

    const handleInputFile = () => {
        inputFileRef.current?.click()
    }

    const makePreview = () => {
        let fr = new FileReader();
        return new Promise(resolve => {
            files.map(file => {
                fr.readAsDataURL(file);
                fr.onloadend = () => resolve(fr.result)
            })
        });
      }

    useEffect(() => {
        axios
            .get('https://planner.rdclr.ru/api/users/me', {headers: {
                Authorization: `Bearer ${props.token}`,
                }})
            .then(response => {  
                setUser(response.data)
            })
            .catch(error => {
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            }); 

        axios
            .get('https://planner.rdclr.ru/api/users', {headers: {
                Authorization: `Bearer ${props.token}`,
                }})
            .then(response => {  
                filterUsers(response.data)
                setUsers(response.data)
            })
            .catch(error => {
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            }); 
    }, [])

    return(
        <>
        <div className="modal-create">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-create">
                <h2 className='title-modal'>Создание события</h2>
                
                <div className="info-event">
                    <div className="what-event">
                        <div className="name">
                            <input id='name' ref={inputNameRef} required={true} className='modal-input event-input' onChange={() => handleChange('TITLE', inputNameRef.current.value)} type='text' value={props.title}/>
                            <label htmlFor="name" className={inputNameRef.current.value != '' ? 'placeholder placeholder-top' : 'placeholder'}>Название*</label>
                        </div>
                        <div className="description">
                            <input id='description' ref={inputDescriptionRef} required={true} className='modal-input event-input' onChange={() => handleChange('DESCRIPTION', inputDescriptionRef.current.value)} type='text' value={props.description}/>
                            <label htmlFor="description" className={inputDescriptionRef.current.value  ? 'placeholder placeholder-top' : 'placeholder'}>Описание*</label>
                        </div>
                        <div className="participants">
                            <input id='participants' ref={inputParticipantsRef} required={false} className='modal-input event-input' onChange={() => {handleChange('PARTICIPANTS', inputParticipantsRef.current.value); filterUsers(users)}} onClick={handleParticipantSelect} type='select' value={props.participantsFilter}/>
                            {
                                select ? 
                                <div className="window-select">
                                    <div className="select-area">
                                        {
                                            filtredUsers ? 
                                            filtredUsers.map(user => {
                                                return(
                                                    <div key={user.id} className="user-select-item" onClick={() => handleSelectUser(user)}>
                                                        <img src={avatar} alt="" width='40px' height='40px'/>
                                                        <span>{user.username}</span>
                                                    </div>
                                                )
                                            })
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                                :
                                null
                            }
                            {
                                props.participants != [] ?
                                <div className="selected-participant">
                                    {
                                        props.participants.map(item => {
                                            return(
                                                <div key={item.id} className="selected-item">
                                                    <img src={avatar} alt="" width='30px' height='30px'/>
                                                    <span>{item.username}</span>
                                                    <button className='close-btn-selected' onClick={() => deleteSelectedUser(item)}></button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                null
                            }
                            <label htmlFor="participants" className={inputParticipantsRef.current.value  ? 'placeholder placeholder-top' : 'placeholder'}>Участники</label>
                        </div>
                        <div className="drop-img-area" onClick={handleInputFile}>
                                <div className="drop-area" 
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}
                                    onDrop={e => dropHandler(e)}
                                >{drag ? 'Отпустите файлы, чтобы загрузить их' : 'Выберите фото или перетащите сюда'}</div>
                                <input
                                type="file"
                                ref={inputFileRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                    <div className="where-event">
                        <div className="info-date">
                            <div className="start-date">
                                <input id='start-date' ref={inputStartDateRef} required={true} className='modal-input event-input' onChange={() => handleChange('STARTDATE', inputStartDateRef.current.value)} type='date'/>
                                <label htmlFor="start-date" className={'placeholder placeholder-top'}>Начало*</label>
                            </div>
                            <div className="end-date">
                                <input id='end-date' ref={inputEndDateRef} required={false} className='modal-input event-input' onChange={() => handleChange('ENDDATE', inputEndDateRef.current.value)} type='date'/>
                                <label htmlFor="end-date" className={'placeholder placeholder-top'}>Конец</label>
                            </div>
                        </div>
                        <div className="time">
                            <input id='time' ref={inputTimeRef} required={false} className='modal-input event-input' onChange={() => handleChange('TIME', inputTimeRef.current.value)} type='time'/>
                            <label htmlFor="time" className={'placeholder placeholder-top'}>Время</label>
                        </div>
                        <div className="place-event">
                            <input id='place-event' ref={inputPlaceRef} required={true} className='modal-input event-input' onChange={() => handleChange('PLACE', inputPlaceRef.current.value)} type='text' value={props.place}/>
                            <label htmlFor="place-event" className={inputPlaceRef.current.value ? 'placeholder placeholder-top' : 'placeholder'}>Место проведения*</label>
                        </div>
                        <div className="event-organizer-info">
                            <img className='avatar-event' src={avatar} alt="" />
                            <div className="organizer">
                                <span className='organizer-name'>{user ? user.username : null}</span>
                                <span className='organizer-status'>Организатор</span>
                            </div>
                        </div>
                        {
                            props.photos ?
                            <div className="photo-for-upload">
                                
                            </div>
                            :
                            null
                        }
                    </div>
                </div>        
                <button id='create-btn' className={active ? 'submit' : 'submit disable'} onClick={handleCreateEvent}>
                    Создать
                </button>
            </div>
        </div>
        </>
    )
}

export default CreateEvent