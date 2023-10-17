import { connect } from "react-redux";
import { switchEnterModeAC } from "../../redux/appReducer";
import { deleteEventAC, switchEventModalModeAC } from "../../redux/eventsReducer";
import AlertLeaveEvent from "./AlertLeaveEvent";

let mapStateToProps = (state) =>{
    return{
        currentEvent: state.events.currentEvent,
        user: state.users.user,
        token: state.auth.token,
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        switchEnterMode: (flag) => {
            dispatch( switchEnterModeAC(flag) );
        },
        switchEventModalMode: (modal) => {
            dispatch( switchEventModalModeAC(modal) );
        },
        deleteEvent: (event) => {
            dispatch( deleteEventAC(event) );
        }
    }
}

const AlertLeaveEventContainer = connect(mapStateToProps, mapDispatchToProps)(AlertLeaveEvent)

export default AlertLeaveEventContainer