
import { db } from "../../services/firebase-config";
import React,{useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { collection, query, where,getDocs, doc, getDoc,updateDoc, QuerySnapshot } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import NavWrapper from "../../components/navbar/NavWrapper";
import { UpdateModal } from "../../components/Modals/ChatbotModal";
import "./chatbotAdd.scss"

const ChatbotUpdate = () => {
    //Redirecting
    const navigate = useNavigate();

    //getting user
    const getquid = useLocation();
    const qid = getquid.state.qid;

    //kuha data from firebase
    const [data, setData] = useState("");
    const [values, setValues] = useState("");
    const [updateQModalOpen, setUpdateQModalOpen] = useState(false);

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
        
        
        if (!values.question && !values.answer ){
          setQError("Please fill out this field.");
          setAError("Please fill out this field.");
        }else if(values.question !=="" && !values.answer ){
          setQError("");
          setAError("Please fill out this field.");
        }else if(!values.question  && values.answer !=="" ){
          setQError("Please fill out this field.");
          setAError("");
        }else{
          setQError("");
          setAError("");
          setUpdateQModalOpen(true);
         
        }     
    }

    //cancel Button
    function Cancel(){
        navigate("/chatbot")
    }
    
    return(
      <NavWrapper>
      <h1 class="chatbot">Edit Chatbot Response</h1>
      <div className="Auth-form-container-chatadd">
        <form className="Auth-form-chatadd">
          <div className="Auth-form-content-chatadd">
            <div class="center">
            </div>
            
            <div className="form-group mt-3">
              <label>Question</label>
              <input
                type="text"
                className={`form-control mt-1 ${qError ? 'is-invalid':  ''}`}
                placeholder="Enter question"
                name="question" 
                value={values.question} 
                onChange={handleInputChange}
              />
               <div className="error-text">{qError}</div>
            </div>

            <div className="form-group mt-3">
              <label>Answer</label>
              <input
                type="answer"
                className={`form-control mt-1 ${aError ? 'is-invalid':  ''}`}
                placeholder="Enter answer"
                name="answer" 
                value={values.answer} 
                onChange={handleInputChange}
              />
              <div className="error-text">{aError}</div>
            </div>
            <br></br>
            <div className="addChatques-btn-add">
            {/*<div className="login-btn-chatadd">*/}
              <button onClick={HandleUpdate} className="btn btn-primary-add">
                Save
              </button>
            {/*</div>*/}

            {/*<div className="login-btn-chatadd">*/}
              <button onClick={Cancel} className="btn btn-primary-cancel">
                Cancel
              </button>
            {/*</div>*/}
            </div>
          </div>
        </form>
        {
        updateQModalOpen &&(<UpdateModal closeUpdateModal={()=>setUpdateQModalOpen(false)} question ={values.question} answer={values.answer} questionid={qid}/>)
      }
      </div>
      </NavWrapper>
    );
};


export default ChatbotUpdate;
