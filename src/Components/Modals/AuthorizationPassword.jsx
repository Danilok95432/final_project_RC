import { useRef, useState } from 'react'
import axios from 'axios'
import '../../assets/css/css-for-modal/Authorization.css'

const AuthorizationPassword = (props) => {

    const [valid, setValid] = useState(null)
    const [error, setError] = useState('')
    const [typePassword, setTypePassword] = useState(false)

    let inputPasswordRef = useRef('')

    const handleChangePassword = () => {
        let text = inputPasswordRef.current.value
        props.enterPassword(text)
    }

    const switchMode = () => {
        props.enterPassword('')
        props.switchModalMode('ALL')
        props.switchEnterMode(false) 
    }

    const validatePassword = () => {
        axios
            .post('http://localhost:1337/api/auth/local', {
                identifier: props.user[0].email,
                password: inputPasswordRef.current.value,
            })
            .then(response => { 
                // Handle success.
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                props.login(true, response.data.jwt)
                switchMode()
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                setError('Неверный пароль')
                setValid(false)
            });

    }

    return(
        <div className="modal-auth">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-auth">
                <h2 className='title-modal'>Вход</h2>
                <div id='enter-password'>
                        <div className="password">
                            <input id='password' className='modal-input' ref={inputPasswordRef} type={typePassword ? 'text' : 'password'} placeholder='password' onChange={handleChangePassword} value={props.password}/>
                            {
                                props.password != '' ?
                                <button id={typePassword ? 'close-password' : 'open-password'} onClick={() => setTypePassword(!typePassword)}></button>
                                :
                                null
                            }
                            {
                                    valid != null && !valid ?
                                    <label htmlFor="password">{error}</label>
                                    :
                                    null
                                }
                        </div>
                </div>
                
                <button className='submit' onClick={() => {
                    validatePassword()
                    }}>
                    Войти
                </button>
            </div>
        </div>
    )
}

export default AuthorizationPassword