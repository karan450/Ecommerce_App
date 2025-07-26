import React, { useState } from "react";
import Navbar from "../components/home/Navbar";
import { Link, useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/Slices/authSlice";

export default function Login({onLogin}) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(formData.email==='admin@12' && formData.password==='admin'){
      navigate('/admin')
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userInfo = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || localStorage.getItem(user.uid),
        };
        onLogin(userInfo.uid);
        dispatch(setUser(userInfo));
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }

  return (
    <>
      <Navbar />
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign In</button>
          {errorMsg && <p className="error-text" style={{ color: "red" }}>{errorMsg}</p>}
          <div className="login-footer">
            <span>New here? </span>
            <Link to="/register" className="login-link">Create an account</Link>
          </div>
        </form>
      </div>
    </>
  );
}
