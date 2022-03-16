import React, { useContext, useEffect, useState } from 'react'
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { NavLink } from 'react-router-dom';
import { adddata, deldata, updatedata } from './context/ContextProvider';

const Home = () => {

  const[getuserdata,setuserdata]= useState([]);
  console.log(getuserdata);

  const{udata,setudata}=useContext(adddata);
  const {updata,setupdata}=useContext(updatedata);
  const {dltdata,setdltdata}=useContext(deldata);


  const getdata = async (e) => {

    
    
    const res = await fetch("https://mern-crud-app-rewash.herokuapp.com/getdata",{
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
      setdltdata(deletedata);
      getdata();
    }

  }
  return (
    <>
    {
      udata ?
      <>
      <div className="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{udata.name}</strong> User added successfully!
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
      </> : ""
    }

{
      updata ?
      <>
      <div className="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{updata.name}</strong> Information updated successfully!
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
      </> : ""
    }
    {
      dltdata ?
      <>
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>{dltdata.name}</strong> User deleted successfully!
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
      </> : ""
    }
    
    <div className="mt-5">
        <div className="container">
            <div className="add_btn mt-2 mb-2">
                <NavLink to="/register" className="btn btn-primary">Add Data</NavLink>
            </div>

            <table className="table">
  <thead>
    <tr className="table-dark">
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Job</th>
      <th scope="col">Phone Number</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {
      getuserdata.map((element,id)=>{
        return(
          <>
          <tr>
      <th scope="row">{id+1}</th>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.work}</td>
      <td>{element.mobile}</td>
        <td className="d-flex justify-content-between">
           <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><PreviewIcon /></button></NavLink>
           <NavLink to={`edit/${element._id}`}><button  className="btn btn-primary"><EditIcon/></button></NavLink> 
            <button  className="btn btn-danger" onClick={()=>deleteuser(element._id)}><DeleteForeverIcon/></button>
        </td>
    </tr>
          </>
        )
      })
    }
    
   
   
    
  </tbody>
</table>
        </div>
      
    </div>
    </>
  )
}

export default Home
