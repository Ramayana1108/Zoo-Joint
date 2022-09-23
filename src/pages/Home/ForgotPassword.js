import React, {useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";
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
    const [email,setEmail] = useState();
    const [emailError,setEmailError] = useState("");
    const [data, setData] = useState([]);
    const colRef = collection(db,"Users");

   const navigate = useNavigate();


   const handleSubmit = async (e)=>{
    e.preventDefault();
    
        const q = query(colRef, where("email","==",email));  
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc)=>{
          setData(doc.data());  
        });
        console.log(data.email);

        if(!data.email){
            setEmailError("email does not exist or is not an administrator");
        }else{
            setEmailError("email sent")
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
        <div className="form-group mt-3">
          <label>Email</label>
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Enter Email"     
            onChange={(e)=> setEmail(e.target.value)}     
          />
         {emailError}
        </div>
     <br></br>
        <div className="login-btn">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="login-btn">
          <button type="submit" className="btn btn-primary" onClick={Cancel}>           
            Cancel         
          </button>
        </div>
      </div>
    </form>

      </div>
  );
};


export default ForgotPassword;