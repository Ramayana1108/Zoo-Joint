import "./Users.scss"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../services/firebase-config";  
import React,{useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import NavWrapper from "../../../components/navbar/NavWrapper";
import "./newUser.scss"

const initialValues = {
    first_name: "",
    last_name:"",
    password:"",
    username: ""
  };
  
const NewUser = () => {
    const [isShown, setIsSHown] = useState(false);
    const [values, setValues] = useState(initialValues);
     //Redirecting
     const navigate = useNavigate();


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };

    const AddUser = (e) =>{
        e.preventDefault();

        addDoc(collection(db, "Users"), {
            canEdit:true,
            first_name: values.first_name,
            last_name: values.last_name,
            password: values.password,
            role:"Staff",
            username: values.username
         })
         .then(() => {
           alert('User Created' );
           navigate("/users")
         })
         .catch((error) => {
           alert(error.message);
         });
    }
    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
      };
    
      //cancel Button
     function Cancel(){
      navigate("/users")
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
                className="form-control mt-1"
                placeholder="Enter First Name"
                value={values.first_name}
                onChange={handleInputChange}
              />

            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                className="form-control mt-1"
                placeholder="Enter Last Name"
                value={values.last_name} 
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control mt-1"
                placeholder="Enter Username"
                value={values.username} 
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type={isShown ? "text" : "password"}
                name="password"
                className="form-control mt-1"
                placeholder="Enter Password"
                value={values.password} 
                onChange={handleInputChange}
              />
            </div>

            <div class="right">
            <label htmlFor="checkbox">Show Password?&nbsp;</label>
            <input id="checkbox" type="checkbox" checked={isShown}  onChange={togglePassword}/>
            </div>
            
            <div className="login-btn-add">
              <button onClick={AddUser} type="submit" className="btn btn-primary-add">
                Save
              </button>
              
            </div>

            <div className="login-btn-add">
              <button onClick={Cancel} className="btn btn-primary-cancel">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
          </NavWrapper>
        
    );
};

export default NewUser;
