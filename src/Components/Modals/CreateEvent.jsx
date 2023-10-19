import '../../assets/css/css-for-modal/CreateEvent.css'
import avatar from '../../assets/avatar.png'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import DropzoneComponent from '../Main/Common/DropzoneComponent'
import MiniCalendarContainer from '../Main/Calendar/MiniCalendarContainer'
import moment from 'moment'

const CreateEvent = (props) => {
    const [active, setActive] = useState(false)
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [filtredUsers, setFiltredUsers] = useState([])
    const [select, setSelect] = useState(false)
    const [selectDate, setSelectDate] = useState(false)
    const [selectDateEnd, setSelectDateEnd] = useState(false)

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

    const uploadFiles = async() => {
        let photosStore = null
        let photosId = []
        const formData = new FormData()
        props.photos.map(photo => {
            formData.append('files', photo)
        })
        return await axios
            .post('https://planner.rdclr.ru/api/upload', formData, {
                headers: {
                    "Authorization": `Bearer ${props.token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => { 
                console.log(response.data)
                photosStore = response.data
                photosStore.map(photo => {
                    photosId.push(photo.id)
                })
                return photosId
            })
            .catch(error => {
                console.log(error.response)
                props.changeForm('ALL', '')
                props.clearParticipants()
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            }); 
    }

    const handleCreateEvent = async() => {
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
        let startDateNonFormat = moment(props.startDate).format("YYYY-MM-DD")
        let endDateNonFormat
        let splitEndDateEvent
        let dateEndEvent
        if(props.endDate){
            endDateNonFormat = moment(props.endDate).format("YYYY-MM-DD")
            splitEndDateEvent = endDateNonFormat.split('-')
            dateEndEvent = new Date(splitEndDateEvent[0], splitEndDateEvent[1], splitEndDateEvent[2], 0, 0, 0, 0)
        }
        let splitStartDateEvent = startDateNonFormat.split('-')
        let splitTimeEvent = inputTimeRef.current.value.split(':')
        let dateStartEvent = new Date(splitStartDateEvent[0], splitStartDateEvent[1] - 1, splitStartDateEvent[2], splitTimeEvent[0], splitTimeEvent[1], 0, 0)
        if(props.photos.length != 0){

        let upload = await uploadFiles()

        let event = {
            title: inputNameRef.current.value,
            description: inputDescriptionRef.current.value,
            dateStart: dateStartEvent,
            dateEnd: props.endDate == '' ? null : dateEndEvent,
            location: inputPlaceRef.current.value,
            participants: participantsId,
            photos: upload
        }

        axios
            .post('https://planner.rdclr.ru/api/events', JSON.stringify(event,getCircularReplacer()), { headers: {
                "Authorization": `Bearer ${props.token}`,
                "Content-Type": "application/json"
                }})
            .then(response => { 
                console.log(response.data)
                props.createdEvent(response.data)
                props.changeForm('ALL', '')
                props.clearParticipants()
                props.switchEnterMode(false) 
                props.switchEventModalMode('CONGRATULATION')
                props.switchEnterMode(true) 
            })
            .catch(error => {
                console.log(error.response)
                props.changeForm('ALL', '')
                props.clearParticipants()
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            });
        }
        else {
        let event = {
            title: inputNameRef.current.value,
            description: inputDescriptionRef.current.value,
            dateStart: dateStartEvent,
            dateEnd: inputEndDateRef.current.value == '' ? '' : dateEndEvent,
            location: inputPlaceRef.current.value,
            participants: participantsId,
            photos: null
        }
        
        axios
            .post('https://planner.rdclr.ru/api/events', JSON.stringify(event,getCircularReplacer()), { headers: {
                "Authorization": `Bearer ${props.token}`,
                "Content-Type": "application/json"
                }})
            .then(response => { 
                console.log(response.data)
                props.createdEvent(response.data)
                props.changeForm('ALL', '')
                props.clearParticipants()
                props.switchEnterMode(false) 
                props.switchEventModalMode('CONGRATULATION')
                props.switchEnterMode(true) 
            })
            .catch(error => {
                console.log(error.response)
                props.changeForm('ALL', '')
                props.clearParticipants()
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            });   
        }
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
                            <input id='name' ref={inputNameRef} required={true} className='modal-input event-input' onChange={() => handleChange('TITLE', inputNameRef.current.value)} type='text' value={props.title} maxLength="140"/>
                            <label htmlFor="name" className={inputNameRef.current.value != '' ? 'placeholder placeholder-top' : 'placeholder'}>Название*</label>
                        </div>
                        <div className="description">
                            <input id='description' ref={inputDescriptionRef} required={true} className='modal-input event-input' onChange={() => handleChange('DESCRIPTION', inputDescriptionRef.current.value)} type='text' value={props.description} maxLength="1000"/>
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
                    </div>
                    <div className="where-event">
                        <div className="info-date">
                            <div className="start-date">
                                <div className="date-input" onClick={() => {setSelectDate(!selectDate); setSelectDateEnd(false)}} onChange={() => {setSelectDate(false)}}>
                                    <input id='start-date' ref={inputStartDateRef} required={true} className='modal-input event-input' type='text' value={moment(props.startDate).format("YYYY-MM-DD") == 'Invalid date' ? '' : moment(props.startDate).format("YYYY-MM-DD")}/>
                                    <div className="vector-calendar"></div>
                                </div>
                                <label htmlFor="start-date" className={'placeholder placeholder-top'}>Начало*</label>
                                {
                                    selectDate ?
                                    <div className="window-select-date">
                                        <MiniCalendarContainer />
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className="end-date">
                                <div className="date-input" onClick={() => {setSelectDateEnd(props.startDate != '' ? !selectDateEnd : false); setSelectDate(false);}} onChange={() => {setSelectDateEnd(false)}}>
                                    <input id='end-date' ref={inputEndDateRef} required={false} className='modal-input event-input' type='text' value={moment(props.endDate).format("YYYY-MM-DD") == 'Invalid date' ? '' : moment(props.endDate).format("YYYY-MM-DD")}/>
                                    <div className="vector-calendar"></div>
                                </div>
                                <label htmlFor="end-date" className={'placeholder placeholder-top'}>Конец</label>
                                {
                                    selectDateEnd ?
                                    <div className="window-select-date-end">
                                        <MiniCalendarContainer />
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className="time">
                            <input id='time' ref={inputTimeRef} required={false} className='modal-input event-input' onChange={() => handleChange('TIME', inputTimeRef.current.value)} type='time'/>
                            <label htmlFor="time" className={'placeholder placeholder-top'}>Время</label>
                        </div>
                        <div className="place-event">
                            <input id='place-event' ref={inputPlaceRef} required={true} className='modal-input event-input' onChange={() => handleChange('PLACE', inputPlaceRef.current.value)} type='text' value={props.place} maxLength="140"/>
                            <label htmlFor="place-event" className={inputPlaceRef.current.value ? 'placeholder placeholder-top' : 'placeholder'}>Место проведения*</label>
                        </div>
                        <div className="event-organizer-info">
                            <img className='avatar-event' src={avatar} alt="" />
                            <div className="organizer">
                                <span className='organizer-name'>{user ? user.username : null}</span>
                                <span className='organizer-status'>Организатор</span>
                            </div>
                        </div>   
                    </div>
                </div>        
                <DropzoneComponent changeForm={props.changeForm}/>
                <button id='create-btn' className={active ? 'submit' : 'submit disable'} onClick={handleCreateEvent}>
                    Создать
                </button>
            </div>
        </div>
        </>
    )
}

export default CreateEvent