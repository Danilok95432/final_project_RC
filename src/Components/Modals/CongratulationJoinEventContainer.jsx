import { connect } from "react-redux";
import { switchEnterModeAC } from "../../redux/appReducer";
import { switchEventModalModeAC } from "../../redux/eventsReducer";
import CongratulationJoinEvent from "./CongratulationJoinEvent";

let mapStateToProps = (state) =>{
    return{
        currentEvent: state.events.currentEvent,
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        switchEnterMode: (flag) => {
            dispatch( switchEnterModeAC(flag) );
        },
        switchEventModalMode: (modal) => {
            dispatch( switchEventModalModeAC(modal) );
        }
    }
}

const CongratulationJoinEventContainer = connect(mapStateToProps, mapDispatchToProps)(CongratulationJoinEvent)

export default CongratulationJoinEventContainer