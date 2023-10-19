import MiniCalendar from "./MiniCalendar";
import { connect } from "react-redux";
import { getMonthDataMiniAC, nextMonthMiniAC, prevMonthMiniAC } from "../../../redux/miniCalendarReducer";
import { changeFormAC } from "../../../redux/createEventReducer";

let mapStateToProps = (state) =>{
    return{
        currentMonthMini: state.minicalendar.currentMonthMini,
        currentYearMini: state.minicalendar.currentYearMini, 
        calendarYearMini: state.minicalendar.calendarYearMini,
        monthDataMini: state.minicalendar.monthDataMini,
        startDate: state.create.startDate,
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        getMonthDataMini: () => { 
            dispatch( getMonthDataMiniAC() );
        },
        nextMini: (month) => {
            dispatch( nextMonthMiniAC(month) );
        },
        prevMini: (month) => {
            dispatch( prevMonthMiniAC(month) );
        },
        changeForm: (field, data) => {
            dispatch( changeFormAC(field, data) );
        }
    }
}

const MiniCalendarContainer = connect(mapStateToProps, mapDispatchToProps)(MiniCalendar)

export default MiniCalendarContainer