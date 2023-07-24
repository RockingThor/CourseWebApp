import { RecoilRoot, useSetRecoilState } from 'recoil'
import './App.css'
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import { adminState } from './store/atoms/admins'
import axios from 'axios'
import { BASE_URL } from './config'
import { useEffect } from 'react'
import Home from './components/home'
import Signup from './components/signup'

interface Response{
  id: string;
  email: string;
}


function App() {

  return (
    <RecoilRoot>
        <Navbar/>
        <InitUser/>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/signup'} element={<Signup/>}/>
        </Routes>

    </RecoilRoot>
  )
}

function InitUser(){
  const setUser=useSetRecoilState(adminState);
  const init= async()=>{
    try{
      const response: Response= await axios.post(`${BASE_URL}/admin/verify`,null, {
        headers: {
          "authorization": "Bearer "+ localStorage.getItem("jwtToken")
        }
      });
      if(response.email){
        setUser({
          isLoading: false,
          adminEmail: response.email
        })
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
