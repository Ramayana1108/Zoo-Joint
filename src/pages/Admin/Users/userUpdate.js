
import { db } from "../../../services/firebase-config";  
import React,{useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { collection, query, where,getDocs, doc, getDoc,updateDoc, QuerySnapshot } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import Dropdown from 'react-bootstrap/Dropdown';
import Sidebar from "../../../components/bars/Sidebar";


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
        <div>
          <Sidebar/>
            <form>
                <h5>first name</h5>
                <input type="string" name="first_name" value={values.first_name} onChange={handleInputChange} />
                <h5>Last name</h5>
                <input type="text" name="last_name" value={values.last_name} onChange={handleInputChange} />
                <h5>Username</h5>
                <input type="text" name="username" value={values.username} onChange={handleInputChange}  />
                <h5>Password</h5>
                <input   type={isShown ? "text" : "password"} name="password" value={values.password} onChange={handleInputChange}/>
                <label htmlFor="checkbox">Show password?</label>
                <input id="checkbox" type="checkbox" checked={isShown}  onChange={togglePassword}/>
                <h5>Can Edit</h5>
                <select name="canEdit" onChange={handleInputChange}>
                    <option value={String(values.canEdit) === "true" ? Boolean(true) : Boolean(false)}>{values.canEdit === "true" ? "Yes" : "No"}</option>
                    <option value={String(values.canEdit) === "true" ? Boolean(false) : Boolean(true)}>{values.canEdit === "true" ? "No" : "Yes"}</option>
                </select>
                <br></br>
                <br></br>           
            </form>
            <button onClick={HandleUpdate}>Save</button> 
            <button onClick={Cancel}>Cancel</button>   
        </div>
    );
};


export default UserUpdate;
