import { db, storage  } from "../../services/firebase-config";
import React,{useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { collection, query, where,getDocs, doc, getDoc,updateDoc, QuerySnapshot,onSnapshot, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL,getStorage,deleteObject  } from "firebase/storage";
import 'firebase/firestore';
import NavWrapper from "../../components/navbar/NavWrapper";


const  UpdateAnimal = () => {
 
  const [values, setValues] = useState([]);
  const [quiz1, setQuiz1]= useState([]);
  const [quiz2, setQuiz2]= useState([]);
  const [quiz3, setQuiz3]= useState([]);

  const [data, setData] = useState({});


  const [file, setFile] = useState("");
  const [sound, setSound] = useState("");
  const [per, setPerc] = useState(null);
  const [per2, setPerc2] = useState(null);

  //getting animal
  const getaid = useLocation();
  const aid = getaid.state.aid;

  const docRef = doc(db,'animals',aid);
  const subdocRef = collection(db,'animals',aid,"animal_quiz");


  //getting values
  useEffect(() => {
    getDoc(docRef).then(doc => {
        const newData = doc.data();
        setData(newData);
        setValues(newData);            
    })
    }, []);

    //getting quiz
    useEffect(() => {
      const unsub = onSnapshot(       
        subdocRef,
        (snapShot) => {

          snapShot.docs.forEach((doc) => {
                if(doc.id === "quiz1"){
                  setQuiz1({ id: doc.id, ...doc.data() });
                }if(doc.id === "quiz2"){
                  setQuiz2({ id: doc.id, ...doc.data() });
                }else{
                  setQuiz3({ id: doc.id, ...doc.data() });
                }
                            
              });           
        },
        (error) => {
          console.log(error);
        }
      );
      return () => {
        unsub();
      };
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
    const handleInputChangeQuiz1 = (e) => {
    const { name, value } = e.target;
    setQuiz1({
      ...quiz1,
      [name]: value,
    });
  };
  const handleInputChangeQuiz2 = (e) => {
    const { name, value } = e.target;
    setQuiz2({
      ...quiz2,
      [name]: value,
    });
  };
  const handleInputChangeQuiz3 = (e) => {
    const { name, value } = e.target;
    setQuiz3({
      ...quiz3,
      [name]: value,
    });
  };

  //Updating animal
  const UpdateAnimal = () => {
    const name = new Date().getTime() + file.name;
    const name2 = new Date().getTime() + sound.name;

    //checking if there is an image to upload
    if(file.name === null){

      if(sound.name === null){

        //updating document
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
        })
        .then(() => {
          const q1Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz1");
            setDoc(q1Ref,{
              question: String(quiz1.question),
              choicea: String(quiz1.choicea),
              choiceb: String(quiz1.choiceb),
              choicec: String(quiz1.choicec),
              answer: String(quiz1.answer),
              explanation: String(quiz1.explanation)
            }).then(() => {
              //quiz2
              const q2Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz2");
              setDoc(q2Ref,{
                question: String(quiz2.question),
                choicea: String(quiz2.choicea),
                choiceb: String(quiz2.choiceb),
                choicec: String(quiz2.choicec),
                answer: String(quiz2.answer),
                explanation: String(quiz2.explanation)
              }).then(() => {
                //quiz3
                const q3Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz3");
                setDoc(q3Ref,{
                  question: String(quiz3.question),
                  choicea: String(quiz3.choicea),
                  choiceb: String(quiz3.choiceb),
                  choicec: String(quiz3.choicec),
                  answer: String(quiz3.answer),
                  explanation: String(quiz3.explanation)
                }).then(() => {

                  alert('Animal Updated' );
                  navigate("/animals")
          
                })
                .catch((error) => {
                alert(error.message);
                });

                //end of 3rd quiz
 	            
          
              })
              .catch((error) => {
                alert(error.message);
              });

            //end of 2nd quiz     
 	            
          
            })
            .catch((error) => {
              alert(error.message);
            });

          //end of first quiz
        
          // alert('Updated' );
          // navigate("/animals")
        })
        .catch((error) => {
        alert(error.message);
        });

      }else{
        const storageRef2 = ref(storage, sound.name);
        const uploadTask2 = uploadBytesResumable(storageRef2, sound);

        uploadTask2.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPerc2(progress);
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
            getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {                     
              updateDoc(docRef, {
                animal_sound:downloadURL
             })
             .then(() => {
                //updating document
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
          })
          .then(() => {
            const q1Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz1");
            setDoc(q1Ref,{
              question: String(quiz1.question),
              choicea: String(quiz1.choicea),
              choiceb: String(quiz1.choiceb),
              choicec: String(quiz1.choicec),
              answer: String(quiz1.answer),
              explanation: String(quiz1.explanation)
            }).then(() => {
              //quiz2
              const q2Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz2");
              setDoc(q2Ref,{
                question: String(quiz2.question),
                choicea: String(quiz2.choicea),
                choiceb: String(quiz2.choiceb),
                choicec: String(quiz2.choicec),
                answer: String(quiz2.answer),
                explanation: String(quiz2.explanation)
              }).then(() => {
                //quiz3
                const q3Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz3");
                setDoc(q3Ref,{
                  question: String(quiz3.question),
                  choicea: String(quiz3.choicea),
                  choiceb: String(quiz3.choiceb),
                  choicec: String(quiz3.choicec),
                  answer: String(quiz3.answer),
                  explanation: String(quiz3.explanation)
                }).then(() => {

                   // Create a reference to the file to delete
                  const desertRef = ref(storage, data.animal_sound);
                  // Delete the file
                  deleteObject(desertRef).then(() => {
                    alert('Animal Updated' );
                    navigate("/animals")
                  }).catch((error) => {
                // Uh-oh, an error occurred!
                }); 

                  
          
                })
                .catch((error) => {
                alert(error.message);
                });

                //end of 3rd quiz
 	            
          
              })
              .catch((error) => {
                alert(error.message);
              });

            //end of 2nd quiz     
 	            
          
            })
            .catch((error) => {
              alert(error.message);
            });

          //end of first quiz
  
          
            // alert('Updated' );
            // navigate("/animals")
          })
          .catch((error) => {
          alert(error.message);
          });
             })
             .catch((error) => {
               alert(error.message);
             });
            });
          }
        );

      }
      
    }else{
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
                   
            updateDoc(docRef, {
              animal_imageurl:downloadURL
           })
           .then(() => {
            if(sound.name === null){

              //updating document
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
              })
              .then(() => {
                const q1Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz1");
                setDoc(q1Ref,{
                  question: String(quiz1.question),
                  choicea: String(quiz1.choicea),
                  choiceb: String(quiz1.choiceb),
                  choicec: String(quiz1.choicec),
                  answer: String(quiz1.answer),
                  explanation: String(quiz1.explanation)
                }).then(() => {
                  //quiz2
                  const q2Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz2");
                  setDoc(q2Ref,{
                    question: String(quiz2.question),
                    choicea: String(quiz2.choicea),
                    choiceb: String(quiz2.choiceb),
                    choicec: String(quiz2.choicec),
                    answer: String(quiz2.answer),
                    explanation: String(quiz2.explanation)
                  }).then(() => {
                    //quiz3
                    const q3Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz3");
                    setDoc(q3Ref,{
                      question: String(quiz3.question),
                      choicea: String(quiz3.choicea),
                      choiceb: String(quiz3.choiceb),
                      choicec: String(quiz3.choicec),
                      answer: String(quiz3.answer),
                      explanation: String(quiz3.explanation)
                    }).then(() => {

                       // Create a reference to the file to delete
                        const desertRef = ref(storage, data.animal_imageurl);
                       // Delete the file
                        deleteObject(desertRef).then(() => {
                          alert('Animal Updated' );
                          navigate("/animals")                  
                        }).catch((error) => {
                      // Uh-oh, an error occurred!
                      }); 
    
                     
                    })
                    .catch((error) => {
                    alert(error.message);
                    });
    
                    //end of 3rd quiz
                   
              
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
    
                //end of 2nd quiz     
                   
              
                })
                .catch((error) => {
                  alert(error.message);
                });
    
              //end of first quiz
              
                // alert('Updated' );
                // navigate("/animals")
              })
              .catch((error) => {
              alert(error.message);
              });
      
            }else{

              const storageRef2 = ref(storage, sound.name);
              const uploadTask2 = uploadBytesResumable(storageRef2, sound);
      
              uploadTask2.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  setPerc2(progress);
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
                  getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
                  
                            
                    updateDoc(docRef, {
                      animal_sound:downloadURL
                   })
                   .then(() => {
                      //updating document
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
                })
                .then(() => {
                  const q1Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz1");
                  setDoc(q1Ref,{
                    question: String(quiz1.question),
                    choicea: String(quiz1.choicea),
                    choiceb: String(quiz1.choiceb),
                    choicec: String(quiz1.choicec),
                    answer: String(quiz1.answer),
                    explanation: String(quiz1.explanation)
                  }).then(() => {
                    //quiz2
                    const q2Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz2");
                    setDoc(q2Ref,{
                      question: String(quiz2.question),
                      choicea: String(quiz2.choicea),
                      choiceb: String(quiz2.choiceb),
                      choicec: String(quiz2.choicec),
                      answer: String(quiz2.answer),
                      explanation: String(quiz2.explanation)
                    }).then(() => {
                      //quiz3
                      const q3Ref = doc(db, "animals", values.animal_name,"animal_quiz","quiz3");
                      setDoc(q3Ref,{
                        question: String(quiz3.question),
                        choicea: String(quiz3.choicea),
                        choiceb: String(quiz3.choiceb),
                        choicec: String(quiz3.choicec),
                        answer: String(quiz3.answer),
                        explanation: String(quiz3.explanation)
                      }).then(() => {
                           // Create a reference to the file to delete
                            const desertRef = ref(storage, data.animal_sound);
                          // Delete the file
                            deleteObject(desertRef).then(() => {
                              alert('Animal Updated' );
                              navigate("/animals")
                            }).catch((error) => {
                          // Uh-oh, an error occurred!
                            }); 
                
                      })
                      .catch((error) => {
                      alert(error.message);
                      });
      
                      //end of 3rd quiz
                     
                
                    })
                    .catch((error) => {
                      alert(error.message);
                    });
      
                  //end of 2nd quiz     
                     
                
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
      
                //end of first quiz
        
                
                  // alert('Updated' );
                  // navigate("/animals")
                })
                .catch((error) => {
                alert(error.message);
                });
                   })
                   .catch((error) => {
                     alert(error.message);
                   });
                  });
                }
              );
      
            }
           })
           .catch((error) => {
             alert(error.message);
           });
          });
        }
      );
    }

   
   
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
            <input value={file.name} disabled={true}/>{per}
            <br></br>
            <button>
              <label htmlFor="sound">
                Upload sound
              </label>
              <input
                type="file"
                name="animal_sound"
                id="sound"
                onChange={(e) => setSound(e.target.files[0])}
                style={{ display: "none" }}
              />             
            </button>
            <input value={sound.name} disabled={true}/>{per2}
            <br></br>
          <label>Question 1: </label>
          <input type="text" name="question" placeholder="Question" value={quiz1.question} onChange={handleInputChangeQuiz1}/>
          <input type="text" name="choicea" placeholder="1st Choice" value={quiz1.choicea} onChange={handleInputChangeQuiz1}/>
          <input type="text" name="choiceb" placeholder="2nd Choice" value={quiz1.choiceb} onChange={handleInputChangeQuiz1}/>
          <input type="text" name="choicec" placeholder="3rd Choice" value={quiz1.choicec} onChange={handleInputChangeQuiz1}/>
          <input type="text" name="answer" placeholder="Answer" value={quiz1.answer} onChange={handleInputChangeQuiz1}/>
          <input type="text" name="explanation" placeholder="Explnation" value={quiz1.explanation} onChange={handleInputChangeQuiz1}/>
          <br></br>
          <label>Question 2: </label>
          <input type="text" name="question" placeholder="Question" value={quiz2.question} onChange={handleInputChangeQuiz2}/>
          <input type="text" name="choicea" placeholder="1st Choice" value={quiz2.choicea} onChange={handleInputChangeQuiz2}/>
          <input type="text" name="choiceb" placeholder="2nd Choice" value={quiz2.choiceb} onChange={handleInputChangeQuiz2}/>
          <input type="text" name="choicec" placeholder="3rd Choice" value={quiz2.choicec} onChange={handleInputChangeQuiz2}/>
          <input type="text" name="answer" placeholder="answer" value={quiz2.answer} onChange={handleInputChangeQuiz2}/>
          <input type="text" name="explanation" placeholder="Explnation" value={quiz2.explanation} onChange={handleInputChangeQuiz2}/>
          <br></br>
          <label>Question 3: </label>
          <input type="text" name="question" placeholder="Question" value={quiz3.question} onChange={handleInputChangeQuiz3}/>
          <input type="text" name="choicea" placeholder="1st Choice" value={quiz3.choicea} onChange={handleInputChangeQuiz3}/>
          <input type="text" name="choiceb" placeholder="2nd Choice" value={quiz3.choiceb} onChange={handleInputChangeQuiz3}/>
          <input type="text" name="choicec" placeholder="3rd Choice" value={quiz3.choicec} onChange={handleInputChangeQuiz3}/>
          <input type="text" name="answer" placeholder="answer" value={quiz3.answer} onChange={handleInputChangeQuiz3}/>
          <input type="text" name="explanation" placeholder="Explnation" value={quiz3.explanation} onChange={handleInputChangeQuiz3}/>
          <br></br>
          <button onClick={UpdateAnimal}>Submit</button>
          <button onClick={Cancel}>Discard</button>
        </NavWrapper>  
    </div>
  );
};

export default UpdateAnimal;