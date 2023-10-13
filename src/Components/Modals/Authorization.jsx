import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../../assets/css/css-for-modal/Authorization.css'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjk3MTA4MTcyLCJleHAiOjE2OTk3MDAxNzJ9.7CxmhJ1I9WJ3Y-vzjYm3QJwrSeinO5Zklb0sPcoF_O0'

const Authorization = (props) => {

    const [valid, setValid] = useState(false)
    const [usersList, setUsersList] = useState([])

    useEffect(() => { 
        axios
            .get('http://localhost:1337/api/users', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                // Handle success.
                console.log('Data: ', response.data);
                setUsersList(response.data)
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
    },[])

    let inputEmailRef = useRef('')

    const handleChangeEmail = () => {
        let text = inputEmailRef.current.value
        props.enterEmail(text)
    }

    const handleClear = () => {
        props.enterEmail('')
    }

    const switchMode = () => {
        props.enterEmail('')
        props.switchModalMode('ALL')
        props.switchEnterMode(false) 
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const isExist = (user) => {
        return user.email === props.email
    }

    const handleNextBtn = () => {
        let result = validateEmail(props.email)
        if(result != null)
        {
            let user = usersList.filter(isExist) 
            if(user.length != 0){
                props.enterEmail('')
                props.switchModalMode('PASSWORD')
                props.authUser(user)
            }
            else {
                props.enterEmail('')
                props.switchModalMode('REGISTRATION')
                props.authUser(props.email)
            }
        }
        setValid(validateEmail(props.email))
    }

    return(
        <div className="modal-auth">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-auth">
                <h2 className='title-modal'>Вход</h2>
                <div id='enter-email'>
                    <div className="email">
                        <input id='email' className={valid != null ? 'modal-input' : 'modal-input invalid'} ref={inputEmailRef} type="text" placeholder='Email' onChange={handleChangeEmail} value={props.email}/>
                        {
                            props.email != '' ?
                            <button id='close-input' onClick={handleClear}></button>
                            :
                            null
                        }
                        <label htmlFor="email">
                            {
                                valid == null ?
                                'Некорректный email'
                                :
                                null
                            }
                        </label>
                    </div>
                </div>
                <button className='submit' onClick={handleNextBtn}>Далее</button>
            </div>
        </div>
    )
}

export default Authorization