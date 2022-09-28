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
  onSnapshot,where, query
} from "firebase/firestore";
import { db } from "../../services/firebase-config";

const ChatbotDatatable = () => {
  const navigate = useNavigate();
  const colUserRef = collection(db,"Users");
  const uname = sessionStorage.getItem("username");
  const [permission,setPermission] = useState();
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

  useEffect(() => {
    getPermission();
  }, []);

  function getPermission(){
    const q = query(colUserRef, where("username","==",uname));  
    let userRole= [];
    getDocs(q).then(async (response) => {
      userRole =  response.docs.map((doc) => ({
      permission: doc.data().canEdit,
    }));  
    setPermission(userRole[0].permission);
  })
  }

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
              hidden={String(permission)==="true"? false:true}
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
      <Link to="/addChatbot" className="link"   hidden={String(permission)==="true"? false:true}>
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
