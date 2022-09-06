import "./Css/aboutusdatatable.scss";

import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../datatablesource/aboutus_DatatableSource";
import { useEffect, useState } from "react";
import { Link,Navigate,useNavigate } from 'react-router-dom';

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../services/firebase-config";

const AboutusDatatable = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "aboutus"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log(list[0])
        
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction"> 
          <button
              className="updateButton" style={{backgroundColor: "white", color: "#145da0", borderColor: "#145da0"}}
              hidden={params.row.role === 'Admin' ? true : false}
              onClick={() => navigate('/updateaboutus',{state: {abtid:params.row.id}})}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];
  return (
     
    <div className="datatable">
      <div className="datatableTitle">
        <h1 style={{color: "black"}}>About Us</h1>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        
      />
      </div>
  );
};

export default AboutusDatatable;
