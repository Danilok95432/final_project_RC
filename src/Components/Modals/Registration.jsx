import { useRef, useState } from 'react'
import axios from 'axios'
import '../../assets/css/css-for-modal/Registration.css'

const Registration = (props) => {

    const [valid, setValid] = useState(null)
    const [error, setError] = useState('')
    const [border, setBorder] = useState('modal-input-reg')
    const [typePassword, setTypePassword] = useState(false)

    let inputPasswordRef = useRef('')
    let inputRepeatPasswordRef = useRef('')
    let inputNameRef = useRef('')

    const handleChangeName = () => {
        let text = inputNameRef.current.value
        props.enterName(text)
    }

    const handleChangePassword = () => {
        let text = inputPasswordRef.current.value
        props.enterPassword(text)
        handleError()
    }

    const handleChangeRepeatPassword = () => {
        let text = inputRepeatPasswordRef.current.value
        props.enterRepeatPassword(text)
        handleError()
    }

    const handleError = () => {
        if(inputPasswordRef.current.value != '' && inputRepeatPasswordRef.current.value != '') 
            checkValid(inputPasswordRef.current.value, inputRepeatPasswordRef.current.value)
    }

    const switchMode = () => {
        props.enterPassword('')
        props.switchModalMode('ALL')
        props.switchEnterMode(false) 
    }

    const checkValid = (password, repeatPassword) => {
        if(password != repeatPassword){
            setError('Пароли не совпадают')
            setBorder('modal-input-reg invalid')
            setValid(false)
        }
        else if(password.length < 8 || password.length > 32){
            setError('Пароль должен быть не менее 8 символов и не более 32 символов')
            setBorder('modal-input-reg invalid')
            setValid(false)
        }
        else if(String(password).match(/^(?=.*[0-9])(?=.*[!@#$%^&*])([a-zA-Z])+([ -~])*/) == null){
            setError('Используйте латинские буквы, цифры и спец символы')
            setBorder('modal-input-reg invalid')
            setValid(false)
        }
        else {
            setBorder('modal-input-reg valid')
            setValid(true)
        }
    }

    const addNewUser = (user) => {
        axios
            .post('https://planner.rdclr.ru/api/auth/local/register', user)
            .then(response => { 
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
            props.addUser({user: response.data.user, token: response.data.jwt})
            props.authUser(response.data.user)
            props.login(true, response.data.jwt)
            })
            .catch(error => {
            console.log('An error occurred:', error.response);
            });
    }

    return(
        <div className="modal-reg">
            <div className='modal-content'>
                <button className="close-btn" onClick={switchMode}></button>
                <h2 className='title-modal'>Регистрация</h2>
                <div className="disclaimer">
                    <div className="info-vector"></div>
                    <p className='disclaimer-text'>{`Используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } / \ _ {} $ # )`}</p>
                </div>
                <div id='enter-password-reg'>
                        <div className="password-reg">
                            <div className="name-input">
                                <input id='name' className="modal-input-reg" ref={inputNameRef} type='text' onChange={handleChangeName} value={props.name}/>
                                <label htmlFor="name" className={inputNameRef.current.value ? 'placeholder placeholder-top' : 'placeholder'}>Ваше имя</label>
                            </div>
                            <div className="password-input">
                                <input id='password' className={border} ref={inputPasswordRef} type={typePassword ? 'text' : 'password'} onChange={handleChangePassword} value={props.password}/>
                                {
                                    props.password != '' ?
                                    <button id={typePassword ? 'close-password' : 'open-password'} onClick={() => setTypePassword(!typePassword)}></button>
                                    :
                                    null
                                }
                                <label htmlFor="password" className={inputPasswordRef.current.value  ? 'placeholder placeholder-top' : 'placeholder'}>Пароль</label>
                            </div>
                            <div className="password-repeat-input">
                                <input id='password-repeat' className={border} ref={inputRepeatPasswordRef} type={typePassword ? 'text' : 'password'} onChange={handleChangeRepeatPassword} value={props.repeatPassword}/>
                                {
                                    props.repeatPassword != '' ?
                                    <button id={typePassword ? 'close-password' : 'open-password'} onClick={() => setTypePassword(!typePassword)}></button>
                                    :
                                    null
                                }
                                <label htmlFor="password-repeat-input" className={inputRepeatPasswordRef.current.value  ? 'placeholder placeholder-top' : 'placeholder'}>Повторите пароль</label>
                                {
                                    valid != null && !valid ?
                                    <label htmlFor="password-repeat">{error}</label>
                                    :
                                    null
                                }
                            </div>
                        </div>
                </div>
                
                <button className={ valid ? 'submit' : 'submit disable'} onClick={() => {
                    if(valid != null && valid != false)
                    {
                        let user = {
                            username: props.name,
                            email: props.user,
                            password: props.password,
                        }
                        addNewUser(user)
                        switchMode()
                    }
                    else checkValid(props.password, props.repeatPassword)
                    }}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    )
}

export default Registration