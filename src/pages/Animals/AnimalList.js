import React, { useState, useEffect } from "react";
import AnimalDatatable from "../../components/datatables/animalsDatatable";
import Navbar from "../../components/navbar/Navbar";

const  AnimalList = () => {
  return (
      <div>
        <Navbar/>
        <div className="list">  
        <div className="listContainer">
        <AnimalDatatable/>
      </div>
    </div>
    </div>
  );
};

export default AnimalList;