import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Lottie from "lottie-react";
import loaderAnimation from "../assets/animations/loader.json";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../components/Header"
import { getSearch } from '../services/Api'
import { FaShippingFast } from 'react-icons/fa';



const Index = () => {
    const [products, setProducts] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const query = useLocation().search;
    const search = query.split('=');
    const searchText = search.length > 1 ? search[1].replaceAll(/%20/g, ' ') : '';

    const getData = async (query) => {
        const {data} = await getSearch(query)
        setProducts(data)
    };

    useEffect(()=>{
        dispatch({ type: 'CHANGE_SEARCH', payload: searchText});
        getData(searchText)
    },[searchText])
    
    const handleRedirect = (id) => {
        navigate({pathname:`/items/${id}`})
    }

    if(!products){
        return <div><Lottie animationData={loaderAnimation} loop={true} /></div>
    }
    
    return (
        <div>
            <Header />
            <div className="products_container">
                <div>
                    <span className='breadcrumb'>{products && products.categories?.join(' > ')}</span>
                    {products && products.items.map(item => 
                        <div className="container_card" key={item.id} onClick={()=>handleRedirect(item.id)}>
                            <div className="container_img">
                                <img src={item.picture} alt="logo" className="product_img" />
                            </div>
                            <div className="container_price_title">
                                <span className="product_price">
                                    {`$${item.price.amount}`}
                                    {item.free_shipping && <FaShippingFast className='icon' />}
                                </span>
                                <h2 className="product_title">{`${item.title}`}</h2>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index
