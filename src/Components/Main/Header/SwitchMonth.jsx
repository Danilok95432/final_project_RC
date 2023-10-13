import '../../../assets/css/SwitchMonth.css'
import '../../../assets/css/Common.css'
import { useState } from 'react'

const SwitchMonth = (props) => {

    const MONTH = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'Jule',
        'August',
        'September',
        'October',
        'November',
        'December',
    ] 

    const handlePrevBtn = () => {
        props.prev(props.month)
        props.getMonthData()
    }

    const handleNextBtn = () => {
        props.next(props.month)
        props.getMonthData()
    }

    return(
        <div className="switch">
            <p className='month'>{MONTH[props.month]}</p>
            {
                props.calendarYear != props.year ?
                <p className="year">{props.year}</p>
                :
                null
            }
            <button className='btn-switch prev' onClick={handlePrevBtn}></button>
            <button className='btn-switch next' onClick={handleNextBtn}></button>
        </div>
    )
}

export default SwitchMonth