
import { db, storage  } from "../../services/firebase-config";
import React,{useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { collection, query, where,getDocs, doc, getDoc,updateDoc, QuerySnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import 'firebase/firestore';
import NavWrapper from "../../components/navbar/NavWrapper";


const AboutUsUpdate = () => {


    //Redirecting
    const navigate = useNavigate();

    //getting user
    const getabtid = useLocation();
    const abtid = getabtid.state.abtid;

    //kuha data from firebase
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
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

    //uploading image

        const uploadFile = () => {
          const name = new Date().getTime() + file.name;
    
          console.log(name);
          const storageRef = ref(storage, file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);
    
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              setPerc(progress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                //setValues((prev) => ({ ...prev, abt_img: downloadURL }));
                updateDoc(docRef,{
                  abt_email: String(values.abt_email),
                  abt_website: String(values.abt_website),
                  abt_description: String(values.abt_description),
                  abt_address: String(values.abt_address),
                  abt_image: String(downloadURL)
                    
              } ).then(response => {
                alert("Successfully Updated")
                navigate("/aboutus");
              }).catch(error =>{
                console.log(error.message)
              })
         
              });
            }
          );
        };

  
    //update Database
    function HandleUpdate(e){
        e.preventDefault();

        uploadFile();
          console.log(values.abt_image);
    //    updateDoc(docRef,{
    //         abt_email: String(values.abt_email),
    //        abt_website: String(values.abt_website),
    //         abt_description: String(values.abt_description),
    //         abt_address: String(values.abt_address),
    //         abt_image: String(values.abt_image)
            
           
    //     } ).then(response => {
    //       alert("Successfully Updated")
    //       navigate("/aboutus");
    //     }).catch(error =>{
    //       console.log(error.message)
    //     })
    };

    //cancel Button
    function Cancel(){
            navigate("/aboutus")
        }
         
    return(
      <div>
        <NavWrapper>
          <div class="container">
            <label><b>Email</b></label>
              <input type="text" name="abt_name" value={values.abt_email} onChange={handleInputChange}></input>
            <label><b>Website</b></label>
              <input type="text" name="abt_website" value={values.abt_website} onChange={handleInputChange}></input>

            <label><b>Description</b></label>
              <textarea  name="abt_description" value={values.abt_description} onChange={handleInputChange}></textarea>
            <label><b>Address</b></label>
              <textarea  name="abt_address" value={values.abt_address} onChange={handleInputChange}></textarea>
            <br/>
            <button>
              <label htmlFor="file">
                Upload Image
              </label>
              <input
                type="file"
                name="abt_image"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </button>
                
          
            <button onClick={HandleUpdate}>Save</button>
            <button onClick={Cancel}>Cancel</button>
          </div>
        </NavWrapper>
      </div>
    );
};


export default AboutUsUpdate;
