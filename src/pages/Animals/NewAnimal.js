import React, { useState, useEffect } from "react";
import NavWrapper from "../../components/navbar/NavWrapper";
import { db, storage } from "../../services/firebase-config";
import { collection, addDoc,doc,setDoc,updateDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from 'react-router-dom'

const  NewAnimal = () => {

  const [values, setValues] = useState([]);
  const [file, setFile] = useState("");
  const [per, setPerc] = useState(null);
  //Redirecting
  
  const navigate = useNavigate();

  //handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //Add Animal with image
  const AddAnimal = () => {
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
          addDoc(collection(db, "animals"), {
            animal_archive:false,
            animal_name:values.animal_name,
            animal_sciname:values.animal_sciname,
            animal_enclosure:values.animal_enclosure,
            animal_habitat:values.animal_habitat,
            animal_description:values.animal_description,
            animal_conservationstatus:values.animal_conservationstatus,
            animal_behavior:values.animal_behavior,
            animal_diet:values.animal_diet,
            animal_distribution:values.animal_distribution,
            animal_nutrition:values.animal_nutrition,
            animal_imageurl:downloadURL
         })
         .then(() => {
           alert('Animal Added' );
           navigate("/animals")
         })
         .catch((error) => {
           alert(error.message);
         });
          
        });
      }
    );
  };
  

  //cancel Button
  function Cancel(){
    navigate("/animals")
  }



  return (
      <div>
        <NavWrapper>
          <input type="text" name="animal_name" placeholder="Common Name" value={values.animal_name} onChange={handleInputChange}/>
          <input type="text" name="animal_sciname" placeholder="Scientific Name" value={values.animal_sciname} onChange={handleInputChange}/>
          <select name="animal_enclosure" onChange={handleInputChange}>
                    <option value={"Enclosure 1"}>Enclosure 1</option>
                    <option value={"Enclosure 2"}>Enclosure 2</option>
                </select> 
          <input type="text" name="animal_habitat" placeholder="Animal Habitat" value={values.animal_habitat} onChange={handleInputChange}/>
          <input type="text" name="animal_description" placeholder="Description" value={values.animal_description} onChange={handleInputChange}/>
            <br></br>
          <input type="text" name="animal_conservationstatus" placeholder="Conservation Status" value={values.animal_conservationstatus} onChange={handleInputChange}/>
          <input type="text" name="animal_behavior" placeholder="Behavior" value={values.animal_behavior} onChange={handleInputChange}/>
          <input type="text" name="animal_diet" placeholder="Diet" value={values.animal_diet} onChange={handleInputChange}/>
          <input type="text" name="animal_distribution" placeholder="Distribution" value={values.animal_distribution} onChange={handleInputChange}/>
          <input type="text" name="animal_nutrition" placeholder="Nutrition" value={values.animal_nutrition} onChange={handleInputChange}/>
          <br></br>
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
            <input value={file.name} disabled={true}/>
          <br></br>
          <button onClick={AddAnimal}>Submit</button>
          <button onClick={Cancel}>Discard</button>
        </NavWrapper>  
    </div>
  );
};

export default NewAnimal;