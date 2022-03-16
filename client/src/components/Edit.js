import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {useParams} from "react-router-dom";
import { updatedata } from './context/ContextProvider';




const Edit = () => {
  const {updata,setupdata}=useContext(updatedata);

  //const[getuserdata,setuserdata]= useState([]);
  //console.log(getuserdata);

  const navigate= useNavigate("");
   
const [inpval,setINP]= useState ({
    name:"",
    email:"",
    mobile:"",
    age:"",
    work:"",
    address:"",
    description:""
  })

  const setdata = (e) => {
    console.log(e.target.value)
    const {name,value} = e.target;
    setINP((preval)=>{
      return{
        ...preval,
        [name]: value

      }
    })
  }
  const {id} = useParams("");
  console.log(id);

  
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
      setINP(data);
      console.log("get data");
    }

    
    
  }
  useEffect(()=>{
    getdata();
  },[]);

  const updateuser =async(e)=>{
    e.preventDefault();

    const {name,email,mobile,age,work,address,description} =inpval;

    const res2= await fetch(`https://mern-crud-app-rewash.herokuapp.com/updateuser/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,email,mobile,age,work,address,description
      })
    });

    const data2 =await res2.json();
    console.log(data2);
    if(res2.status === 422 || !data2){
      alert("fill the data")
    }else{
      alert("data added");
      navigate("/")
      setupdata(data2);
    }
  }
  
  return (
    <div className="container">
      
      <form className="mt-5">
          <div className="row">
  <div class="mb-3 col-lg-6 col-md-6 col-12">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" onChange={setdata} value={inpval.name} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
  <div class="mb-3  col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" class="form-label">Email</label>
    <input type="email"  value={inpval.email}  onChange={setdata} name="email" class="form-control" id="exampleInputPassword1"/>
  </div>
  
  <div class="mb-3  col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" class="form-label">Mobile</label>
    <input type="number"  value={inpval.mobile}  onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3  col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" class="form-label">Age</label>
    <input type="text"  value={inpval.age}  onChange={setdata} name="age" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3  col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" class="form-label">Work</label>
    <input type="text"  value={inpval.work}  onChange={setdata} name="work"  class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3  col-lg-6 col-md-6 col-12">
    <label for="exampleInputPassword1" class="form-label">Address</label>
    <input type="text"  value={inpval.address}  onChange={setdata} name="address" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3  col-lg-12 col-md-12 col-12">
    <label for="exampleInputPassword1" class="form-label">Description</label>
    <textarea name="description"  value={inpval.description}  onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
  </div>
  
  
  <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
  </div>
</form>
    </div>
  )
}

export default Edit
