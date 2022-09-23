import { ref, deleteObject} from "firebase/storage";
import { getDoc } from "firebase/firestore";



import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot, where, query,updateDoc
} from "firebase/firestore";
import { db, storage } from "../../services/firebase-config";


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
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex:1000
}


const getPathStorageFromUrl=(url)=>{

    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/manilazooproject.appspot.com/o/";
  
     url = url.replace(baseUrl,""); 
  
    let index = url.indexOf("?")
  
    url = url.substring(0,index);
    
    url = url.replace("%2F","/");
  
    return url;
  }
  


export function RestoreModal({closeRestoreModal,animalId}){

    const handleRestore= async () => {
        const docRef = doc(db,'animals',animalId);
       
            updateDoc(docRef,{
                animal_archive: false
            } ).then(response => {
              alert("Animal Restored")
              closeRestoreModal();
            }).catch(error =>{
              console.log(error.message)
            })
      };

    return(
        <>
        <div style={OVERLAY_STYLES}/>
        <div style ={MODAL_STYLES}>
      <div class="RestoreModal" id="modalId">
      <div class="firstModal-content">
        <div class="modaltitle">
          <p>Restore</p>
        </div>
        <div class="modaldescription">
          <p>
            Do you want to restore animal?
          </p>
        </div>
        <div class="seeAnimalsBtnDiv">
          <button class="seeAnimalsBtn" onClick={handleRestore}>
            Yes
          </button>
          <button class="closeBtn"
          id="closeBtn"
          onClick={closeRestoreModal}>
            No
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
    );
  
  }


  export function DeleteModal({closeDeleteModal,animalId}){

    const handleDelete = async () => {
        const docRef = doc(db,'animals',animalId);
          
        getDoc(docRef).then(doc => {
          const newData = doc.data();      
          const image_url = ref(storage,getPathStorageFromUrl(newData.animal_imageurl));
          const sound_url = ref(storage,getPathStorageFromUrl(newData.animal_sound));
            deleteObject(image_url)   
          
          if(!sound_url){
            deleteObject(sound_url)  
          }
          
        }).then(()=>{        
            deleteDoc(doc(db,"animals/"+animalId+"/animal_quiz/quiz2"));
            deleteDoc(doc(db,"animals/"+animalId+"/animal_quiz/quiz3"));
            deleteDoc(doc(db,"animals",animalId));          
        }).then(()=>{
          closeDeleteModal();
          alert("Animal Deleted")
        });
      };

    return(
        <>
        <div style={OVERLAY_STYLES}/>
        <div style ={MODAL_STYLES}>
      <div class="DeleteModal" id="modalId">
      <div class="firstModal-content">
        <div class="modaltitle">
          <p>Restore</p>
        </div>
        <div class="modaldescription">
          <p>
            Do you want to delete animal?
          </p>
        </div>
        <div class="deleteAnimalsBtn">
          <button class="deleteAnimalsBtn" onClick={handleDelete}>
            Yes
          </button>
          <button class="closeBtn"
          id="closeBtn"
          onClick={closeDeleteModal}>
            No
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
    );
  
  }