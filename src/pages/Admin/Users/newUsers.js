import "./Users.scss"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../services/firebase-config";  
import React,{useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import NavWrapper from "../../../components/navbar/NavWrapper";
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
                required
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
                required
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
                required
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
                required
              />
            </div>

            <div class="right">
            <label htmlFor="checkbox">Show Password?&nbsp;</label>
            <input id="checkbox" type="checkbox" checked={isShown}  onChange={togglePassword}/>
            </div>
            <br></br>
            <div className="newusers-btn-add">
              <button onClick={(e)=>{e.preventDefault(); setCreateUserModalOpen(true); setData(values)}} type="submit" className="btn btn-primary-add">
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
