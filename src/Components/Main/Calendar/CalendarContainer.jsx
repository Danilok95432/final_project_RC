import Calendar from "./Calendar";
import { connect } from "react-redux";
import { getMonthDataAC } from "../../../redux/calendarReducer";
import { setEventAC, switchEventModalModeAC } from "../../../redux/eventsReducer";
import { switchEnterModeAC } from "../../../redux/appReducer";

let mapStateToProps = (state) =>{
    return{
        currentMonth: state.calendar.currentMonth,
        currentYear: state.calendar.currentYear, 
        monthData: state.calendar.monthData,
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        getMonthData: () => {
            dispatch( getMonthDataAC() );
        },
        switchEventModalMode: (modal) => {
            dispatch( switchEventModalModeAC(modal) );
        },
        switchEnterMode: (flag) => {
            dispatch( switchEnterModeAC(flag) );
        },
        setCurrentEvent: (event) => {
            dispatch( setEventAC(event) );
        } 
    }
}

const CalendarContainer = connect(mapStateToProps, mapDispatchToProps)(Calendar)

export default CalendarContainer