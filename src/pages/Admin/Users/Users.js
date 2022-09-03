import React, { useState, useEffect } from "react";
import Datatable from "../../../components/datatables/userDatatable";
import "./Users.scss"
import Sidebar from "../../../components/bars/Sidebar";
import NavWrapper from "../../../components/navbar/NavWrapper";
// import NavWrapper from '..NavWrapper';
const  UsersList = () => {

  const styles = {
    position: "absolute",
    width: "85%",
    left: "15%",
    transition: '850ms'
  }

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(prevState => !prevState);
  return (
      // <>
      //   <Navbar sidebar={sidebar} showSidebar={showSidebar}/>
      //   <div className="list" style={sidebar ? styles : null}>  
      //       <Datatable />
      //   </div>
      // </>
      <NavWrapper>
        <Datatable />
      </NavWrapper>
  );
};

export default UsersList;