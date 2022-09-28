import {
    collection,
    getDocs,
    deleteDoc,
    addDoc,
    doc,
    onSnapshot, where, query,updateDoc
  } from "firebase/firestore";
  import { db } from "../../services/firebase-config";
  import {  useNavigate } from 'react-router-dom'
  

const MODAL_STYLES ={
    position :'fixed',
    top:'50%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    backgroundColor:'#FFF',
    zIndex:1000
}
const OVERLAY_STYLES = {
    positon: 'fixed',
    top :0,
    left : 0,
    right :0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex:1000
}


export function NewModal({closeNewModal,question,answer}){
    const navigate = useNavigate();
    const handleAdd= async () => {  
        addDoc(collection(db, "chatbot"), {
            question: question,
            answer: answer,
           
         })
         .then(() => {
           alert('Success' );
           navigate("/chatbot")
         })
         .catch((error) => {
           alert(error.message);
         });
      };

    return(
        <>
        <div style={OVERLAY_STYLES}/>
        <div style ={MODAL_STYLES}>
      <div class="ArchiveModal" id="modalId">
      <div class="firstModal-content">
        <div class="modaltitle">
          <p>New Query</p>
        </div>
        <div class="modaldescription">
          <p>
            Do you want to add new query?
          </p>
        </div>
        <div class="archiveBtn">
          <button class="archiveBtn" onClick={handleAdd}>
            Yes
          </button>
          <button class="closeBtn"
          id="closeBtn"
          onClick={closeNewModal}>
            No
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
    );
  
  }

  export function UpdateModal({closeUpdateModal,question,answer ,questionid}){
    const navigate = useNavigate();
    const docRef = doc(db,'chatbot',questionid);
    const handleUpdate= async () => {  
        updateDoc(docRef,{
            question: String(question),
            answer: String(answer),
           
        } ).then(response => {
          alert("Successfully Updated")
          navigate("/chatbot");
        }).catch(error =>{
          console.log(error.message)
        })
      };

    return(
        <>
        <div style={OVERLAY_STYLES}/>
        <div style ={MODAL_STYLES}>
      <div class="ArchiveModal" id="modalId">
      <div class="firstModal-content">
        <div class="modaltitle">
          <p>Update Query</p>
        </div>
        <div class="modaldescription">
          <p>
            Do you want to update query?
          </p>
        </div>
        <div class="archiveBtn">
          <button class="archiveBtn" onClick={handleUpdate}>
            Yes
          </button>
          <button class="closeBtn"
          id="closeBtn"
          onClick={closeUpdateModal}>
            No
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
    );
  
  }