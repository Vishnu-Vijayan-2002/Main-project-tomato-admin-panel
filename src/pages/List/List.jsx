import React, { useEffect, useState } from 'react'
import './List.css'
import axiox from "axios"
import { toast } from 'react-toastify';
function List({url}) {
  const [list,setList]=useState([])
  const fetchList=async()=>{
    const response= await axiox.get(`${url}/api/food/list`)
    // console.log(response.data);
    if(response.data.success){
      setList(response.data.data)
    }else{
      
    }
  }
    useEffect(()=>{
      fetchList()
    },[])

    const removeFooditem= async(foodId)=>{
     const response= await axiox.post(`${url}/api/food/remove`,{id:foodId})
     await fetchList()
     if(response.data.success){
      toast.success(response.data.success)
     }else{
      toast.error("Error")
     }
    }
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list?.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={()=>removeFooditem(item._id)} className='cursor'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List
