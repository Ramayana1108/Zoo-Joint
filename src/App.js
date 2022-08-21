import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"


import Users from "./pages/Admin/Users/Users";
import Login from "./pages/Home/Login";
import ResetPassword from "./pages/Home/ResetPassword";
import NewUser from "./pages/Admin/Users/newUsers";
import UserUpdate from "./pages/Admin/Users/userUpdate"

function App() {
    return (      
        <div>          
           <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/users" element={<Users />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/newUser" element={<NewUser/>}/>
              <Route path="/updateUser" element={<UserUpdate/>}/>
            </Routes>
          </BrowserRouter>
        </div> 
    );
}

export default App;
