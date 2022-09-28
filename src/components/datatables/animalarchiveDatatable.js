import React from "react";
import "../datatables/Css/datatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { animalColumns } from "../datatablesource/animalsarchive_DatatableSource";
import { useEffect, useState } from "react";
import { Link,Navigate,useNavigate } from 'react-router-dom';
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


import { RestoreModal,DeleteModal } from "../Modals/ArchivedAnimalsModals";


const AnimalarchiveDatatable = () => {
  const navigate = useNavigate();

  //animal query
  const colRef = collection(db,"animals");
  const q = query(colRef, where("animal_archive","==",true))


// initializing arrays
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState(null);
  const[restoreModalOpen, setRestoreModalOpen] = useState(false);
  const[deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [id,setId]= useState();

  useEffect(() => {
    const unsub = onSnapshot(       
      q,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });           
            });

        setData(list);
        setFilteredData(list);    
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    setFilteredData(data.filter(item => item?.animal_name.toLowerCase().includes(search.toLowerCase()) || item?.animal_enclosure.toLowerCase().includes(search.toLowerCase())))
  }, [search]);


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerAlign: 'center',
      align: 'center',
      width:300,
      renderCell: (params) => {
        return (
          <div className="cellAction">         
            <div
              className="updateButton"
              hidden={params.row.role === 'Admin' ? true : false}
              onClick={() => {setRestoreModalOpen(true);setId(params.row.id);}}
            >
              Restore
            </div>
            <button
              className="deleteButton"
              onClick={() => {setDeleteModalOpen(true);setId(params.row.id);}}
            >
              Delete
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
        <h1 style={{color: "black"}}>Animal Archives</h1>
      </div>
      <input type="text" onChange={ (e) => setSearch(e.target.value)} placeholder="Search" className="search-bar"/>
      
      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={animalColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        sortable={false}
      
      />
      
      {
        restoreModalOpen &&(<RestoreModal closeRestoreModal={()=>setRestoreModalOpen(false)} animalId ={id}/>)
      }
      {
        deleteModalOpen &&(<DeleteModal closeDeleteModal={()=>setDeleteModalOpen(false)} animalId ={id}/>)
      }
      </div>
     
  );
};

export default AnimalarchiveDatatable;
