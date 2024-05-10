import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axiox from "axios"
import { ToastContainer, toast } from 'react-toastify'
function Add({url}) {
  const [image,setImage]=useState(false)
  const [data,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })
  const onChangeHanlder=(event)=>{
    const name= event.target.name;
    const value =event.target.value;
    setData(data=>({...data,[name]:value}))

  }

  // api call
  const onSubmitHandler= async(event)=>{
    event.preventDefault()
    const formData=new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",data.price)
    formData.append("category",data.category)
    formData.append("image",image)
   const response= await axiox.post(`${url}/api/food/add`,formData);
   if(!response.data.success){
   setData({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })
  setImage(false)
  toast.success(response.data.message)
   }
   else{
    toast.error(response.data.message)
   }
  }
  
  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHanlder}  value={data.name} type="text" name="name" id="name" placeholder='Type here'/>
        </div>
        <div className="add-product-description flex-col">
         <p>Product Description</p>
         <textarea onChange={onChangeHanlder} value={data.description} name="description" id="description" cols="30" rows="6" placeholder='Write content here'></textarea>
        </div>
        <div className='add-category-price'>
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHanlder} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pur Veg">Pur Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHanlder} value={data.price} type="Number" name='price' placeholder='₹500'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
  )
}

export default Add
