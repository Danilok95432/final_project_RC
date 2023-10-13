import {combineReducers, legacy_createStore as createStore} from "redux"; 
import calendarReducer from "./calendarReducer";
import appReducer from "./appReducer";
import authReducer from './authReducer'
import usersReducer from "./usersReducer";
import eventsReducer from "./eventsReducer";

let reducers = combineReducers({
    calendar: calendarReducer,
    app: appReducer,
    auth: authReducer,
    users: usersReducer,
    events: eventsReducer
})

let store = createStore(reducers)

export default store