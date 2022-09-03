import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../services/firebase-config";
import React,{useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import NavWrapper from "../../components/navbar/NavWrapper";


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
      <div>
        <NavWrapper>
          <div class="container">
            <label><b>Question</b></label>
             <input type="text" name="question" value={values.question} onChange={handleInputChange}></input>
    
             <label><b>Answer</b></label>
              <input  name="answer" value={values.answer} onChange={handleInputChange}></input>
            <br/>
            <button onClick={AddQA}>Save</button>
            <button onClick={Cancel}>Cancel</button>
          </div>
        </NavWrapper>      
      </div>
    );
};

export default NewQA;
