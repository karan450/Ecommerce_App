import React, { useState } from "react";
import Navbar from "../components/home/Navbar";
import { Link, useNavigate } from "react-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/Slices/authSlice";

export default function RegistrationForm({onLogin}) {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem(user.uid, formData.username);
        const userInfo = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || localStorage.getItem(user.uid),
        };
        onLogin(userInfo.uid);
        dispatch(setUser(userInfo));
        navigate('/');
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }

  return (
    <>
      <Navbar />
      <div className="register-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <button type="submit">Sign Up</button>
          {errorMsg && <p className="error-text" style={{ color: "red" }}>{errorMsg}</p>}
          <div className="register-footer">
            <span>Already have an account? </span>
            <Link to="/login" className="register-link">Login here</Link>
          </div>
        </form>
      </div>
    </>
  );
}
