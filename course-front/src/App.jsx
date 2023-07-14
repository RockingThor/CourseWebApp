import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import './App.css'
import { Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import Signup from "./signup";
import Login from "./login";
import CourseDetails from "./courseDetails";
import AddCourse from "./addCourse";

function App() {

  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path="/signup" Component={Signup}/>
      <Route path="/signin" Component={Login}/>
      <Route path="/courseDetails" Component={CourseDetails}/>
      <Route path="/add/course" Component={AddCourse}/>
    </Routes>
    </>
  )
}

export default App
