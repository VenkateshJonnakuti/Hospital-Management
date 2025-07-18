import React from "react";
import './App.css';
import LoginDataTable from "./LoginDataTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpForm from "./SignupForm";
import LoginPage from "./Loginpage";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/data" element={<LoginDataTable/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
