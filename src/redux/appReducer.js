const SWITCH_ENTER_MODE = 'SWITCH-ENTER-MODE',
      SWITH_MODAL_MODE = 'SWITCH-MODAL-MODE'


let initialState = {
    enterMode: false,
    modalsMode: {
        Email: false,
        Password: false,
        Registration: false
    }
}


const appReducer = (state = initialState, action) =>{
    switch(action.type){
        case SWITCH_ENTER_MODE: {
            return{
                ...state,
                enterMode: action.flag
            }
        }

        case SWITH_MODAL_MODE: {
            switch(action.modal){
                case 'EMAIL': {
                    state.modalsMode.Email = true
                    state.modalsMode.Password = false
                    state.modalsMode.Registration = false
                    break
                }

                case 'PASSWORD': {
                    state.modalsMode.Email = false
                    state.modalsMode.Password = true
                    state.modalsMode.Registration = false
                    break
                }

                case 'REGISTRATION': {
                    state.modalsMode.Email = false
                    state.modalsMode.Password = false
                    state.modalsMode.Registration = true
                    break
                }

                case 'ALL': {
                    state.modalsMode.Email = false
                    state.modalsMode.Password = false
                    state.modalsMode.Registration = false
                    break
                }
            }

            return{
                ...state,
            }
        }
    }
    return state
}

export let switchEnterModeAC = (flag) => {
    return{
        type: SWITCH_ENTER_MODE,
        flag: flag
    }
}

export let switchModalModeAC = (modal) => {
    return{
        type: SWITH_MODAL_MODE,
        modal: modal
    }
}


export default appReducer