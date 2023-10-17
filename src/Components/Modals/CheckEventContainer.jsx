import { connect } from "react-redux";
import { switchEnterModeAC, switchModalModeAC } from "../../redux/appReducer";
import { setEventAC, switchEventModalModeAC } from "../../redux/eventsReducer";
import CheckEvent from "./CheckEvent";

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
        switchModalMode: (modal) => {
            dispatch( switchModalModeAC(modal) );
        },
        switchEventModalMode: (modal) => {
            dispatch( switchEventModalModeAC(modal) );
        },
        setCurrentEvent: (event) => {
            dispatch( setEventAC(event) );
        }
    }
}

const CheckEventContainer = connect(mapStateToProps, mapDispatchToProps)(CheckEvent)

export default CheckEventContainer