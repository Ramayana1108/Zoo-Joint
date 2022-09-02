import React, { useState, useEffect } from "react";
import Datatable from "../../../components/datatables/userDatatable";
import "./Users.scss"
import Sidebar from "../../../components/bars/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

const  UsersList = () => {
  return (
      <div>
        <Navbar/>
        <div className="list">  
        <div className="listContainer">
        <Datatable/>
      </div>
    </div>
    </div>
  );
};

export default UsersList;