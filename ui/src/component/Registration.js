import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from '../store/userSlice.js';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [validName, setValidName] = useState(false);
  function validateName(e) {
    var reg=/^[A-Za-z\s]+$/;
    if (reg.test(e.target.value)) {
      setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
      setValidName(true);
      document.getElementById("nameText").innerText=""
    } else {
      setValidName(false);
      document.getElementById("nameText").innerText="Please enter valid name"
    }
  }


  const [validEmail, setValidEmail] = useState(false);
  function validateEmail(e) {
    var reg=/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
    ;
    if (reg.test(e.target.value)) {
      setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
      setValidEmail(true);
      document.getElementById("emailText").innerText=""
    } else {
      setValidEmail(false);
      document.getElementById("emailText").innerText="Please enter valid email"
    }
  }

  const [validPass, setValidPass] = useState(false);
  function validatePass(e) {
    var reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (reg.test(e.target.value)) {
      setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
      setValidPass(true);
      document.getElementById("passText").innerText=""
    } else {
      setValidPass(false);
      document.getElementById("passText").innerText="Please enter valid Password"
    }
  }


  const [validNum, setValidNum] = useState(false);
  function validateNum(e) {
    var reg=/^[6-9]\d{9}$/;
    if (reg.test(e.target.value)) {
      setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value });
      setValidNum(true);
      document.getElementById("numText").innerText=""
    } 

    else {
      setValidNum(false);
      document.getElementById("numText").innerText="Please enter valid Phone Number"
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validName &&  validEmail && validPass &&  validNum) {
      dispatch(registerUser({registerFormData,navigate}));
      setRegisterFormData({});
    }
    else{
      Swal.fire({
        text:"Please Enter All details",
        background:"black",
        icon:"error"
      })
    }
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
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form onSubmit={handleRegisterSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                      <input type="text" id="form3Example1cg" name="name" onChange={validateName} className="form-control form-control-lg" />
                      <p id='nameText' className="text-danger"></p>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                      <input type="email" id="form3Example3cg" name="email"  onChange={validateEmail} className="form-control form-control-lg" />
                      <p id='emailText' className="text-danger"></p>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                      <input type="password" id="form3Example4cg" name="password"  onChange={validatePass} className="form-control form-control-lg" />
                      <p id='passText' className="text-danger"></p>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">Phone Number</label>
                      <input type="number" id="form3Example4cg" name="phone" onChange={validateNum} className="form-control form-control-lg" />
                      <p id='numText' className="text-danger"></p>
                    </div>


                    <div className="d-flex justify-content-center">
                      <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/userLogin"
                      className="fw-bold text-body"><u>Login here</u></Link></p>
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

export default Registration;
