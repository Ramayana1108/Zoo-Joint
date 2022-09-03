import "./Users.scss"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../../services/firebase-config";  
import React,{useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import NavWrapper from "../../../components/navbar/NavWrapper";


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
        <div>
          <NavWrapper>
            <input type="string" name="first_name" placeholder="First Name" value={values.first_name} onChange={handleInputChange}/>
            <input type="text" name="last_name" placeholder="Last Name" value={values.last_name} onChange={handleInputChange}/>
            <input type="text" name="username" placeholder="Username" value={values.username} onChange={handleInputChange}/>
            <input   type={isShown ? "text" : "password"} placeholder="Password" name="password"  value={values.password} onChange={handleInputChange}/>
            <label htmlFor="checkbox">Show password?</label>
            <input id="checkbox" type="checkbox" checked={isShown}  onChange={togglePassword}/>
                <br></br>
                <button onClick={AddUser}>Save User</button>
                <button onClick={Cancel}>Cancel</button>
          </NavWrapper>
        </div>
    );
};

export default NewUser;
