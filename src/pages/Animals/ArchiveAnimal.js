import React, { useState, useEffect } from "react";
import AnimalarchiveDatatable from "../../components/datatables/animalarchiveDatatable";
import Navbar from "../../components/navbar/Navbar";

const  AnimalarchiveList = () => {
  return (
      <div>
        <Navbar/>
        <div className="list">  
        <div className="listContainer">
        <AnimalarchiveDatatable/>
      </div>
    </div>
    </div>
  );
};

export default AnimalarchiveList;