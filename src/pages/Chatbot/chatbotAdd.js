import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../services/firebase-config";
import React,{useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import NavWrapper from "../../components/navbar/NavWrapper";
import "./chatbotAdd.scss"

const NewQA = () => {
    const [isShown, setIsSHown] = useState(false);
    const [values, setValues] = useState([""]);

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

        addDoc(collection(db, "chatbot"), {
            question: values.question,
            answer: values.answer,
           
         })
         .then(() => {
           alert('Success' );
           navigate("/chatbot")
         })
         .catch((error) => {
           alert(error.message);
         });

         
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
            <br></br>
            
            <div className="addChatques-btn-add">
            {/*<div className="login-btn-chatadd">*/}
              <button onClick={AddQA} className="btn btn-primary-add">
                Save
              </button>
            {/*</div>*/}

            {/*<div className="login-btn-chatadd">*/}
              <button onClick={Cancel} className="btn btn-primary-cancel">
                Cancel
              </button>
           {/* </div>*/}
            </div>
          </div>
        </form>
      </div>
      </NavWrapper>
    );
};

export default NewQA;
