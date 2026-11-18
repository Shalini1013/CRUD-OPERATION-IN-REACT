import React, {useState, useEffect } from 'react'
import { PiNotepadFill } from "react-icons/pi";
import { MdEditSquare } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios'
export default function Glist() {

const[apidata,setapidata]=useState([])
const[apiitems,setapiitems]=useState("")

  const handleapi=async ()=>{
    const res= await axios.get('http://localhost:3000/grocerylist')
    setapidata(res.data)
  }

  useEffect(()=>{
    handleapi()
  },[])

  const handleadd= async()=>{
    const data={
      items:apiitems
    }
    let res= await axios.post('http://localhost:3000/grocerylist',data)
    handleapi()
  }

  const handleedit=async(editdata)=>{
     let up= prompt("enter your updated data",editdata.items)
    let body ={
      items:up,
      id:editdata.id
    }
    let res= await axios.put('http://localhost:3000/grocerylist/'+ editdata.id, body)
    handleapi() 
  }

 const handledelete = async(deleteid)=>{
     let res= await axios.delete('http://localhost:3000/grocerylist/'+deleteid)
     handleapi()
 }

  return (
    <div>
        <h1 className='h1'><marquee><u>GROCERY LIST</u></marquee></h1>
       <br></br>
       <div className='icon'>
       <PiNotepadFill size={35} />
       <span className='list'><b>list</b></span>
       </div>
       <input onChange={(e)=>(setapiitems(e.target.value))} className="input"placeholder='items name'></input>
       <button type="button" onClick={handleadd} className="btn-outline theme-accent ms-4">Add</button>
       <hr></hr>
       <span className='container'>
       <ol>
        {apidata.map((da)=>
        <li>
          <span>{da.items}</span>
        <button className='edit' onClick={()=>handleedit(da)}><MdEditSquare /></button>
        <button className='delete' onClick={()=>handledelete(da.id)}><AiOutlineDelete /></button>
        </li>)}
       </ol>
          </span>
      </div>
  )
}
