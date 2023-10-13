const ENTER_EMAIL = 'ENTER-EMAIL',
      ENTER_NAME = 'ENTER-NAME',
      ENTER_PASSWORD = 'ENTER-PASSWORD',
      REPEAT_PASSWORD = 'REPEAT_PASSWORD',
      LOGIN = 'LOGIN'

let initialState = {
    email: '',
    name: '',
    password: '',
    repeatPassword: '',
    isAuth: false,
    token: null,
}


const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case ENTER_EMAIL: {
            return{
                ...state,
                email: action.email
            }
        }

        case ENTER_NAME: {
            return{
                ...state,
                name: action.name
            }
        }

        case ENTER_PASSWORD: {
            return{
                ...state,
                password: action.password
            }
        }

        case REPEAT_PASSWORD: {
            return{
                ...state,
                repeatPassword: action.repeatPassword
            }
        }

        case LOGIN: {
            return{
                ...state,
                isAuth: action.flag,
                token: action.token
            }
        }

    }
    return state
}

export let enterEmailAC = (data) => {
    return{
        type: ENTER_EMAIL,
        email: data
    }
}

export let enterNameAC = (data) => {
    return{
        type: ENTER_NAME,
        name: data
    }
}

export let enterPasswordAC = (data) => {
    return{
        type: ENTER_PASSWORD,
        password: data
    }
}

export let enterRepeatPasswordAC = (data) => {
    return{
        type: REPEAT_PASSWORD,
        repeatPassword: data
    }
}

export let loginAC = (flag, token) => {
    return{
        type: LOGIN,
        flag: flag,
        token: token
    }
}





export default authReducer