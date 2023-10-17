import { connect } from "react-redux";
import { switchEnterModeAC } from "../../redux/appReducer";
import { switchEventModalModeAC } from "../../redux/eventsReducer";
import AlertEvent from "./AlertEvent";
import { changeFormAC, clearParticipantsAC } from "../../redux/createEventReducer";

let mapStateToProps = (state) =>{
    return{
        
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
        changeForm: (field, data) => {
            dispatch( changeFormAC(field, data) );
        },
        clearParticipants: () => {
            dispatch( clearParticipantsAC() );
        }
    }
}

const AlertEventContainer = connect(mapStateToProps, mapDispatchToProps)(AlertEvent)

export default AlertEventContainer