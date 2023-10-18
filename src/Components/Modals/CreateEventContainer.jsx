import { connect } from "react-redux";
import CreateEvent from "./CreateEvent";
import { activeSelectAC, changeFormAC, clearParticipantsAC, createdEventAC, deleteParticipantAC, setPhotosIdAC } from "../../redux/createEventReducer";
import { switchEnterModeAC } from "../../redux/appReducer";
import { switchEventModalModeAC } from "../../redux/eventsReducer";

let mapStateToProps = (state) =>{
    return{
        title: state.create.title,
        description: state.create.description,
        participants: state.create.participants,
        participantsFilter: state.create.participantsFilter,
        photos: state.create.photos,
        startDate: state.create.startDate,
        endDate: state.create.endDate,
        time: state.create.time,
        place: state.create.place,
        activeSelect: state.create.participantsSelect,
        user: state.users.user,
        token: state.auth.token,
        currentEvent: state.events.currentEvent,
        createEvent: state.create.createdEvent,
        photosIdArray: state.create.photosId
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        changeForm: (field, data) => {
            dispatch( changeFormAC(field, data) );
        },
        switchEnterMode: (flag) => {
            dispatch( switchEnterModeAC(flag) );
        },
        switchEventModalMode: (modal) => {
            dispatch( switchEventModalModeAC(modal) );
        },
        activeSelect: (flag) => {
            dispatch( activeSelectAC(flag) );
        },
        clearParticipants: () => {
            dispatch( clearParticipantsAC() );
        },
        deleteParticipant: (user) => {
            dispatch( deleteParticipantAC(user) );
        },
        createdEvent: (event) => {
            dispatch( createdEventAC(event) );
        },
        setPhotosId: (ids) => {
            dispatch( setPhotosIdAC(ids) );
        }
    }
}

const CreateEventContainer = connect(mapStateToProps, mapDispatchToProps)(CreateEvent)

export default CreateEventContainer