import React from 'react'
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' >
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni fugiat id ipsa dignissimos ea excepturi quia, numquam officiis cumque incidunt enim earum! Officia neque facere reprehenderit, mollitia pariatur praesentium porro.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=> {
                return <div onClick={()=> {
                  setCategory((prev=>prev===item.menu_name?'All':item.menu_name))
                }} className='explore-menu-item' key={index}>
                    <img className={category===item.menu_name?'isCategory':''} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu