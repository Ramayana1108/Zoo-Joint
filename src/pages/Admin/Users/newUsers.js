import "./Users.scss"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../services/firebase-config";  
import React,{useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import NavWrapper from "../../../components/navbar/NavWrapper";
import validator from 'validator'
import "./newUser.scss"
import { CreateUserModal } from "../../../components/Modals/UsersModals";


const initialValues = {
    first_name: "",
    last_name:"",
    password:"",
    username: ""
  };
  
const NewUser = () => {
    const [isShown, setIsSHown] = useState(false);
    const [values, setValues] = useState(initialValues);
    const [data, setData] = useState();
    const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
    const [fnameError, setFnameError] = useState("");
    const [lnameError, setLnameError] = useState("");
    const [unameError, setUnameError] = useState("");
    const [passError, setPassError] = useState("");

    const regex = "/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/";

     //Redirecting
     const navigate = useNavigate();


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };

   
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
      };
    
      //cancel Button
     function Cancel(){
      navigate("/users")
  }

  const conditionalStatements = (e) =>{
    e.preventDefault();

    if(!values.first_name && !values.last_name && !values.username && !values.password){
      setFnameError("Please fill out this field.");
      setLnameError("Please fill out this field.");
      setUnameError("Please fill out this field.");
      setPassError("Please fill out this field.");
    }else if (values.first_name !==""&& !values.last_name && !values.username && !values.password){
      setFnameError("");
      setLnameError("Please fill out this field.");
      setUnameError("Please fill out this field.");
      setPassError("Please fill out this field.");
    }else if (values.first_name !==""&& values.last_name!=="" && !values.username && !values.password){
      setFnameError("");
      setLnameError("");
      setUnameError("Please fill out this field.");
      setPassError("Please fill out this field.");
    }else if (values.first_name !==""&& !values.last_name && values.username !=="" && !values.password){
      setFnameError("");
      setLnameError("Please fill out this field.");
      setUnameError("");
      setPassError("Please fill out this field.");
    }else if (values.first_name !==""&& !values.last_name && !values.username && values.password!==""){
      setFnameError("");
      setLnameError("Please fill out this field.");
      setUnameError("Please fill out this field.");
      setPassError("");
    }else if (values.first_name !==" "&& values.last_name !=="" && values.username !=="" && !values.password){
      setFnameError("");
      setLnameError("");
      setUnameError("");
      setPassError("Please fill out this field.");
    }else if (values.first_name !==""&& values.last_name !=="" && !values.username  && values.password !==""){
      setFnameError("");
      setLnameError("");
      setUnameError("Please fill out this field.");
      setPassError("");
    }else if (values.first_name !==""&& !values.last_name && values.username!=="" && values.password !==""){
      setFnameError("");
      setLnameError("Please fill out this field.");
      setUnameError("");
      setPassError("");
    }else if (!values.first_name && values.last_name !=="" && !values.username && !values.password){
      setFnameError("Please fill out this field.");
      setLnameError("");
      setUnameError("Please fill out this field.");
      setPassError("Please fill out this field.");
    }else if (!values.first_name && values.last_name !=="" && values.username !=="" && !values.password){
      setFnameError("Please fill out this field.");
      setLnameError("");
      setUnameError("");
      setPassError("Please fill out this field.");
    }else if (!values.first_name && values.last_name !=="" && !values.username && values.password !=="" ){
      setFnameError("Please fill out this field.");
      setLnameError("");
      setUnameError("Please fill out this field.");
      setPassError("");
    }else if (!values.first_name && values.last_name !=="" && values.username!=="" && values.password !=="" ){
      setFnameError("Please fill out this field.");
      setLnameError("");
      setUnameError("");
      setPassError("");
    }else if (!values.first_name && !values.last_name  && values.username!=="" && !values.password  ){
      setFnameError("Please fill out this field.");
      setLnameError("Please fill out this field.");
      setUnameError("");
      setPassError("Please fill out this field.");
    }else if (!values.first_name && !values.last_name  && values.username!=="" && values.password !=="" ){
      setFnameError("Please fill out this field.");
      setLnameError("Please fill out this field.");
      setUnameError("");
      setPassError("");
    }else if (!values.first_name && !values.last_name  && !values.username && values.password !=="" ){
      setFnameError("Please fill out this field.");
      setLnameError("Please fill out this field.");
      setUnameError("Please fill out this field.");
      setPassError("");
    }else{
      setFnameError("");
      setLnameError("");
      setUnameError("");
      setPassError("");

      if (validator.isStrongPassword(values.password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        setCreateUserModalOpen(true); setData(values)
      } else {
        setPassError('Password must have at least 8 characters, 1 lowercase, 1 upprecase, 1 number and a symbol')
      }
     
      
  
    }
   
  }
    

    return(
      <NavWrapper>
        <h1 class="registerTitle">Register Admin Staff</h1> 
        <div className="Auth-form-container-add">
        <form className="Auth-form-add">
          <div className="Auth-form-content-add">
            <div class="center">
            </div>
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                type="string"
                name="first_name"
                className={`form-control mt-1 ${fnameError ? 'is-invalid':  ''}`}
                placeholder="Enter First Name"
                value={values.first_name}
                onChange={handleInputChange}
                required
              />
              <div className="error-text">{fnameError}</div>
            </div>

            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                className={`form-control mt-1 ${lnameError ? 'is-invalid':  ''}`}
                placeholder="Enter Last Name"
                value={values.last_name} 
                onChange={handleInputChange}
                required
              />
              <div className="error-text">{lnameError}</div>
            </div>
            

            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className={`form-control mt-1 ${unameError? 'is-invalid':  ''}`}
                placeholder="Enter Username"
                value={values.username} 
                onChange={handleInputChange}
                required
              />
              <div className="error-text">{unameError}</div>
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type={isShown ? "text" : "password"}
                name="password"
                className={`form-control mt-1 ${passError ? 'is-invalid':  ''}`}
                placeholder="Enter Password"
                value={values.password} 
                onChange={handleInputChange}
                required
              />
              <div className="error-text">{passError}</div>
            </div>

            <div class="right">
            <label htmlFor="checkbox">Show Password?&nbsp;</label>
            <input id="checkbox" type="checkbox" checked={isShown}  onChange={togglePassword}/>
            </div>
            <br></br>
            <div className="newusers-btn-add">
              <button onClick={conditionalStatements} type="submit" className="btn btn-primary-add">
                Register
              </button>
              <button onClick={Cancel} className="btn btn-primary-cancel">
                Cancel
              </button>
            </div>
          </div>
        </form>
        {
         createUserModalOpen &&(<CreateUserModal closeCreateUserModalModal={()=>setCreateUserModalOpen(false)} data ={values}/>)
      }
      </div>
          </NavWrapper>
        
    );
};

export default NewUser;
