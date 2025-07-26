import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const OneProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchProduct = async () => {
        try {
        const res = await axios.get(`https://6822cc8ab342dce8004f66ba.mockapi.io/Products/${id}`)
        setProduct(res.data);
        } catch (err) {
        console.error("Error fetching product", err)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])
    if (loading) return <p className="loader">Loading product...</p>
    if (!product) return <p className="error">Product not found 😢</p>

    const {
        title,
        price,
        description,
        stock,
        category,
        image,
        ratings,
        reviews,
    } = product

return (
    <div className="oneproduct-wrapper">
    <div className="product-card">
        <div className="product-image">
        <img src={image} alt={title} />
        </div>
        <div className="product-info">
        <h1>{title}</h1>
        <p className="category">Category: {category}</p>
        <p className="price">${price.toLocaleString()}</p>
        <p className="description">{description}</p>
        <p className="stock">Stock left: {stock}</p>
        <p className="ratings">
            ⭐ {ratings?.average} / 5 ({ratings?.count} reviews)
        </p>
        </div>
    </div>

    <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {reviews?.length > 0 ? (
        reviews.map((r, idx) => (
            <div key={idx} className="review">
            <p className="review-user">{r.user}</p>
            <p className="review-rating">⭐ {r.rating}</p>
            <p className="review-comment">"{r.comment}"</p>
            <p className="review-date">{new Date(r.date).toDateString()}</p>
            </div>
        ))
        ) : (
        <p>No reviews yet.</p>
        )}
    </div>
    </div>
)
}

export default OneProduct
