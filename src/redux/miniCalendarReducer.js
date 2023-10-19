const PREV_MONTH_MINI = 'PREV-MONTH-MINI',
      NEXT_MONTH_MINI = 'NEXT-MONTH-MINI',
      GET_MONTH_DATA_MINI = 'GET-MONTH-DATA-MINI'

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

const getMonthDataMini = (year, month) => {
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
    currentMonthMini: monthName,
    currentYearMini: year,
    calendarYearMini: year,
    monthDataMini: getMonthDataMini(year, monthName),
}


const miniCalendarReducer = (state = initialState, action) =>{

    let changeYear = 0
    switch(action.type){
        case NEXT_MONTH_MINI: {
            if(action.index == 11){
                action.index = 0
                changeYear = 1
            }
            else action.index++
            return{
                ...state,
                currentMonthMini: action.index,
                currentYearMini: state.currentYearMini + changeYear
            }
        }
        case PREV_MONTH_MINI: {
            if(action.index == 0){
                action.index = 11
                changeYear = 1
            }
            else action.index--
            return{
                ...state,
                currentMonthMini: action.index,
                currentYearMini: state.currentYearMini - changeYear
            }
        }
        case GET_MONTH_DATA_MINI: {
            let result = getMonthDataMini(state.currentYearMini, state.currentMonthMini)
            return{
                ...state,
                monthDataMini: result
            }
        }
        default:
            break;
        
    }
    return state
}

export let nextMonthMiniAC = (index) =>{
    return{
        type: NEXT_MONTH_MINI,
        index: index
    }
}

export let prevMonthMiniAC = (index) =>{
    return{
        type: PREV_MONTH_MINI,
        index: index,
    }
}

export let getMonthDataMiniAC = () =>{
    return{
        type: GET_MONTH_DATA_MINI,
    }
}



export default miniCalendarReducer