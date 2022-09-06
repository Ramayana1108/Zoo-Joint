import "./Css/chatbotdatatable.scss";

import { DataGrid } from "@mui/x-data-grid";
import { chatColumns } from "../datatablesource/chatbotDatatableSource";
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

const ChatbotDatatable = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "chatbot"),
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
              onClick={() => navigate('/updateChatbot',{state: {qid:params.row.id}})}
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
  <div>
    <div className="datatable">
      <div className="datatableTitle">
        <h1 style={{color: "black"}}>Chatbot</h1>
      <Link to="/addChatbot" className="link">
          Add New
        </Link>
      </div>
     
      <DataGrid
        className="datagrid"
        rows={data}
        columns={chatColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        
      />
      </div>
      </div>
  );
};

export default ChatbotDatatable;
