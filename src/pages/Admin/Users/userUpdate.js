import { db } from "../../../services/firebase-config";  
import React,{useState, useEffect} from "react";
import { Link, useLocation, useNavigate,location,state } from 'react-router-dom'
import { collection, query, where,getDocs, doc, getDoc,updateDoc, QuerySnapshot } from "firebase/firestore";
import NavWrapper from "../../../components/navbar/NavWrapper";
import { UpdateUserModal } from "../../../components/Modals/UsersModals";
import validator from 'validator'
import "./userUpdate.scss";


const UserUpdate = () => {
    //Redirecting
    const navigate = useNavigate();

    //getting user
    const getUser = useLocation();
    const uid = getUser.state.userid;
    
    //kuha data from firebase
    const [data, setData] = useState("");
    const [values, setValues] = useState("");
    const [password, setPassword]= useState("");
    const [passError, setPassError] = useState("");
    const [canEdit, setCanEdit] = useState("");
    
    const [updateUserModalOpen, setUpdateUserModalOpen] = useState(false);

    const docRef = doc(db,'Users',uid);
    
    useEffect(() => {
        getDoc(docRef).then(doc => {
            const newData = doc.data();
            setData(newData);
            setValues(newData);
            setCanEdit(String(newData.canEdit));     
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

    const updateUser =(e)=>{
      e.preventDefault();

      if(password !==""){
        if (validator.isStrongPassword(password, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
          setPassError("");
          setUpdateUserModalOpen(true);
          setCanEdit(values.canEdit); 
        } else {
          setPassError('Password must have at least 8 characters, 1 lowercase, 1 upprecase, 1 number and a symbol')
        }

      }else{
      setPassError("");
      setUpdateUserModalOpen(true);
      setCanEdit(values.canEdit); 
      }

      
    }

   
    //cancel Button
    function Cancel(){
        navigate("/users")
    }
    
    return(
        <NavWrapper>
        <h1 class="registerTitle">Edit Admin Staff</h1> 
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
                disabled ={true}
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
                disabled ={true}
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
                disabled ={true}
              />
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type={isShown ? "text" : "password"}
                name="password"
                className="form-control mt-1"
                placeholder="Enter New Password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              {passError}
            </div>

            <div class="right">
            <label htmlFor="checkbox">Show Password?&nbsp;</label>
            <input id="checkbox" type="checkbox" checked={isShown}  onChange={togglePassword}/>
            </div>

            <div className="form-group mt-3">
              <label>Can Edit?</label>
            <select name="canEdit"  id="canEditDropdown" className="form-control mt-1" onChange={handleInputChange} placeholder ={values.canEdit} defaultValue={values.canEdit}>
            <option value="" disabled selected hidden>{values.canEdit=== "true" ? "Yes":"No"}</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
             </select>
            </div>
            <br></br>
            <br></br>
            <div className="edituser-btn-add">
            {/*<div className="login-btn-add">*/}
              <button onClick={updateUser} type="submit" className="btn btn-primary-add">
                Save
              </button>
              
            {/*</div>*/}

            {/*<div className="login-btn-add">*/}
              <button onClick={Cancel} className="btn btn-primary-cancel">
                Cancel
              </button>
              {/*</div>*/}
            </div>
          </div>
        </form>
        {
         updateUserModalOpen &&(<UpdateUserModal closeUpdateUserModal={()=>setUpdateUserModalOpen(false)} password ={password} canEdit={canEdit} id={uid}/>)
      }
      </div>
          </NavWrapper>
    );
};


export default UserUpdate;
