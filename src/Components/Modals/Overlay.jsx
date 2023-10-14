import { useEffect } from 'react'
import '../../assets/css/Common.css'
import Authorization from './Authorization'
import AuthorizationPassword from './AuthorizationPassword';
import Registration from './Registration';
import CreateEvent from './CreateEvent'
import ErrorEvent from './ErrorEvent'
import CongratulationEvent from './CongratulationEvent';
import AlertEvent from './AlertEvent';
import CheckEvent from './CheckEvent'

const Overlay = (props) => {

    const switchMode = () => {
        props.enterEmail('')
        props.switchModalMode('ALL')
        props.switchEnterMode(false) 
    }

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape') {
                event.preventDefault();
                switchMode();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return(
        <>
            {
                props.enterMode ?
                <div className="overlay">
                    {
                        props.modalsMode.Email ?
                        <Authorization 
                            email={props.email}  
                            enterEmail={props.enterEmail} 
                            switchEnterMode={props.switchEnterMode}
                            usersData={props.usersData}
                            authUser={props.authUser}
                            switchModalMode={props.switchModalMode}
                        />
                        :
                        null
                    }
                    {
                        props.modalsMode.Password ?
                        <AuthorizationPassword 
                            password={props.password}
                            enterPassword={props.enterPassword}
                            switchEnterMode={props.switchEnterMode}
                            switchModalMode={props.switchModalMode}
                            user={props.user}
                            login={props.login}
                            isAuth={props.isAuth}/>
                        :
                        null
                    }
                    {
                        props.modalsMode.Registration ?
                        <Registration 
                            password={props.password}
                            name={props.name}
                            repeatPassword={props.repeatPassword}
                            enterName={props.enterName}
                            enterPassword={props.enterPassword}
                            enterRepeatPassword={props.enterRepeatPassword}
                            switchEnterMode={props.switchEnterMode}
                            switchModalMode={props.switchModalMode}
                            addUser={props.addUser}
                            authUser={props.authUser}
                            user={props.user}
                            login={props.login}
                            isAuth={props.isAuth}/>
                        :
                        null
                    }
                    {
                        props.eventModalsMode.Create ?
                        <CreateEvent  
                        switchEnterMode={props.switchEnterMode}
                        switchEventModalMode={props.switchEventModalMode}
                        currentEvent={props.currentEvent}
                        user={props.user}
                        token={props.token}
                        />
                        :
                        null
                    }
                    {
                        props.eventModalsMode.Check ?
                        <CheckEvent  
                        switchEnterMode={props.switchEnterMode}
                        switchEventModalMode={props.switchEventModalMode}
                        currentEvent={props.currentEvent}
                        setCurrentEvent={props.setCurrentEvent}
                        user={props.user}
                        token={props.token}
                        />
                        :
                        null
                    }
                    {
                        props.eventModalsMode.Error ?
                        <ErrorEvent  
                        switchEnterMode={props.switchEnterMode}
                        switchEventModalMode={props.switchEventModalMode}/>
                        :
                        null
                    }
                    {
                        props.eventModalsMode.Congratulation ?
                        <CongratulationEvent  
                        switchEnterMode={props.switchEnterMode}
                        switchEventModalMode={props.switchEventModalMode}/>
                        :
                        null
                    }
                    {
                        props.eventModalsMode.Alert ?
                        <>
                            <AlertEvent  
                            switchEnterMode={props.switchEnterMode}
                            switchEventModalMode={props.switchEventModalMode}/>
                            <div className="overlay"></div>
                        </>
                        :
                        null
                    }
                </div>
                :
                null
            }
        </>
    )
}

/*
<AuthorizationPassword 
    password={props.password}
    enterPassword={props.enterPassword}
    switchEnterMode={props.switchMode}
    login={props.login}
    isAuth={props.isAuth}/>
<Registration />
*/

export default Overlay