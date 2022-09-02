import "../datatables/Css/datatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { animalColumns } from "../datatablesource/animalsarchive_DatatableSource";
import { useEffect, useState } from "react";
import { Link,Navigate,useNavigate } from 'react-router-dom';
//import Sidebar from "../bars/Sidebar";

import Navbar from "../navbar/Navbar";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot, where, query,updateDoc
} from "firebase/firestore";
import { db } from "../../services/firebase-config";

const AnimalarchiveDatatable = () => {
  const navigate = useNavigate();
  //animal query
  const colRef = collection(db,"animals");
  const q = query(colRef, where("animal_archive","==",true))


  const [data, setData] = useState([]);
 
  useEffect(() => {
    const unsub = onSnapshot(       
      q,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });           
            });

        setData(list);
        console.log(data)      
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  console.log(data);

  const handleRestore= async (id) => {
    const docRef = doc(db,'animals',id);
   
        updateDoc(docRef,{
            animal_archive: false
        } ).then(response => {
          alert("Successfully Archived")
        }).catch(error =>{
          console.log(error.message)
        })
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "animals", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">         
            <div
              className="updateButton"
              hidden={params.row.role === 'Admin' ? true : false}
              onClick={() => handleRestore(params.row.id)}
            >
              Restore
            </div>

            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Edit
            </button>
          
            <div
             
            >
            </div>
          </div>
        );
      },
    },
  ];
  return (

    <div className="datatable">
      <div className="datatableTitle">
      </div>
      
      <DataGrid
        className="datagrid"
        rows={data}
        columns={animalColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      </div>
  );
};

export default AnimalarchiveDatatable;
