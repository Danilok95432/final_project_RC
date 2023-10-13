const SWITCH_EVENT_MODE = 'SWITCH-EVENT-MODE',
      SET_EVENT = 'SET-EVENT'


let initialState = {
    eventModalsMode: {
        Create: false,
        Check: false,
        Alert: false,
        Congratulation: false,
        Error: false,
    },
    currentEvent: null
}


const eventsReducer = (state = initialState, action) =>{
    switch(action.type){
        case SWITCH_EVENT_MODE: {
            switch(action.modal){
                case 'CREATE': {
                    state.eventModalsMode.Create = true
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.Error = false
                    break
                }

                case 'CHECK': {
                    state.eventModalsMode.Create = false
                    state.eventModalsMode.Check = true
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.Error = false
                    break
                }

                case 'ALERT': {
                    state.eventModalsMode.Create = true
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = true
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.Error = false
                    break
                }

                case 'CONGRATULATION': {
                    state.eventModalsMode.Create = false
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.Congratulation = true
                    state.eventModalsMode.Error = false
                    break
                }

                case 'ERROR': {
                    state.eventModalsMode.Create = false
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.Congratulation = false
                    state.eventModalsMode.Error = true
                    break
                }

                case 'ALL': {
                    state.eventModalsMode.Create = false
                    state.eventModalsMode.Check = false
                    state.eventModalsMode.Alert = false
                    state.eventModalsMode.Congratulation = false
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


export default eventsReducer