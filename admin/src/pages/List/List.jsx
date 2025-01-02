import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {

  const [foodData, setFoodData] = useState([])
  async function fetchData() {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setFoodData(response.data.data)
    } else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const removeData = async (itemId) => {
    const response = await axios.post(`${url}/api/food/delete`, {id:itemId})
    if (response.data.success) {
      toast.success(response.data.message)
      await fetchData()
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='list'>
      <h2>All Foods List</h2>
      <div className="list-grid">
        <b>Image</b>
        <b>Name</b>
        <b className='description-category'>Description</b>
        <b className='price'>Price</b>
        <b className='description-category'>Category</b>
        <b>Remove</b>
      </div>
      {
        foodData.map((item,i) => {
          return <div key={i} className="list-grid list-item">
            <p><img src={`${url}/images/${item.image}`} alt="" /></p>
            <p>{item.name}</p>
            <p className='description-category description'>{item.description}</p>
            <p className='price'>${item.price}</p>
            <p className='description-category'>{item.category}</p>
            <p className='cross' onClick={()=>{
              removeData(item._id)
            }}>X</p>
        </div>
        })
      }
    </div>
  )
}

export default List
