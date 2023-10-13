const ADD_USER = 'ADD-USER',
      AUTH_USER = 'AUTH-USER'

let initialState = {
    users: [
        {
            user: '',
            token: ''
        }
    ],
    user: null,
}


const usersReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADD_USER: {
            let newUser = {
                user: action.user.user,
                token: action.user.token,
            }
            return{
                ...state,
                users: [...state.users, newUser],
            }
        }

        case AUTH_USER: {
            return{
                ...state,
                user: action.user
            }
        }
    }
    return state
}

export let addUserAC = (user) => {
    return{
        type: ADD_USER,
        user: user
    }
}

export let authUserAC = (user) => {
    return{
        type: AUTH_USER,
        user: user
    }
}





export default usersReducer