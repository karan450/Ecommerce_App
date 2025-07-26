import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router'
import { useNavigate } from 'react-router'
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/Slices/authSlice";



export default function Navbar() {
  const currentUser = useSelector(state => state.auth.currentUser);
  const cart = useSelector((state) => state.cartItem?.cart || []);
  const [isOpen, setisOpen] = useState(false);
  const [isOpenUser, setisOpenUser] = useState();
  const navigate = useNavigate();
  const username = currentUser ? localStorage.getItem(currentUser.uid) : '';
  const dispatch = useDispatch();

  function logout() {
      signOut(auth)
        .then(() => {
          dispatch(clearUser());
          navigate("/login");
        })
        .catch((error) => {
          console.error("Logout error:", error.message);
        });
  }

  return (
    <>
    <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">
      <div className="container">
      <a className="navbar-brand" href="index.html" onClick={e=>{
        e.preventDefault();
        navigate('/');
      }}>Furni<span>.</span></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarsFurni">
        <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
          
          <NavLink to='/'>
            {({ isActive }) => (
              <li className={isActive ? "nav-item active" : ""}>
                <a className="nav-link" href="#" onClick={(e)=>{
                  e.preventDefault();
                  navigate('/');
                }}>Home</a>
              </li>
            )}
          </NavLink>
          {/* <NavLink to='/shop'>
            {({ isActive }) => (
              <li className={isActive ? "nav-item active" : ""}>
                <a className="nav-link" href="#" onClick={(e)=>{
                  e.preventDefault();
                  navigate('/shop');
                }}>Shop</a>
              </li>
            )}
          </NavLink> */}

          <NavLink to='/chair'>
            {({ isActive }) => (
              <li className={isActive ? "nav-item active" : ""}>
                <a className="nav-link" href="#" onClick={(e)=>{
                  e.preventDefault();
                  navigate('/chair');
                }}>Chair</a>
              </li>
            )}
          </NavLink>
          <NavLink to='/sofa'>
          {({ isActive }) => (
              <li className={isActive ? "nav-item active" : ""}>
                <a className="nav-link" href="#" onClick={(e)=>{
                  e.preventDefault();
                  navigate('/sofa');
                }}>Sofa</a>
              </li>
            )}
          </NavLink>
          <NavLink to='/table'>
          {({ isActive }) => (
              <li className={isActive ? "nav-item active" : ""}>
                <a className="nav-link" href="#" onClick={(e)=>{
                  e.preventDefault();
                  navigate('/table');
                }}>Tables</a>
              </li>
            )}
          </NavLink>
          <NavLink to='/contact_us'>
          {({ isActive }) => (
              <li className={isActive ? "nav-item active" : ""}>
                <a className="nav-link" href="#" onClick={(e)=>{
                  e.preventDefault();
                  navigate('/contact_us');
                }}>Contact Us</a>
              </li>
            )}
          </NavLink>
        </ul>
        <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
          <Link to='/cart'>
          <li><a className="nav-link" href="#" onClick={(e)=>{
                  e.preventDefault();
                  setisOpenUser(prev=>!prev);
                }}><img className="cart-img-logo" src="/images/user.svg" />
                  </a></li>
          </Link>
          <div className="user-expand" style={isOpenUser ? {display:'block'} : {display:'none'}}>
                {
                  currentUser ? 
                  <div className='usercontainer'>
                    <h5>Hey, {username}</h5>
                    <button onClick={logout}>{"<"}-Log Out</button>
                  </div> 
                  : 
                  <div className='usercontainer'>
                    <button onClick={()=>navigate('/register')}>Register</button>
                    <button onClick={()=>navigate('/login')}>Login</button>
                  </div>
                }
          </div>
          <Link to='/cart'>
          <li><a className="nav-link" href="#" onClick={(e)=>{
                  e.preventDefault();
                  if(!currentUser){
                    return navigate('/login');
                  }
                  setisOpen(prev=>!prev);
                }}>
                  <div className="cart-icon-wrapper" style={{ position: "relative", display: "inline-block" }}>
                  <img src="/images/cart.svg" />
                  <span className="cart-badge">{cart.length}</span>
                  </div></a></li>
          </Link>
          
                <div className="cart-expand" style={isOpen && currentUser? {display:'block'} : {display:'none'}}>
                    <ul className='productUlContainer'>
                      {
                        cart.length != 0 ? cart.map((item)=>{
                          return(
                            <li className='individualproduct' key={item.id}>
                              <img className='miniPic' src={item.image} />
                              <div>
                                <h6>{item.title}</h6> 
                                <p>${item.price}</p>
                              </div>
                                <p>quantity: {item.quantity}</p>
                            </li>
                          )
                        })
                        :
                        <>
                        <p style={{margin:'auto',fontSize:'25px'}}>Add items to your cart :)</p>
                        <img src='/images/emptycart.png' width='200px' style={{margin:'auto',marginTop:'40px'}}/>
                        </>
                        
                      }
                    </ul>
                    <div className='buttonsofminicart'>
                      <button className='minicartbtn' onClick={()=>navigate('/cart')}>
                        Checkout Cart
                      </button>
                      <button className='minicartbtn' onClick={()=>{setisOpen(prev=>!prev)}}>
                        X close
                      </button>
                    </div>
                </div>
        </ul>
      </div>
    </div>
  </nav>
  
  {/* End Header/Navigation */}
    </>
  )
}
