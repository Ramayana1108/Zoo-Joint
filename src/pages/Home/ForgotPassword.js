import React, {useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";
import "./ForgotPassword.scss";
import PropTypes from 'prop-types';
import bcrypt from 'bcryptjs';
import Users from '../Admin/Users/Users'
import Login from "./Login";

import { Navigate } from "react-router";
import {useNavigate, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,where, query, getDoc
} from "firebase/firestore";
import { db } from "../../services/firebase-config";
import { async } from "@firebase/util";
import { FunctionsOutlined } from "@mui/icons-material";

const ForgotPassword = () => {
  const [isShown, setIsSHown] = useState(false);
    const [email,setEmail] = useState("");
    const [emailError,setEmailError] = useState("");
    const colRef = collection(db,"Users");

   const navigate = useNavigate();


   const handleSubmit = async (e)=>{
    e.preventDefault();

      if(!email){
        setEmailError("*Please fill out this field.");
      }else{
        const q = query(colRef, where("email","==",email));  
        let useremail= [];
        getDocs(q).then(async (response) => {
          useremail = await response.docs.map((doc) => ({
          email: doc.data().email,
      
        }));     
      }).then(()=>{
        if(useremail.length === 0){
          setEmailError("Email does not exist or is not an administrator");
        }else{
          setEmailError("Email sent")
        }

      })
      }
        


   }

    const Cancel = () =>{
       navigate("/");
    }
 


  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
      <div className="Auth-form-content">
        <div class="center">
          <img src="/images/logo.png" className="loginLogo" />
        </div>
        <div className="form-floating mt-3">
          <input
            type="text"
            className={`form-control mt-1 ${ emailError ? 'is-invalid':  ''}`}
            placeholder="Enter Email"     
            onChange={(e)=> {setEmail(e.target.value); setEmailError("");}}  
            id="floatingUsername"
            required />
            <label for="floatingUsername">Email</label>   
           <div className="error-text">{emailError}</div>
        </div>
     <br></br>
        <div className="forgotpassword-btn-add">
          <button type="submit" className="btn btn-primary-add" onClick={handleSubmit}>
            Submit
          </button>
          <button type="submit" className="btn btn-primary-cancel" onClick={Cancel}>           
            Cancel         
          </button>
        </div>
      </div>
    </form>

      </div>
  );
};


export default ForgotPassword;
