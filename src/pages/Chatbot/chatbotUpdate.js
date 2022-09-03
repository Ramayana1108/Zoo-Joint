
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
      <div>
        <NavWrapper>
          <div class="container">
            <label><b>Question</b></label>
              <input type="text" name="question" value={values.question} onChange={handleInputChange}></input>

            <label><b>Answer</b></label>
              <input  name="answer" value={values.answer} onChange={handleInputChange}></input>
            <br/>
            <button onClick={HandleUpdate}>Save</button>
            <button onClick={Cancel}>Cancel</button>
          </div>
        </NavWrapper>
      </div>
    );
};


export default ChatbotUpdate;
