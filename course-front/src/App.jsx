import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import './App.css'
import { Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import Signup from "./signup";

function App() {

  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path="/signup" Component={Signup}/>
    </Routes>
    </>
  )
}

export default App
