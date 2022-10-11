import Header from "../components/Header"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Index = () => {
    const search = useSelector(state => state.search);
    const navigate = useNavigate();
    useEffect(() => {
        if(search !== ''){
            navigate({pathname:'/items', search: `?search=${search}`})
        }
    }, [search]);



    return (
        <div>
            <Header />
        </div>
    )
}

export default Index
