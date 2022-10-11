import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo.png'
import { FaSistrix } from 'react-icons/fa';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const valueText = useSelector(state => state.search)

    useEffect(()=>{
        setText(valueText)
    }, [valueText])

    const handleSearch = () => {
        dispatch({ type: 'CHANGE_SEARCH', payload: text});
        navigate({pathname:'/items', search: `?search=${text}`})
    }

    const handleKeyDown = (key) => {
        if(key.keyCode === 13 ) {
            handleSearch();
        }
    }

    const goHome = () => {
        dispatch({ type: 'CHANGE_SEARCH', payload: ''});
        navigate({pathname:'/'})
    }

    return (
        <div className="header_container">
            <img src={Logo} alt="logo" onClick={goHome} />
            <input className="input-field" onKeyDown={handleKeyDown} type="text" value={text} onChange={({target}) => setText(target.value)} placeholder='Nunca dejes de buscar'/>
            <button className='button' onClick={handleSearch}><FaSistrix className='icon' /></button>
        </div>
    )
}

export default Header
