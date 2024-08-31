import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='appDownload'>
        <h1>For a better experience download our mobile app</h1>
        <div className='app-download-icon'>
            <img src={assets.app_store} alt="" />
            <img src={assets.play_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload