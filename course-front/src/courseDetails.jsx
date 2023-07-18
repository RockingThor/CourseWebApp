import axios from "axios";
import { useEffect, useState } from "react";

function CourseDetails(){
    const [courses,setCourses]= useState([]);
    const [user, setUser]= useState('');
    const [token, setToken]= useState('');

    useEffect(()=>{
        (async()=>{
            let jwt= await localStorage.getItem('jwtToken');
            setToken(`Bearer ${jwt}`);
        })();
        const getUserId=async()=>{
            const response= await axios.post('http://localhost:3000/authenticate',null,{
            headers: {authorization: token}
            });
            if(response.data.email){
                const res= await axios.post('http://localhost:3000/email/getId', null, {
                    headers: {authorization: token}
                });
                if(res.data.id){
                    setUser(res.data.id);
                }
            }
        };
        const getCourses= async()=>{
            console.log(user);
            const response= await axios.get(`http://localhost:3001/courses/${user}`);
            if(response.courses){
                setCourses(response.courses);
                console.log(courses);
            }
        };
        (async()=>{
            getUserId().then(async()=>{
                await getCourses().then(()=>{});
            })  
        })();
    },[]);


    return (
        <>
            <div className="card" style={{width: '18rem'}}>
                <img className="card-img-top" src={`http://localhost:3002/retreive/64afd152ce1cc11c96897137`} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </>
    )
}

export default CourseDetails;