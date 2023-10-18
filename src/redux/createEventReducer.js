const CHANGE_FORM = 'CHANGE-FORM',
      ACTIVE_SELECT = 'ACTIVE-SELECT',
      CLEAR_PARTICIPANTS = 'CLEAR-PARTICIPANTS',
      DELETE_PARTCIPANT = 'DELETE-PARTICIPANT',
      CREATED_EVENT = 'CREATED-EVENT',
      SET_PHOTOS_ID = 'SET-PHOTOS-ID'

let initialState = {
    title: '',
    description: '',
    participantsFilter: '',
    participants: [],
    photos: [],
    startDate: null,
    endDate: null,
    time: null,
    place: '',
    participantsSelect: false,
    createdEvent: null,
    photosId: []
}


const createEventReducer = (state = initialState, action) =>{
    switch(action.type){
        case CHANGE_FORM: {
            switch(action.field){
                case 'TITLE': {
                    state.title = action.data
                    break
                }
                case 'DESCRIPTION': {
                    state.description = action.data
                    break
                }
                case 'PARTICIPANTS': {
                    state.participantsFilter = action.data
                    break
                }
                case 'PARTICIPANTS-ARR': {
                    state.participants = [...state.participants, action.data]
                    break
                }
                case 'PHOTOS': {
                    state.photos = action.data
                    break
                }
                case 'STARTDATE': {
                    state.startDate = action.data
                    break
                }
                case 'ENDDATE': {
                    state.endDate = action.data
                    break
                }
                case 'TIME': {
                    state.time = action.data
                    break
                }
                case 'PLACE': {
                    state.place = action.data
                    break
                }
                case 'ALL': {
                    state.title = action.data
                    state.description = action.data
                    state.participantsFilter = action.data
                    state.photos = action.data
                    state.startDate = action.data
                    state.endDate = action.data
                    state.time = action.data
                    state.place = action.data
                }
            }

            return{
                ...state
            }
        }
        case ACTIVE_SELECT: {
            return{
                ...state,
                participantsSelect: action.flag
            }
        }

        case CLEAR_PARTICIPANTS: {
            return{
                ...state,
                participants: []
            }
        }

        case DELETE_PARTCIPANT: {
            let newParticipants = state.participants.filter((item) => item != action.user)
            return{
                ...state,
                participants: newParticipants
            }
        }

        case CREATED_EVENT: {
            
            return{
                ...state,
                createdEvent: action.event
            }
        }

        case SET_PHOTOS_ID: {
            
            return{
                ...state,
                photosId: action.ids
            }
        }
    }

    return state
}


export let changeFormAC = (field, data) => {
    return{
        type: CHANGE_FORM,
        field: field,
        data: data
    }
}

export let activeSelectAC = (flag) => {
    return{
        type: ACTIVE_SELECT,
        flag: flag
    }
}

export let clearParticipantsAC = () => {
    return{
        type: CLEAR_PARTICIPANTS,
    }
}

export let deleteParticipantAC = (user) => {
    return{
        type: DELETE_PARTCIPANT,
        user: user
    }
}

export let createdEventAC = (event) => {
    return{
        type: CREATED_EVENT,
        event: event
    }
}

export let setPhotosIdAC = (ids) => {
    return{
        type: SET_PHOTOS_ID,
        ids: ids
    }
}

export default createEventReducer

