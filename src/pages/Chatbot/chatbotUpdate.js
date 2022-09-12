
import { db } from "../../services/firebase-config";
import React,{useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { collection, query, where,getDocs, doc, getDoc,updateDoc, QuerySnapshot } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import NavWrapper from "../../components/navbar/NavWrapper";


const ChatbotUpdate = () => {
    //Redirecting
    const navigate = useNavigate();

    //getting user
    const getquid = useLocation();
    const qid = getquid.state.qid;

    //kuha data from firebase
    const [data, setData] = useState("");
    const [values, setValues] = useState("");

    const docRef = doc(db,'chatbot',qid);
    
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

    //update Database
    function HandleUpdate(e){
        e.preventDefault();
        updateDoc(docRef,{
            question: String(values.question),
            answer: String(values.answer),
           
        } ).then(response => {
          alert("Successfully Updated")
          navigate("/chatbot");
        }).catch(error =>{
          console.log(error.message)
        })
    }

    //cancel Button
    function Cancel(){
        navigate("/chatbot")
    }
    
    return(
      <NavWrapper>
      <h1>Edit Chatbot Response</h1>
      <div className="Auth-form-container-chatadd">
        <form className="Auth-form-chatadd">
          <div className="Auth-form-content-chatadd">
            <div class="center">
            </div>
            
            <div className="form-group mt-3">
              <label>Question</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter question"
                name="question" 
                value={values.question} 
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3">
              <label>Answer</label>
              <input
                type="answer"
                className="form-control mt-1"
                placeholder="Enter answer"
                name="answer" 
                value={values.answer} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="login-btn-chatadd">
              <button onClick={HandleUpdate} className="btn btn-primary-add">
                Save
              </button>
            </div>

            <div className="login-btn-chatadd">
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


export default ChatbotUpdate;
