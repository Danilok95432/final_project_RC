import { useEffect } from 'react'
import '../../assets/css/Common.css'
import Authorization from './Authorization'
import AuthorizationPassword from './AuthorizationPassword';
import Registration from './Registration';
import ErrorEvent from './ErrorEvent'
import CreateEventContainer from './CreateEventContainer';
import CheckEventContainer from './CheckEventContainer';
import CongratulationEventContainer from './CongratulationEventContainer';
import AlertEventContainer from './AlertEventContainer';
import CongratulationJoinEventContainer from './CongratulationJoinEventContainer';
import AlertLeaveEvent from './AlertLeaveEvent';
import AlertLeaveEventContainer from './AlertLeaveEventContainer';

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
                        <CreateEventContainer />
                        :
                        null
                    }
                    {
                        props.eventModalsMode.Check ?
                        <CheckEventContainer />
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
                        <CongratulationEventContainer />
                        :
                        null
                    }
                    {
                        props.eventModalsMode.CongratulationJoin ?
                        <CongratulationJoinEventContainer />
                        :
                        null
                    }
                    {
                        props.eventModalsMode.Alert ?
                        <>
                            <AlertEventContainer />
                            <div className="overlay"></div>
                        </>
                        :
                        null
                    }
                    {
                        props.eventModalsMode.AlertLeave ?
                        <>
                            <AlertLeaveEventContainer />
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