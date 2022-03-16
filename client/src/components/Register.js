import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {
  const{udata,setudata}=useContext(adddata);
  const navigate = useNavigate();

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

  const addinpdata = async (e) => {

    e.preventDefault();
    const {name,email,mobile,age,work,address,description} =inpval;
    const res = await fetch("https://mern-crud-app-rewash.herokuapp.com/register",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,email,mobile,age,work,address,description
      })

    });

    const data= await res.json();
    console.log(data);

    if(res.status === 422 || !data){
      alert("error");
      console.log("error");
    }else{
      alert("data added");
      navigate("/");
      setudata(data);
    }

    
    
  }
  return (
    <div className="container">
      
      <form className="mt-5">
          <div className="row">
  <div className="mb-3 col-lg-6 col-md-6 col-12">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" onChange={setdata} value={inpval.name} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3  col-lg-6 col-md-6 col-12">
    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
    <input type="email"  value={inpval.email}  onChange={setdata} name="email" className="form-control" id="exampleInputPassword1"/>
  </div>
  
  <div className="mb-3  col-lg-6 col-md-6 col-12">
    <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
    <input type="number"  value={inpval.mobile}  onChange={setdata} name="mobile" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3  col-lg-6 col-md-6 col-12">
    <label htmlFor="exampleInputPassword1" className="form-label">Age</label>
    <input type="text"  value={inpval.age}  onChange={setdata} name="age" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3  col-lg-6 col-md-6 col-12">
    <label htmlFor="exampleInputPassword1" className="form-label">Work</label>
    <input type="text"  value={inpval.work}  onChange={setdata} name="work"  className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3  col-lg-6 col-md-6 col-12">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text"  value={inpval.address}  onChange={setdata} name="address" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3  col-lg-12 col-md-12 col-12">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <textarea name="description"  value={inpval.description}  onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
  </div>
  
  
  <button type="submit"  onClick={addinpdata} className="btn btn-primary">Submit</button>
  </div>
</form>
    </div>
  )
}

export default Register
