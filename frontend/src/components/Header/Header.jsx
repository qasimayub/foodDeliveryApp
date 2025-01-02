import React from 'react'
import './Header.css'
import Cursor from '../Cursor/Cursor'
import { useState, useRef } from 'react'


const Header = () => {
  const [position, setPosition] = useState([0,0,false])
  const headerRef = useRef(null)
  const handleHover = (evt) => {
    const reference = headerRef.current.getBoundingClientRect()
    const mouseY = evt.clientY - reference.top
    const mouseX = evt.clientX - reference.left
    setPosition([mouseY,mouseX,true])
  }
  const handleLeave = (evt) => {
    setPosition([0,0,false])
  }

  return (
    <div onMouseMove={handleHover} onMouseOut={handleLeave} className='header' ref={headerRef}>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim exercitationem eum reprehenderit repellat dolorum in alias harum illum ducimus quibusdam facilis laborum earum nihil, assumenda quam sit voluptas, placeat explicabo?</p>
            <button id='exploremenu'>View Menu</button>
        </div>
    </div>
  )
}

export default Header