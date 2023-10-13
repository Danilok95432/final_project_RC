const ADD_EVENT = 'ADD-EVENT'

let initialState = {
    events: {

    }
}


const createEventReducer = (state = initialState, action) =>{
    switch(action.type){
        case CHANGE_FORM: {
            switch(action.field){
                
            }

            return{
                ...state
            }
        }
    }

    return state
}

export default createEventReducer

