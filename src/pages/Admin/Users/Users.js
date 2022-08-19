import React, { useState, useEffect } from "react";
import { db } from "../../../services/firebase-config";  
import {Table, Button} from "react-bootstrap"
import Datatable from "../../../components/datatables/userDatatable";
import "./Users.scss"

const  UsersList = () => {
  return (
    <div className="list">
   
      <div className="listContainer">
     
        <Datatable/>
      </div>
    </div>
  );
};

export default UsersList;