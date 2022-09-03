import { db, storage  } from "../../services/firebase-config";
import React,{useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { collection, query, where,getDocs, doc, getDoc,updateDoc, QuerySnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL,getStorage,deleteObject  } from "firebase/storage";
import 'firebase/firestore';
import NavWrapper from "../../components/navbar/NavWrapper";


const  UpdateAnimal = () => {
 
  const [values, setValues] = useState([]);
  const [data, setData] = useState({});
  const [file, setFile] = useState("");
  const [per, setPerc] = useState(null);

  //getting animal
  const getaid = useLocation();
  const aid = getaid.state.aid;

  const docRef = doc(db,'animals',aid);
  //getting values
  useEffect(() => {
    getDoc(docRef).then(doc => {
        const newData = doc.data();
        setData(newData);
        setValues(newData);            
    });
    }, []);

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
  const UpdateAnimal = () => {
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
          const storage = getStorage();

          // Create a reference to the file to delete
          const desertRef = ref(storage, data.animal_imageurl);

          // Delete the file
          deleteObject(desertRef).then(() => {
          // File deleted successfully
          }).catch((error) => {
          // Uh-oh, an error occurred!
          });

          updateDoc(docRef, {
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
           alert('Updated' );
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
          <button onClick={UpdateAnimal}>Submit</button>
          <button onClick={Cancel}>Discard</button>
        </NavWrapper>  
    </div>
  );
};

export default UpdateAnimal;