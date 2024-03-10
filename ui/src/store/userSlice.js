import { createSlice } from '@reduxjs/toolkit';
import { requested_url } from '../component/url';
import axios from 'axios';
import jscookie from 'js-cookie';
import Swal from 'sweetalert2';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    registerUser: async (state, action) => {
      try {
        var data = action.payload.registerFormData;
        var navigate = action.payload.navigate;
        var result = await axios.post(`${requested_url}/userRegistration`, data);
        if (result.status === 201) {
          Swal.fire({
            text:"User Register successfully",
            background:"black",
            icon:"success"
          });
          navigate('/userLogin');
        }
        else if(result.status==203){
          Swal.fire({
            text:"User Already Exist",
            background:"black",
            icon:"error"
          })
        }
        else{
          Swal.fire({
            text:"Error in registration",
            background:"black",
            icon:"error"
          })
        }
      } catch (err) {
        console.log("Error while User Register",err);
      }
    },
    loginUser: async (state, action) => {
      try {
        var Logindata = action.payload.loginFormData;
        var navigate = action.payload.navigate;
        var result = await axios.post(`${requested_url}/userLogin`, Logindata);
       if (result.status === 200) { // Change this to 200 for a successful login
        jscookie.set("activeUser_email",Logindata.email);
        Swal.fire({
          text:"User Login successfully",
          background:"black",
          icon:"success"
        })
        navigate('/home');
      }
      else{
          Swal.fire({
            text:"Invalid email or password",
            background:"black",
            icon:"error"
          })
        }
      } catch (err) {
        console.log("Error while User Login",err);
      }
    },
  },
});

export const { registerUser, loginUser } = authSlice.actions;
export default authSlice.reducer;
