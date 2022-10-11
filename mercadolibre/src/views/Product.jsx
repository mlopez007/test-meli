import { useEffect, useState } from 'react'
import Lottie from "lottie-react";
import loaderAnimation from "../assets/animations/loader.json";
import { useParams } from 'react-router-dom';
import Header from "../components/Header"
import { getProductById } from '../services/Api'


const Index = () => {
    const [ product, setProduct ] = useState()
    const params = useParams()
    const productId = params.id;

    const getData = async (productId) => {
        const {data} = await getProductById(productId)
        setProduct(data)
    };

    useEffect(()=>{
            getData(productId)
    },[productId])


    if(!product){
        return <div><Lottie animationData={loaderAnimation} loop={true} /></div>
    }
    return (
        <div>
            <Header />
            <div className="product_container">
                <div className="container_card">
                    <div className='container_img_title'>
                        <div className="container_img">
                            <img src={product.item.picture} alt="logo" className="product_img" />
                            <div>
                                <h2>Descripción del producto</h2>
                                <p className='product_description'>{product.item.description}</p>
                            </div>
                        </div>
                        <div className="container_price_title">
                            <h2 className="product_title">{`${product.item.title}`}</h2>
                            <span className="product_price">{`$${product.item.price.amount}`}</span>
                            <button className='product_buy'>Comprar</button>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
    )
}

export default Index
