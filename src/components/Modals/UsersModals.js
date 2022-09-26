import { ref, deleteObject} from "firebase/storage";
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom'
import './Modals.scss'


import {
  collection,getDoc,
  getDocs,
  deleteDoc,
  doc,addDoc,
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


export function DeleteModal({closeDeleteModal,userId}){

    const handleDelete = async () => {
        try {
          await deleteDoc(doc(db, "Users", userId));
          closeDeleteModal();
          alert("user has been deleted");
        } catch (err) {
          console.log(err);
        }
      };

    return(
        <>
        <div style={OVERLAY_STYLES}/>
        <div style ={MODAL_STYLES}>
      <div class="DeleteModal" id="modalId">
      <div class="firstModal-content">
        <div class="modaltitle">
          <p>Delete</p>
        </div>
        <div class="modaldescription">
          <p>
            Do you want to delete user?
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


  export function CreateUserModal({closeCreateUserModalModal,data}){
    const navigate = useNavigate();

    const AddUser = (e) =>{
        e.preventDefault();

        addDoc(collection(db, "Users"), {
            canEdit:true,
            first_name: data.first_name,
            last_name: data.last_name,
            password: bcrypt.hashSync(data.password,10),
            role:"Staff",
            username: data.username
         })
         .then(() => {
           alert('User Created' );
           closeCreateUserModalModal();
           navigate("/users")
         })
         .catch((error) => {
           alert(error.message);
         });
    }

    return(
        <>
        <div style={OVERLAY_STYLES}/>
        <div style ={MODAL_STYLES}>
      <div class="CreateModal" id="modalId">
      <div class="firstModal-content">
        <div class="modaltitle">
          <p>Create a User</p>
        </div>
        <div class="modaldescription">
          <p>
            Do you want to create user?
          </p>
        </div>
        <div class="deleteAnimalsBtn">
          <button class="deleteAnimalsBtn" onClick={AddUser}>
            Yes
          </button>
          <button class="closeBtn"
          id="closeBtn"
          onClick={closeCreateUserModalModal}>
            No
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
    );
  }


  export function UpdateUserModal({closeUpdateUserModal,data,canEdit,id}){
    
    const navigate = useNavigate();

    const docRef = doc(db,'Users',id);

    //update Database
    function HandleUpdate(e){
        e.preventDefault();
        console.log(canEdit);
        console.log(id);
        updateDoc(docRef,{
            canEdit:canEdit,
            password: String(bcrypt.hashSync(data.password,10))
        } ).then(response => {
          alert("Successfully Updated")
          closeUpdateUserModal();
          navigate("/users");
        }).catch(error =>{
          console.log(error.message)
        })
    }


    return(
        <>
        <div style={OVERLAY_STYLES}/>
        <div style ={MODAL_STYLES}>
      <div class="UpdateModal" id="modalId">
      <div class="firstModal-content">
        <div class="modaltitle">
          <p>Update</p>
        </div>
        <div class="modaldescription">
          <p>
            Do you want to update user?
          </p>
        </div>
        <div class="deleteAnimalsBtn">
          <button class="deleteAnimalsBtn" onClick={HandleUpdate}>
            Yes
          </button>
          <button class="closeBtn"
          id="closeBtn"
          onClick={closeUpdateUserModal}>
            No
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
    );
  }


  