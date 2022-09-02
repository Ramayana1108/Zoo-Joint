import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";

const  NewAnimal = () => {
  return (
      <div>
        <Navbar/>
        <div className="list">  
        <div className="listContainer">
        <h1>New Animal</h1>
      </div>
    </div>
    </div>
  );
};

export default NewAnimal;