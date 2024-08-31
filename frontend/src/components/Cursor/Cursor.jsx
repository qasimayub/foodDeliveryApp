import React from 'react'
import './Cursor.css'
const Cursor = ({top, left, visible}) => {
    
  return (
    <div className={`crsr ${visible?'visible':''}`} style={{top: top, left: left}}>
      
    </div>
  )
}

export default Cursor
