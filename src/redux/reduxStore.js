import {combineReducers, legacy_createStore as createStore} from "redux"; 
import calendarReducer from "./calendarReducer";
import appReducer from "./appReducer";
import authReducer from './authReducer'
import usersReducer from "./usersReducer";
import eventsReducer from "./eventsReducer";
import createEventReducer from "./createEventReducer";
import miniCalendarReduser from './miniCalendarReducer';

let reducers = combineReducers({
    calendar: calendarReducer,
    minicalendar: miniCalendarReduser,
    app: appReducer,
    auth: authReducer,
    users: usersReducer,
    events: eventsReducer,
    create: createEventReducer
})

let store = createStore(reducers)

export default store