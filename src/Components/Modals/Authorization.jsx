import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../../assets/css/css-for-modal/Authorization.css'

const Authorization = (props) => {

    const [valid, setValid] = useState(false)

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

    const isExist = (email) => {
        let status = 200
        console.log(email)
        axios
            .get(`https://planner.rdclr.ru/api/taken-emails/${email}`)
            .then(response => {
                status = response.status
            })
            .catch(error => {
                status = error.response.status
            })
        return status
    }

    const handleNextBtn = () => {
        let result = validateEmail(props.email)
        if(result != null)
        {
            let status = isExist(props.email)
            if(status == 200)
            {
                props.enterEmail('')
                props.switchModalMode('PASSWORD')
                props.authUser(props.email)
            }
            else{
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