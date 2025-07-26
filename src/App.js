import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Chair from "./pages/Chair";
import Oneproduct from "./pages/Oneproduct";
import RegistrationForm from "./pages/Register";
import Login from "./pages/Login";
import Sofa from "./pages/Sofa";
import Table from "./pages/Table";
import ContactUs from "./pages/ContactUs";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import Navbar from "./components/home/Navbar";
import { Routes,Route } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "./store/Slices/authSlice";
import { auth } from "./firebase";
import { onLog } from "firebase/app";
import AdminDash from "./adminpages/AdminDash";
import AddProducts from "./adminpages/AddProducts";
import Contacts from "./adminpages/Contacts";
import Products from "./adminpages/Products";
import UserData from "./adminpages/UserData";
import SuccessPayment from "./pages/SuccessPayment";



function App({onLogin}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const [initializedUid, setInitializedUid] = useState(null);

  useEffect(() => {
    if (user && user.uid && user.uid !== initializedUid) {
      onLogin(user.uid);
      setInitializedUid(user.uid);
    }
  }, [user, initializedUid, onLogin]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || localStorage.getItem(user.uid),
        }));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
    
  }, [dispatch]);
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chair' element={<Chair />} />
        <Route path='/chair/:id' element={<Oneproduct />} />
        <Route path='/register' element={<RegistrationForm onLogin={onLogin} />} />
        <Route path='/login' element={<Login onLogin={onLogin} />} />
        <Route path='/sofa' element={<Sofa />} />
        <Route path='/sofa/:id' element={<Oneproduct />} />
        <Route path='/table' element={<Table />} />
        <Route path='/table/:id' element={<Oneproduct />} />
        <Route path='/contact_us' element={<ContactUs />} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        
        <Route path="/success" element={<SuccessPayment />} />

        {/* admin paths */}
        <Route path="/admin" element={<AdminDash />}/>
        <Route path="/admin/add-product" element={<AddProducts />}/>
        <Route path="/admin/products" element={<Products />}/>
        <Route path="/admin/contacts" element={<Contacts />}/>
        <Route path="/admin/user-data" element={<UserData />}/>
      </Routes>
  </>
  );
}
export default App;
