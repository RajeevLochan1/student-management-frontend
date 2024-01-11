import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./component/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css"
import AddStudent from "./component/CreateNew/AddStudent";
import UpdateList from "./component/UpdateList/UpdateList";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create" element={<AddStudent/>} />
        <Route path="/edit/:id" element={<UpdateList/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
