
import { db } from "../../../services/firebase-config";  
import React,{useState, useEffect} from "react";
import { Link, useLocation, useNavigate,location,state } from 'react-router-dom'
import { collection, query, where,getDocs, doc, getDoc,updateDoc, QuerySnapshot } from "firebase/firestore";
import NavWrapper from "../../../components/navbar/NavWrapper";


const UserUpdate = () => {
    //Redirecting
    const navigate = useNavigate();

    //getting user
    const getUser = useLocation();
    const uid = getUser.state.userid;

    //kuha data from firebase
    const [data, setData] = useState("");
    const [values, setValues] = useState("");

    const docRef = doc(db,'Users',uid);
    
    useEffect(() => {
        getDoc(docRef).then(doc => {
            const newData = doc.data();
            setData(newData);
            setValues(newData);            
        });
        }, []);
        
    //handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };


     //show password toggle
     const [isShown, setIsSHown] = useState(false);
     const togglePassword = () => {
         setIsSHown((isShown) => !isShown);
       };

    //update Database
    function HandleUpdate(e){
        e.preventDefault();
        updateDoc(docRef,{
            canEdit:values.canEdit,
            first_name: String(values.first_name),
            last_name: String(values.last_name),
            password: String(values.password),
            username: String(values.username)
        } ).then(response => {
          alert("Successfully Updated")
          navigate("/users");
        }).catch(error =>{
          console.log(error.message)
        })
    }

    //cancel Button
    function Cancel(){
        navigate("/users")
    }
    
    return(
        <NavWrapper>
        <h1>Edit Admin Staff</h1> 
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
            
            <label>&nbsp;&nbsp;Can Edit?&nbsp;&nbsp;</label>
            <select name="canEdit" onChange={handleInputChange}>

            <option value={String(values.canEdit) === "true" ? Boolean(true) : Boolean(false)}>{values.canEdit === "true" ? "Yes" : "No"}</option>
            <option value={String(values.canEdit) === "true" ? Boolean(false) : Boolean(true)}>{values.canEdit === "true" ? "No" : "Yes"}</option>
             </select>
            </div>
            
            <div className="login-btn-add">
              <button onClick={HandleUpdate} type="submit" className="btn btn-primary-add">
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


export default UserUpdate;
