// SignUp.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://discuss-24w6.onrender.com/api/signup', values);
        console.log(response.data);
        navigate('/welcome');
      } catch (error) {
        console.error('Error signing up:', error);
      }
    },
  });

  return (
    <div className="">
          <video src="./video/signup.mp4" autoPlay loop muted></video> 
          <div className='box'>
      <h1 className="mb-10 fw-dark" style={{color:"whitesmoke"}}>SIGN Up</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            className="form-control mt-3"
            placeholder="Username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>
        <br />
        <div>
          <input
            className="form-control mt-3"
            placeholder="Enter Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <br />
        <div>
          <input
            id="password-input"
            type="password"
            className="form-control mt-3"
            placeholder="Enter Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <br />
        <button style={{color:"whitesmoke"}} type="submit" className="btn btn-outline- fw-bold rounded-pill py-2 px-4">
          Sign Up
        </button>
      </form>
      </div>
    </div>
    
  );
};

export default SignUp;
