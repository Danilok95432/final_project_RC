const NEXT_MONTH = 'PREV-MONTH',
      PREV_MONTH = 'NEXT-MONTH',
      GET_MONTH_DATA = 'GET-MONTH-DATA'

const DAYS_IN_WEEK = 7,
      DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const date = new Date();
const monthName = date.getMonth();
const year = date.getFullYear();

const isLeapYear = (year) => {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

const getDayOfWeek = (date) => {
    const dayOfWeek = date.getDay()
    if(dayOfWeek === 0) return 6
    else return dayOfWeek - 1
}

const getDaysInMonth = (year, month) => {
    if(isLeapYear(year) && month === 1)
    {
        return DAYS_IN_MONTH[month] + 1
    }
    else return DAYS_IN_MONTH[month]
}

const getMonthData = (year, month) => {
    const result = []
    const date = new Date(year, month)
    const daysInMorth = getDaysInMonth(year, month)
    const monthStartsOn = getDayOfWeek(date)

    let day = 1

    for(let i = 0; i < (daysInMorth + monthStartsOn) / DAYS_IN_WEEK; i++)
    {
        result[i] = []
        for(let j = 0; j < DAYS_IN_WEEK; j++){
            if( i === 0 && j < monthStartsOn){
                let dayOfPrevMonth
                if(month - 1 < 0)
                {
                    dayOfPrevMonth = DAYS_IN_MONTH[DAYS_IN_MONTH.length - 1]
                }
                else dayOfPrevMonth = DAYS_IN_MONTH[month - 1]
                if(month - 1 >= 0)
                    result[i][j] = {date: new Date(year, month - 1, dayOfPrevMonth - monthStartsOn + 1 + j), events: null}
                else 
                {
                    result[i][j] = {date: new Date(year, month - 1, dayOfPrevMonth - monthStartsOn + 1 + j), events: null}
                }
                
            }
            else if(day > daysInMorth){
                day = 1
                month += 1
                result[i][j] = {date: new Date(year, month, day++), events: {}}
            }
            else result[i][j] = {date: new Date(year, month, day++), events: null}
        }
    }

    return result
}

let initialState = {
    currentMonth: monthName,
    currentYear: year,
    calendarYear: year,
    monthData: getMonthData(year, monthName),
}


const calendarReducer = (state = initialState, action) =>{

    let changeYear = 0
    switch(action.type){
        case NEXT_MONTH: {
            if(action.index == 11){
                action.index = 0
                changeYear = 1
            }
            else action.index++
            return{
                ...state,
                currentMonth: action.index,
                currentYear: state.currentYear + changeYear
            }
        }
        case PREV_MONTH: {
            if(action.index == 0){
                action.index = 11
                changeYear = 1
            }
            else action.index--
            return{
                ...state,
                currentMonth: action.index,
                currentYear: state.currentYear - changeYear
            }
        }
        case GET_MONTH_DATA: {
            let result = getMonthData(state.currentYear, state.currentMonth)
            return{
                ...state,
                monthData: result
            }
        }
        default:
            break;
        
    }
    return state
}

export let nextMonthAC = (index) =>{
    return{
        type: NEXT_MONTH,
        index: index
    }
}

export let prevMonthAC = (index) =>{
    return{
        type: PREV_MONTH,
        index: index,
    }
}

export let getMonthDataAC = () =>{
    return{
        type: GET_MONTH_DATA,
    }
}



export default calendarReducer