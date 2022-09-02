import "../datatables/Css/datatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { animalColumns } from "../datatablesource/animals_DatatableSource";
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

const AnimalDatatable = () => {
  const navigate = useNavigate();
  //animal query
  const colRef = collection(db,"animals");
  const q = query(colRef, where("animal_archive","==",false))


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

  const handleArchive= async (id) => {
    const docRef = doc(db,'animals',id);
   
        updateDoc(docRef,{
            animal_archive: true
        } ).then(response => {
          alert("Successfully Archived")
        }).catch(error =>{
          console.log(error.message)
        })
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction"> 
          <button
              className="updateButton"
              onClick={() => navigate('/updateanimals',{state: {aid:params.row.id}})}
            >
              Edit
            </button>
          
            <div
              className="deleteButton"
              hidden={params.row.role === 'Admin' ? true : false}
              onClick={() => handleArchive(params.row.id)}
            >
              Arhive
            </div>
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
      <Link to="/newanimals" className="link">
          Add New
        </Link>
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

export default AnimalDatatable;
