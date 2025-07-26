import React from 'react'

export default function ProductsonHome() {
  return (
    <>
        <div className="product-section">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
          <a className="product-item" href="cart.html">
            <img src="images/product-3.png" className="img-fluid product-thumbnail" />
            <h3 className="product-title">Ergonomic Chair</h3>
            <strong className="product-price">$43.00</strong>
            <span className="icon-cross">
              <img src="images/cross.svg" className="img-fluid" />
            </span>
          </a>
        </div>
      </div>
    </div>
  </div> 
    </>
  )
}
