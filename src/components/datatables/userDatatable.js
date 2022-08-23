import "./datatable.scss";

import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../datatablesource/user_DatatableSource";
import { useEffect, useState } from "react";
import { Link,Navigate,useNavigate } from 'react-router-dom';
import Sidebar from "../bars/Sidebar";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../services/firebase-config";

const Datatable = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Users", id));
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
          <button
              className="updateButton"
              onClick={() => navigate('/updateUser',{state: {userid:params.row.id}})}
            >
              Update
            </button>
          
            <div
              className="deleteButton"
              hidden={params.row.role === 'Admin' ? true : false}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
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
    <div>
      <Sidebar/>
    <div className="datatable">
      <div className="datatableTitle">
      <Link to="/newUser" className="link">
          Add New
        </Link>
      </div>
      
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        
      />
    </div>
    </div>
  );
};

export default Datatable;
