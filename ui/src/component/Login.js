import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {loginUser } from '../store/userSlice.js';
import {Link} from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Swal from 'sweetalert2';

function Login() {
  const {user ,loginWithRedirect} = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    var result = dispatch(loginUser({loginFormData,navigate}));
    setLoginFormData({
        email:"",
        password:""
    })
  };

  return (
    <section className="vh-100 bg-image"
      style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px;" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Sign In Form</h2>
                  <form onSubmit={handleLoginSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                      <input type="email" required id="form3Example3cg"  name="email" value={loginFormData.email} onChange={handleLoginChange} className="form-control form-control-lg" />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                      <input type="password" required id="form3Example4cg" name="password" value={loginFormData.password} onChange={handleLoginChange}  className="form-control form-control-lg" />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Sign In</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Don't have already an account? <Link to="/"
                      className="fw-bold text-body"><u>SignUp here</u></Link></p>
                        <center>
                      <button className='btn btn-primary my-4' onClick={(e)=>{
                        loginWithRedirect()
                      }}>Contiue With Google</button>
                        </center>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;

