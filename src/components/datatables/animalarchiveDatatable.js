import "../datatables/Css/datatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { animalColumns } from "../datatablesource/animalsarchive_DatatableSource";
import { useEffect, useState } from "react";
import { Link,Navigate,useNavigate } from 'react-router-dom';


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


// initializing arrays
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState(null);

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


  const handleRestore= async (id) => {
    const docRef = doc(db,'animals',id);
   
        updateDoc(docRef,{
            animal_archive: false
        } ).then(response => {
          alert("Animal Restored")
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
        <h1>Animal Archives</h1>
      </div>
      <input type="text" onChange={ (e) => setSearch(e.target.value)} placeholder="Search"/>
      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={animalColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      </div>
  );
};

export default AnimalarchiveDatatable;
