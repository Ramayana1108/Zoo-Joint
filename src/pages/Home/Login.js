import React, {useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";
import PropTypes from 'prop-types';
import bcrypt from 'bcryptjs';
import Users from '../Admin/Users/Users'

import { Navigate } from "react-router";
import { Link } from "react-router-dom";
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

const Login = () => {
  const [uname, setUName] = useState();
  const [password, setPassword] = useState();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [data, setData] = useState([]);
  const colRef = collection(db,"Users");
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const [page, setPage] = useState();
    
 
  const handleSubmit = async (e)=>{
    e.preventDefault();
  
    try{

      const q = query(colRef, where("username","==",uname));  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc)=>{
        setData(doc.data());  
      
  });

  if(data.username=== uname){
    setUsernameError("");
    
    bcrypt.compare(password,data.password, function(err,res){
      if(err){
        throw err;
      }else if(!res){
        setPasswordError("Incorrect Password")
      }else{
        setPasswordError("Password Match")
        window.sessionStorage.setItem("username", data.username);
        window.sessionStorage.setItem("role", data.role);

        if (data.role === "Staff"){
          setPage("/animals");
        }else{
          setPage("/users");
        }
      }
      
    });
    
    
  }else{
    
    setUsernameError("user does not exist");
   
  }  


  console.log(data);
    }catch(error){
      console.log(error);
    }
  
  
  }


  return (
    <div className="Auth-form-container">

    {
      username && role?
      <Navigate to={page}/>:

      <form className="Auth-form">
      <div className="Auth-form-content">
        <div class="center">
          <img src="/images/logo.png" className="loginLogo" />
        </div>
        <div className="form-group mt-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Enter username"
            onChange={(e)=> {setUName(e.target.value);setUsernameError("")}}
          />
          {usernameError}
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            onChange={(e)=> {setPassword(e.target.value); setPasswordError("")}}
          />
          {passwordError}
        </div>
        <div className="d-grid">
          <p className="forgot-password text-right">
            <Link to="/forgotpassword">
            <a href="#">Forgot password?</a>
            </Link>
          </p>
        </div>
        <div className="login-btn">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </form>

    }
    
     
       
      </div>
  );
};


export default Login;
