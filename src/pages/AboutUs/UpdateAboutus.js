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
    const [emailError, setEmailError] =useState("");
    const [websiteError, setWebsiteError] =useState("");
    const [descriptionError, setDescriptionError] =useState("");
    const [addressError, setAddressError] =useState("");
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
    if(!values.abt_email && !values.abt_website && !values.abt_address && !values.abt_description){
      setEmailError("Please fill out this field.")
      setWebsiteError("Please fill out this field.")
      setAddressError("Please fill out this field.")
      setDescriptionError("Please fill out this field.")
    }else if (values.abt_email !=="" && !values.abt_website && !values.abt_address && !values.abt_description){
      setEmailError("")
      setWebsiteError("Please fill out this field.")
      setAddressError("Please fill out this field.")
      setDescriptionError("Please fill out this field.")
    }else if (!values.abt_email  && values.abt_website!=="" && !values.abt_address && !values.abt_description){
      setEmailError("Please fill out this field.")
      setWebsiteError("")
      setAddressError("Please fill out this field.")
      setDescriptionError("Please fill out this field.")
    }else if (!values.abt_email  && !values.abt_website && values.abt_address!=="" && !values.abt_description){
      setEmailError("Please fill out this field.")
      setWebsiteError("Please fill out this field.")
      setAddressError("")
      setDescriptionError("Please fill out this field.")
    }else if (!values.abt_email  && !values.abt_website && !values.abt_address && values.abt_description!==""){
      setEmailError("Please fill out this field.")
      setWebsiteError("Please fill out this field.")
      setAddressError("Please fill out this field.")
      setDescriptionError("")
    }else if (values.abt_email !=="" && values.abt_website !=="" && !values.abt_address && !values.abt_description){
      setEmailError("")
      setWebsiteError("")
      setAddressError("Please fill out this field.")
      setDescriptionError("Please fill out this field.")
    }else if (values.abt_email !=="" && !values.abt_website  && values.abt_address!=="" && !values.abt_description){
      setEmailError("")
      setWebsiteError("Please fill out this field.")
      setAddressError("")
      setDescriptionError("Please fill out this field.")
    }else if (values.abt_email !=="" && !values.abt_website  && !values.abt_address && values.abt_description ){
      setEmailError("")
      setWebsiteError("Please fill out this field.")
      setAddressError("Please fill out this field.")
      setDescriptionError("")
    }else if (values.abt_email !=="" && values.abt_website !=="" && values.abt_address !=="" && !values.abt_description ){
      setEmailError("")
      setWebsiteError("")
      setAddressError("")
      setDescriptionError("Please fill out this field.")
    }else if (values.abt_email !=="" && values.abt_website !=="" && !values.abt_address  && values.abt_description !=="" ){
      setEmailError("")
      setWebsiteError("")
      setAddressError("Please fill out this field.")
      setDescriptionError("")
    }else if (values.abt_email !=="" && !values.abt_website  && values.abt_address!==""  && values.abt_description !=="" ){
      setEmailError("")
      setWebsiteError("Please fill out this field.")
      setAddressError("")
      setDescriptionError("")
    }else if (!values.abt_email  && values.abt_website!==""  && values.abt_address  && values.abt_description !=="" ){
      setEmailError("Please fill out this field.")
      setWebsiteError("")
      setAddressError("")
      setDescriptionError("")
    }else{
      setEmailError("")
      setWebsiteError("")
      setAddressError("")
      setDescriptionError("")

      if(window.confirm("Do you want to save changes?")){
        const imagename = (file.name === undefined || file.name == null || file.name <= 0) ? true : false;

        const storageRef = ref(storage, 'images/'+file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
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
                  const desertimageRef = ref(storage, data.abt_image);
                  deleteObject(desertimageRef)    
                  updateDoc(docRef, {
                    abt_image:downloadURL
                 }).then(() => {  
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
                                               
                   }).catch((error) => {
                 // Uh-oh, an error occurred!
                 });
                });
          });
        }else{
          uploadTask.cancel();
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
        }
      }
      


    }
    
   
   
  };

    //cancel Button
    function Cancel(){
            navigate("/aboutus")
        }
         
    return(
      
      <NavWrapper>
      <h1 class="registerTitle">Edit About Us Page</h1>
      <div className="Auth-form-container-add">
        <form className="Auth-form-about">
          <div className="Auth-form-content-add">
          <div class="center">
          </div>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="text"
              name="abt_email"
              placeholder="Enter Email"
              className={`form-control mt-1  ${emailError ? 'is-invalid':  ''}`}
              value={values.abt_email} 
              onChange={handleInputChange}
            />
             <div className="error-text">{emailError}</div>
          </div>

          <div className="form-group mt-3">
            <label>Website</label>
            <input
              type="text"
              name="abt_website"
              className={`form-control mt-1  ${websiteError ? 'is-invalid':  ''}`}
              placeholder="Enter Website"
              value={values.abt_website} 
              onChange={handleInputChange}
            />
            <div className="error-text">{websiteError}</div>
          </div>

          <div className="form-group mt-3">
            <label>Description</label>
            <textarea
              type="text"
              name="abt_description"
              placeholder="Enter Description"
              className= {`form-control mt-1 textareas-desc ${descriptionError ? 'is-invalid':  ''}`}
              value={values.abt_description} 
              onChange={handleInputChange}
            />
            <div className="error-text">{descriptionError}</div>
          </div>

          <div className="form-group mt-3">
            <label>Address</label>
            <textarea
              type="text"
              name="abt_address"
              placeholder="Enter Address"
              className={`form-control mt-1 textareas-address ${addressError ? 'is-invalid':  ''}`}
              value={values.abt_address} 
              onChange={handleInputChange}
            />
            <div className="error-text">{addressError}</div>
          </div>
          <br></br>
         
          <label htmlFor="file">Upload Image: &nbsp;</label>
          <input
              type="file"
              name="abt_image"
              className={`form-control mt-1`}
              accept="image/png, image/jpeg, image/jpg"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}  
            />             
         {!per? "":per+"%"}      
          <br></br>
          <br></br><br></br>
          <div className="editaboutus-btn-add">
            <button onClick={UpdateAboutus} className="btn btn-primary-add">
              Save
            </button>
            
            <button onClick={(e)=>{e.preventDefault(); if(window.confirm("Are you sure you want to cancel?")){Cancel()}}} className="btn btn-primary-cancel">
              Cancel
            </button>
          </div>
          </div>
          </form>
          </div>
          </NavWrapper>
          
          );
          };


export default AboutUsUpdate;
