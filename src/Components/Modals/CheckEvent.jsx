import { useEffect, useState } from 'react'
import axios from 'axios'
import '../../assets/css/css-for-modal/CheckEvent.css'

const CheckEvent = (props) => {

    

    const switchMode = () => {
        props.switchEventModalMode('ALL')
        props.switchEnterMode(false) 
    }

    useEffect(() => {
        axios
            .get('http://localhost:1337/api/events', {headers: {
                Authorization: `Bearer ${props.token}`,
                }})
            .then(response => {
                // Handle success.
                console.log('Data: ', response.data);
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                props.switchEnterMode(false) 
                props.switchEventModalMode('ERROR')
                props.switchEnterMode(true) 
            });
    }, [])

    return(
        <div className="modal-create">
            <button className="close-btn" onClick={switchMode}></button>
            <div className="modal-content-create">
                <h2 className='title-modal'>{'1'}</h2>
            </div>
        </div>
    )
}

export default CheckEvent