import { db, storage  } from "../../services/firebase-config";
import React,{useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { collection, query, where,setDoc, doc, getDoc,updateDoc, QuerySnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import 'firebase/firestore';
import NavWrapper from "../../components/navbar/NavWrapper";
import "./UpdateAboutus.scss";
import { UploadFile } from "@mui/icons-material";

const AboutUsUpdate = () => {

    //Redirecting
    const navigate = useNavigate();

    //getting user
    const getabtid = useLocation();
    const abtid = "abt_id"

    //kuha data from firebase
    const [file, setFile] = useState("");
    const [data, setData] = useState("");
    const [per, setPerc] = useState(null);
    const [values, setValues] = useState("");

    const docRef = doc(db,'aboutus',abtid);
    
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

       //Updating animal
  const UpdateAboutus = (e) => {
    e.preventDefault();
    const imagename = (file.name === undefined || file.name == null || file.name <= 0) ? true : false;
    console.log(imagename)
    const storageRef = ref(storage, 'images/'+file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(imagename)
 
    // Create a reference to the file to delete
 
    const desertimageRef = ref(storage, data.abt_image);

    if(imagename === false){
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               console.log(data.abt_image)
              // Delete the file
              updateDoc(docRef, {
                abt_image:downloadURL
             }).then(() => {                
               deleteObject(desertimageRef)                                
               }).catch((error) => {
             // Uh-oh, an error occurred!
             });
            });
      });
    }else{
      uploadTask.cancel()
    }
   
    updateDoc(docRef,{
      abt_email: String(values.abt_email),
      abt_website: String(values.abt_website),
      abt_description: String(values.abt_description),
      abt_address: String(values.abt_address),
    }).then(response => {
      alert("Successfully Updated")
      navigate("/aboutus");
    })
      .catch((error) => {
      alert(error.message);
      });
          
   
  };

    //cancel Button
    function Cancel(){
            navigate("/aboutus")
        }
         
    return(
      <div>
      <NavWrapper>
      <h1>Edit About Us Page</h1>
      <div className="Auth-form-container-about">
      <form className="Auth-form-about">
        <div className="Auth-form-content-about">
          <div class="center">
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="text"
              name="abt_name"
              className="form-control mt-1"
              value={values.abt_email} 
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group mt-3">
            <label>Website</label>
            <input
              type="text"
              name="abt_website"
              className="form-control mt-1"
              placeholder="Enter Last Name"
              value={values.abt_website} 
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group mt-3">
            <label>Description</label>
            <textarea
              type="text"
              name="abt_description"
              className="form-control mt-1"
              value={values.abt_description} 
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group mt-3">
            <label>Address</label>
            <textarea
              type="text"
              name="abt_address"
              className="form-control mt-1"
              value={values.abt_address} 
              onChange={handleInputChange}
            />
          </div>
          <br></br>

          <div class="right">         
          <label htmlFor="file">Upload Image: &nbsp;</label>
          <input
              type="file"
              name="abt_image"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}  
            />             
         {!per? "":per+"%"}      
          </div>
          <br></br>
          
          <div className="login-btn-about">
            <button onClick={UpdateAboutus} className="btn btn-primary-about">
              Save
            </button>
            
          </div>

          <div className="login-btn-about">
            <button onClick={Cancel} className="btn btn-primary-aboutcancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
      </NavWrapper>
    </div>
    );
};


export default AboutUsUpdate;
