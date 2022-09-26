import "../datatables/Css/datatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { animalColumns } from "../datatablesource/animals_DatatableSource";
import { useEffect, useState } from "react";
import { Link,Navigate,useNavigate } from 'react-router-dom';

import { ArchiveModal } from "../Modals/AnimalsPageModals";


import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot, where, query,updateDoc
} from "firebase/firestore";
import { db } from "../../services/firebase-config";
import { FilterDrama } from "@mui/icons-material";

const AnimalDatatable = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  //animal query
  const colRef = collection(db,"animals");
  const q = query(colRef, where("animal_archive","==",false))

  // initializing arrays
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState(null);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
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
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction"> 
          <button
              className="updateButton"
              onClick={() => {navigate('/updateanimals',{state: {aid:params.row.id}});}}
            
            >
              Edit
            </button>
          
            <div
              className="deleteButton"
              hidden={role === 'Staff' ? true : false}
              onClick={() => {setArchiveModalOpen(true);setId(params.row.id);}}
            >
              Archive
            </div>
            <div>
            </div>
          </div>
        );
      },
    },
  ];
  return (

    <div className="datatable">
      <div className="datatableTitle">
      <h1 style={{color: "black"}}>Animals</h1>
      <Link to="/newanimals" className="link">
          Add New
        </Link>
      </div>
      <input type="text" onChange={ (e) => setSearch(e.target.value)} placeholder="Search" className="search-bar"/>
      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={animalColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      {
        archiveModalOpen &&(<ArchiveModal closeArchiveModal={()=>setArchiveModalOpen(false)} animalId ={id}/>)
      }
      </div>
  );
};

export default AnimalDatatable;
