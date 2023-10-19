import '../../../assets/css/Common.css'

const SwitchButtons = () => {
    return(
        <>
            <button className='btn-switch prev' aria-labelledby='prev-month'></button>
            <button className='btn-switch next' aria-labelledby='next-month'></button>
        </>
    )
}

export default SwitchButtons