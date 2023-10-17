const SWITCH_EVENT_MODE = 'SWITCH-EVENT-MODE',
      SET_EVENT = 'SET-EVENT',
      DELETE_EVENT = 'DELETE-EVENT'


let initialState = {
    eventModalsMode: {
        Create: false,
        Check: false,
        Alert: false,
        AlertLeave: false,
        Congratulation: false,
        CongratulationJoin: false,
        Error: false,
    },
    currentEvent: null,
    deletedEvent: null,
}


const eventsReducer = (state = initialState, action) =>{
    switch(action.type){
        case SWITCH_EVENT_MODE: {
            switch(action.modal){
                case 'CREATE': {
                    state.eventModalsMode.Create = true
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.AlertLeave = false
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.CongratulationJoin = false
                    state.eventModalsMode.Error = false
                    break
                }

                case 'CHECK': {
                    state.eventModalsMode.Create = false
                    state.eventModalsMode.Check = true
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.AlertLeave = false
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.CongratulationJoin = false
                    state.eventModalsMode.Error = false
                    break
                }

                case 'ALERT': {
                    state.eventModalsMode.Create = true
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = true
                    state.eventModalsMode.AlertLeave = false
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.CongratulationJoin = false
                    state.eventModalsMode.Error = false
                    break
                }

                case 'ALERT-LEAVE': {
                    state.eventModalsMode.Create = false
                    state.eventModalsMode.Check = true
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.AlertLeave = true
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.CongratulationJoin = false
                    state.eventModalsMode.Error = false
                    break
                }

                case 'CONGRATULATION': {
                    state.eventModalsMode.Create = false
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.AlertLeave = false
                    state.eventModalsMode.Congratulation = true
                    state.eventModalsMode.CongratulationJoin = false
                    state.eventModalsMode.Error = false
                    break
                }

                case 'CONGRATULATION-JOIN': {
                    state.eventModalsMode.Create = false
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.AlertLeave = false
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.CongratulationJoin = true
                    state.eventModalsMode.Error = false
                    break
                }

                case 'ERROR': {
                    state.eventModalsMode.Create = false
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.AlertLeave = false
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.CongratulationJoin = false
                    state.eventModalsMode.Error = true
                    break
                }

                case 'ALL': {
                    state.eventModalsMode.Create = false
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.AlertLeave = false
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.CongratulationJoin = false
                    state.eventModalsMode.Error = false
                    break
                }
            }

            return{
                ...state,
            }
        }

        case SET_EVENT: {
            return{
                ...state,
                currentEvent: action.event
            }
        }

        case DELETE_EVENT: {
            return{
                ...state,
                deletedEvent: action.event
            }
        }
    }
    return state
}

export let switchEventModalModeAC = (modal) => {
    return{
        type: SWITCH_EVENT_MODE,
        modal: modal
    }
}

export let setEventAC = (event) => {
    return{
        type: SET_EVENT,
        event: event
    }
}

export let deleteEventAC = (event) => {
    return{
        type: DELETE_EVENT,
        event: event
    }
}


export default eventsReducer