import '../../assets/css/css-for-modal/AlertEvent.css'
import axios from 'axios'

const AlertLeaveEvent = (props) => {

    const switchMode = () => {
        props.switchEnterMode(false) 
        props.switchEventModalMode('CHECK')
        props.switchEnterMode(true) 
    }
    
    const leaveEvent = () => {
        let event = props.currentEvent.data
        if(props.currentEvent.data.owner.email == props.user){
            axios.delete(`https://planner.rdclr.ru/api/events/${props.currentEvent.data.id}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            })
                .then(response => {
                    console.log(response.data)
                    props.deleteEvent(event)
                })
                .catch(error => {
                    console.log(error.response)
                    props.switchEnterMode(false) 
                    props.switchEventModalMode('ERROR')
                    props.switchEnterMode(true) 
                })
        }
        else {
            axios.post(`https://planner.rdclr.ru/api/events/${props.currentEvent.data.id}/leave`, {}, {headers: {
            Authorization: `Bearer ${props.token}`,
            }})
            .then(response => {
                console.log(response.data)
                props.updateParticipantMe('')
            })
            .catch(error => {
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            })
        }
        props.switchEnterMode(false)
        props.switchEventModalMode('ALL')
    }

    return(
        <div className="modal-alert">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-alert">
                <h2 className='title-modal'>Вы действительно хотите отменить участие?</h2>
                <div className="btns-alert">
                    <button id='btn-alert' className='submit' onClick={switchMode}>Нет</button>
                    <button id='btn-alert' className='submit' onClick={leaveEvent}>Да</button>
                </div>
            </div>
        </div>
    )
}

export default AlertLeaveEvent