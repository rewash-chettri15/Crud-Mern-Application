import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import WorkIcon from '@mui/icons-material/Work';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import {NavLink, useNavigate, useParams} from "react-router-dom";

const Detail = () => {

  const[getuserdata,setuserdata]= useState([]);
  console.log(getuserdata);


  const {id} = useParams("");
  console.log(id);

  const navigate = useNavigate();

  
  const getdata = async () => {

    
    
    const res = await fetch(`https://mern-crud-app-rewash.herokuapp.com/getuser/${id}`,{
      method: "GET",
      headers: {
        "Content-Type":"application/json"
      }
      
      

    });

    const data= await res.json();
    console.log(data);

    if(res.status === 422 || !data){
      
      console.log("error");
    }else{
      setuserdata(data);
      console.log("get data");
    }

    
    
  }

  useEffect(()=>{
    getdata();
  },[])
  
  const deleteuser=async(id)=>{
    const res2=await fetch(`https://mern-crud-app-rewash.herokuapp.com/deleteuser/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type":"application/json"
      }
      
    });
    const deletedata=await res2.json();
    console.log(deletedata);

    if(res2.status === 422 || !deletedata){
      console.log("error");
    }else{
      console.log("user deleted");
      navigate("/");
    }

  }
  return (
    <div className="container mt-3">
      <h1 style={{fontWeight: 400}}>Information Of <span>{getuserdata.name}</span> </h1>
      <Card sx={{ maxWidth: 600 }}>
      <CardContent>
      <div className="addbtn d-flex justify-content-end mt-1">
            <NavLink to={`/edit/${getuserdata._id}`}> <button  className="btn btn-primary mx-4"><EditIcon/></button></NavLink> 
            <button  className="btn btn-danger" onClick={()=>deleteuser(getuserdata._id)}><DeleteForeverIcon/></button>
              </div>
          <div className="row">
          <div className="leftview col-lg-6 col-md-6 col-12">
          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" style= {{width:100, borderRadius:50}} alt=""/>
      <h3 className="mt-3">Name: <span>{getuserdata.name}</span></h3>
      <h3 className="mt-3">Age: <span >{getuserdata.age}</span></h3>
      <p className="mt-3"><MarkunreadIcon/>Email: <span>{getuserdata.email}</span></p>
      <p className="mt-3"><WorkIcon/>Work: <span>{getuserdata.work}</span></p>
          </div>
          <div className="rightview col-lg-6 col-md-6 col-12 ">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              
         <p  className="mt-3">< CallIcon/>Phone: <span>{getuserdata.mobile}</span></p>
         <p  className="mt-3">< LocationOnIcon/>Location: <span>{getuserdata.address}</span></p>
         <p  className="mt-3"><PersonIcon/>Description: <span>{getuserdata.description}</span></p>
      
      
          </div>
          </div>
          
     
      </CardContent>
      </Card>
    </div>
  )
}

export default Detail
