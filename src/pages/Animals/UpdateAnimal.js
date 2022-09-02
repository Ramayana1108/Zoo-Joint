import React, { useState, useEffect } from "react";
import AnimalDatatable from "../../components/datatables/animalsDatatable";
import Navbar from "../../components/navbar/Navbar";

const  UpdateAnimal = () => {
  return (
      <div>
        <Navbar/>
        <div className="list">  
        <div className="listContainer">
        <h1>Update Animal</h1>
      </div>
    </div>
    </div>
  );
};

export default UpdateAnimal;