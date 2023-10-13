import { connect } from "react-redux";
import { nextMonthAC, prevMonthAC, getMonthDataAC } from "../../../redux/calendarReducer";
import Header from "./Header";
import { switchEnterModeAC, switchModalModeAC } from "../../../redux/appReducer";
import { switchEventModalModeAC } from "../../../redux/eventsReducer";

let mapStateToProps = (state) =>{
    return{
        currentMonth: state.calendar.currentMonth,
        currentYear: state.calendar.currentYear,
        calendarYear: state.calendar.calendarYear,
        monthData: state.calendar.monthData,
        enterMode: state.app.enterMode,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        nextMonth: (index) =>{
            dispatch( nextMonthAC(index) );
        },
        prevMonth: (index) =>{
            dispatch( prevMonthAC(index) );
        },
        getMonthData: () => {
            dispatch( getMonthDataAC() );
        },
        switchEnterMode: (flag) => {
            dispatch( switchEnterModeAC(flag) );
        },
        switchModalMode: (modal) => {
            dispatch( switchModalModeAC(modal) );
        },
        switchEventModalMode: (modal) => {
            dispatch( switchEventModalModeAC(modal) );
        }
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer