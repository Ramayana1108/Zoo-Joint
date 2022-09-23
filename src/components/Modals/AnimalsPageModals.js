import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot, where, query,updateDoc
  } from "firebase/firestore";
  import { db } from "../../services/firebase-config";
  

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


export function ArchiveModal({closeArchiveModal,animalId}){

    const handleArchive= async () => {
        const docRef = doc(db,'animals',animalId);
       
            updateDoc(docRef,{
                animal_archive: true
            } ).then(response => {
                closeArchiveModal();
              alert("Successfully Archived")
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
          <p>Restore</p>
        </div>
        <div class="modaldescription">
          <p>
            Do you want to restore animal?
          </p>
        </div>
        <div class="archiveBtn">
          <button class="archiveBtn" onClick={handleArchive}>
            Yes
          </button>
          <button class="closeBtn"
          id="closeBtn"
          onClick={closeArchiveModal}>
            No
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
    );
  
  }