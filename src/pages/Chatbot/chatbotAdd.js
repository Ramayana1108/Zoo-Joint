import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../services/firebase-config";
import React,{useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import NavWrapper from "../../components/navbar/NavWrapper";
import "./chatbotAdd.scss"
import { NewModal } from "../../components/Modals/ChatbotModal";

const NewQA = () => {
    const [qError, setQError] = useState("");
    const [aError, setAError] = useState("");
    const [values, setValues] = useState([""]);
    const [createQModalOpen, setCreateQModalOpen] = useState(false);

     //Redirecting
     const navigate = useNavigate();

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };

    const AddQA = (e) =>{
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
          setCreateQModalOpen(true);
         
        }     
    }
     //cancel Button
     function Cancel(){
        navigate("/chatbot")
    }
    
    return(
      <NavWrapper>
      <h1 class="chatbot">Add Chatbot Response</h1>
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
            <br></br>
            
            <div className="addChatques-btn-add">
              <button onClick={AddQA} className="btn btn-primary-add">
                Save
              </button>
            
              <button onClick={Cancel} className="btn btn-primary-cancel">
                Cancel
              </button>
      
            </div>
          </div>
        </form>
        {
         createQModalOpen &&(<NewModal closeNewModal={()=>setCreateQModalOpen(false)} question ={values.question} answer={values.answer}/>)
      }
      </div>
      </NavWrapper>
    );
};

export default NewQA;
