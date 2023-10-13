import '../../../assets/css/Header.css'
import Logo from './Logo'
import SwitchMonth from './SwitchMonth'
import avatar from '../../../assets/avatar.png'

const Header = (props) => {

    const handleMode = () => {
        props.switchEnterMode(true)
        props.switchModalMode('EMAIL')
    }

    const handleEventMode = () => {
        props.switchEnterMode(true)
        props.switchEventModalMode('CREATE')
    }

    return(
        <header className="header-main">
            <Logo />
            <SwitchMonth year={props.currentYear} calendarYear={props.calendarYear} month={props.currentMonth} 
            next={props.nextMonth} prev={props.prevMonth}
            monthData= {props.monthData}
            getMonthData={props.getMonthData}/>
            {
                !props.isAuth ?
                    <button className='btn-enter' onClick={handleMode}>Войти</button>
                    :
                    <div className="authorizated-block">
                        <button className='btn-enter btn-create' onClick={handleEventMode}>
                            <div className="create-vector"></div>
                        </button>
                        <div className="avatar">
                            <img src={avatar} alt="" />
                        </div>
                    </div>
            }
        </header>
    )
}

export default Header