import React, { useEffect, useState } from 'react'
import Navbar from '../components/home/Navbar'
import FooterSection from '../components/home/FooterSection'
import Hero from '../components/home/Hero'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { addtoCart } from '../store/Slices/cartSlice'
import { useDispatch } from 'react-redux'

export default function Chair() {

    const [data, setdata] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function fetchData(){
        const res = await axios.get('https://6822cc8ab342dce8004f66ba.mockapi.io/Products')
        setdata(res.data);
    }
    useEffect(()=>{
        fetchData();
    },[])

    const x = data.filter((item)=>item.category==='chair');

    function handleClick(id){
        navigate(`/chair/${id}`)
    }
    function handleAddToCart(product){
        dispatch(addtoCart(product))
        console.log('added to store');
    }
    
  return (
    <div>
        <Navbar />
        
            <div className="untree_co-section product-section before-footer-section">
                    <div className="container">
                        <div className="row">
            {
            x.map(item=>{
                return (
                    <div className="col-12 col-md-4 col-lg-3 mb-5">
                        <a className="product-item" onClick={(e)=>{e.preventDefault();}}>
                        <img src={item.image} className="img-fluid product-thumbnail" onClick={()=>{handleClick(item.id)}}/>
                        <h3 className="product-title">{item.title}</h3>
                        <strong className="product-price">${item.price}</strong>
                        <span className="icon-cross" onClick={()=>handleAddToCart(item)}>
                            <img src="images/cross.svg" className="img-fluid" />
                        </span>
                        </a>
                    </div> 
                        
                )
            })
            }
                </div>
            </div>
            </div>
        

        <FooterSection/>
    </div>
  )
}
