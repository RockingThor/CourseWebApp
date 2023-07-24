import { RecoilRoot, useSetRecoilState } from 'recoil'
import './App.css'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import { adminId, adminState } from './store/atoms/admins'
import axios from 'axios'
import { BASE_URL } from './config'
import { useEffect } from 'react'
import Home from './components/home'
import Signup from './components/signup'
import Signin from './components/signin'
import Courses from './components/courses'
import AddCourse from './components/addCourse'




function App() {

  return (
    <RecoilRoot>
        <Navbar/>
        <InitUser/>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/signup'} element={<Signup/>}/>
          <Route path={'/signin'} element={<Signin/>}/>
          <Route path={'/courses'} element={<Courses/>}/>
          <Route path={'/add/course'} element={<AddCourse/>}/>
        </Routes>

    </RecoilRoot>
  )
}

function InitUser(){
  const setUser=useSetRecoilState(adminState);
  const setAdminId= useSetRecoilState(adminId);
  const init= async()=>{
    try{
      const response= await axios.post(`${BASE_URL}/admin/verify`,null, {
        headers: {
          "authorization": "Bearer "+ localStorage.getItem("jwtToken")
        }
      });
      if(response.data.email){
        setUser({
          isLoading: false,
          adminEmail: response.data.email
        });
        setAdminId({
          adminEmail: response.data.email,
          adminId: response.data.id
        });
      }else{
        setUser({
          isLoading: false,
          adminEmail: null
        })
      }
    }catch(e){
      setUser({
        isLoading: false,
        adminEmail: null
      })
    }
  };

  useEffect(()=>{
    init();
  },[]);

  return(
    <>
    </>
  )
}

export default App
