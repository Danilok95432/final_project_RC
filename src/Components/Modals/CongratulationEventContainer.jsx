import { connect } from "react-redux";
import { switchEnterModeAC } from "../../redux/appReducer";
import { switchEventModalModeAC } from "../../redux/eventsReducer";
import CongratulationEvent from "./CongratulationEvent";

let mapStateToProps = (state) =>{
    return{
        createdEvent: state.create.createdEvent,
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

const CongratulationEventContainer = connect(mapStateToProps, mapDispatchToProps)(CongratulationEvent)

export default CongratulationEventContainer