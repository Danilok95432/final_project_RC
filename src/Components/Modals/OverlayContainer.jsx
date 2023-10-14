import { connect } from "react-redux";
import Overlay from "./Overlay";
import { enterEmailAC, enterNameAC, enterPasswordAC, enterRepeatPasswordAC, loginAC } from "../../redux/authReducer";
import { switchEnterModeAC, switchModalModeAC } from "../../redux/appReducer";
import { addUserAC, authUserAC } from "../../redux/usersReducer";
import { setEventAC, switchEventModalModeAC } from "../../redux/eventsReducer";


let mapStateToProps = (state) =>{
    return{
        enterMode: state.app.enterMode,
        modalsMode: state.app.modalsMode,
        eventModalsMode: state.events.eventModalsMode,
        currentEvent: state.events.currentEvent,
        email: state.auth.email,
        name: state.auth.name,
        password: state.auth.password,
        repeatPassword: state.auth.repeatPassword,
        isAuth: state.auth.isAuth,
        token: state.auth.token,
        usersData: state.users.users,
        user: state.users.user,
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        enterEmail: (data) => {
            dispatch( enterEmailAC(data) );
        },
        enterName: (data) => {
            dispatch( enterNameAC(data) );
        },
        enterPassword: (data) => {
            dispatch( enterPasswordAC(data) );
        },
        enterRepeatPassword: (data) => {
            dispatch( enterRepeatPasswordAC(data) );
        },
        switchEnterMode: (flag) => {
            dispatch( switchEnterModeAC(flag) );
        },
        switchEventModalMode: (modal) => {
            dispatch( switchEventModalModeAC(modal) );
        },
        login: (flag, token) => {
            dispatch( loginAC(flag, token) );
        },
        switchModalMode: (modal) => {
            dispatch( switchModalModeAC(modal) );
        },
        addUser: (user) => {
            dispatch( addUserAC(user) );
        },
        authUser: (user) => {
            dispatch( authUserAC(user) );
        },
        setCurrentEvent: (event) => {
            dispatch( setEventAC(event) );
        }
    }
}

const OverlayContainer = connect(mapStateToProps, mapDispatchToProps)(Overlay)

export default OverlayContainer