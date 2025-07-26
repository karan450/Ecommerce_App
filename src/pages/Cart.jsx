import React, { useEffect, useState } from 'react'
import Navbar from '../components/home/Navbar';
import FooterSection from '../components/home/FooterSection'
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removefromCart } from '../store/Slices/cartSlice';
import { loadStripe } from "@stripe/stripe-js";
import { combineSlices } from '@reduxjs/toolkit';
import axios from 'axios';

export default function Cart() {
    const data = useSelector((state)=>state.cartItem.cart);
    const dispatch = useDispatch();
    
    let subtotal = data.reduce((accum,current)=>accum+(current.price*current.quantity),0)
    
    async function proceedToCheck(){
        try{
            let a = data.map((item)=>({
                "title": item.title,
                "imag_url": item.image,
                "price": item.price,
                "quantity": item.quantity
            }))
            console.log(a);
            const res = await axios.post("http://localhost:5000/create-checkout-session",{
                cartItems: a,
                customerEmail: "sure@gmail.com"
                }
            )
            const stripe = await loadStripe  ("pk_test_51RdZoeLw1CzE0eQt3lZI2QWJ7CCXzCqPf7gdiqwlH09POW7ISKHxpvN1lfxkVAJbTVdSz3918fU6OnnsVUrqKORU00hCQKcO3v");
            await stripe.redirectToCheckout({ sessionId: res.data.sessionId });

        }catch(error){
            console.log(error.message);
        }
    }

    function handleAdd(id){
        dispatch(increaseQuantity(id));
    }

    function handleSub(id,quantity){
        if(quantity==1){
            return dispatch(removefromCart(id));
        }
        dispatch(decreaseQuantity(id));
    }

    function handleClick(e,id){
        e.preventDefault();
        dispatch(removefromCart(id));
    }

  return (
    <>
        <Navbar />
        <div className="hero">
            <div className="container">
            <div className="row justify-content-between">
                <div className="col-lg-5">
                <div className="intro-excerpt">
                    <h1>Cart</h1>
                </div>
                </div>
                <div className="col-lg-7">
                </div>
            </div>
            </div>
        </div>
        {/* End Hero Section */}
        <div className="untree_co-section before-footer-section">
            <div className="container">
            <div className="row mb-5">
                <form className="col-md-12" method="post">
                <div className="site-blocks-table">
                    <table className="table">
                    <thead>
                        <tr>
                        <th className="product-thumbnail">Image</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-total">Total</th>
                        <th className="product-remove">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        data.map((item)=>{
                            console.log(item)
                            return <tr key={item.id}>
                            <td className="product-thumbnail">
                                <img src={item.image} alt="Image" className="img-fluid" />
                            </td>
                            <td className="product-name">
                                <h2 className="h5 text-black">{item.title}</h2>
                            </td>
                            <td>${item.price}</td>
                            <td>
                                <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{ maxWidth: "120px" }}>
                                    <div className="input-group-prepend">
                                    <button className="btn btn-outline-black decrease" type="button" onClick={()=>handleSub(item.id,item.quantity)} style={{fontSize:'40px'}}>-</button>
                                    </div>
                                    <input
                                    type="text"
                                    className="form-control text-center quantity-amount"
                                    placeholder=""
                                    value={item.quantity}
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    />
                                    <div className="input-group-append">
                                    <button className="btn btn-outline-black increase" type="button" onClick={()=>handleAdd(item.id)} style={{fontSize:'32px'}}>+</button>
                                    </div>
                                </div>
                            </td>
                            <td>${item.price * item.quantity}</td>
                            <td>
                                <a href="" className="btn btn-black" onClick={(e)=>handleClick(e,item.id)}>X</a>
                            </td>


                            </tr>
                        })
                        
                        }
                    </tbody>
                    </table>
                </div>
                </form>
            </div>
            <div className="row">
                <div className="col-md-6">
                <div className="row mb-5">
                    <div className="col-md-6 mb-3 mb-md-0">
                    <button className="btn btn-black btn-sm btn-block">Update Cart</button>
                    </div>
                    <div className="col-md-6">
                    <button className="btn btn-outline-black btn-sm btn-block">Continue Shopping</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <label className="text-black h4" htmlFor="coupon">Coupon</label>
                    <p>Enter your coupon code if you have one.</p>
                    </div>
                    <div className="col-md-8 mb-3 mb-md-0">
                    <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code" />
                    </div>
                    <div className="col-md-4">
                    <button className="btn btn-black">Apply Coupon</button>
                    </div>
                </div>
                </div>
                <div className="col-md-6 pl-5">
                <div className="row justify-content-end">
                    <div className="col-md-7">
                    <div className="row">
                        <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                        <span className="text-black">Subtotal</span>
                        </div>
                        <div className="col-md-6 text-right">
                        <strong className="text-black">${subtotal}.00</strong>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                        <span className="text-black">Delivery Charge</span>
                        </div>
                        <div className="col-md-6 text-right">
                        <strong className="text-black">$5.00</strong>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-md-6">
                        <span className="text-black">Total</span>
                        </div>
                        <div className="col-md-6 text-right">
                        <strong className="text-black">${subtotal+5}.00</strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                        <button className="checkout btn btn-black btn-lg py-3 btn-block border border-dark" onClick={proceedToCheck}>Proceed To Checkout</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <FooterSection />
    </>

  )
}
