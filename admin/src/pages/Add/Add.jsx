import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const [image, setImage] = useState(false)

  const [data, setData] = useState({
    name:'',
    price:0,
    description:'',
    category: "Salad"
  })

  const changeHandler = (evt) => {
    setData((prev)=>({...prev, [evt.target.name]:evt.target.value}))
  }

  const submitHandler = async (evt) => {
    evt.preventDefault();
    const food = new FormData();
    food.append("name",data.name)
    food.append("description",data.description)
    food.append("category",data.category)
    food.append("price",data.price)
    food.append("image",image)
    const response = await axios.post(`${url}/api/food/add`, food)
    if (response.data.success) {
      setData({
        name:'',
        price:0,
        description:'',
        category: "Salad"
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
        <form onSubmit={submitHandler} className="add-food ">
            <div className="image multiform">
              <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} required type="file" name="image" id="image" hidden />
            </div>
            <div className="multiform ">
              <p>Name</p>
              <input onChange={changeHandler} type="text" name="name" required placeholder='Name' value={data.name}/>
            </div>
            <div className="multiform ">
              <p>Description</p>
              <textarea onChange={changeHandler} type="text" required name="description" placeholder='Description' value={data.description} rows={4}></textarea>
            </div>
            <div className="add-category-price">
              <div className='multiform'>
                <p>Category</p>
                <select onChange={changeHandler} name="category" required value={data.category} id="">
                  <option value="Salad">Salad</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
              <div className="multiform price">
              <p>Price</p>
              <input onChange={changeHandler} value={data.price} type="number" name="price" required placeholder='Price'/>
            </div>
            </div>
            <button formAction='submit'>Submit</button>
        </form>
  )
}

export default Add