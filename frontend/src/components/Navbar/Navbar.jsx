import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../contexts/storeContext'

const Navbar = ({setLogin}) => {
    const [menu, setMenu] = useState('home')
    const navigate = useNavigate();
    const {totalCart, setToken, token} = useContext(StoreContext)

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        navigate('/')
    }

    return (
    <div className='navbar'>
        <Link to={'/'}><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className='navbar-menu'>
            <Link to={'/'} onClick={()=> (setMenu('home'))} className={menu === 'home'? 'active' : ''}>home</Link>
            <a href='#exploremenu' onClick={()=> (setMenu('menu'))} className={menu === 'menu'? 'active' : ''}>menu</a>
            <a href='#appDownload' onClick={()=> (setMenu('mobile-app'))} className={menu === 'mobile-app'? 'active' : ''}>mobile-app</a>
            <a href='#contactUs' onClick={()=> (setMenu('contact-us'))} className={menu === 'contact-us'? 'active' : ''}>contact-us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt="" />
            <Link to={'/cart'}>
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className={totalCart()?'dot':''}></div>
            </div>
            </Link>
            
            {!token?<button onClick={()=>setLogin(true)}>sign up</button>
            :<div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className='navbar-dropdown'>
                    <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>
            </div>}
        </div>
    </div>
  )
}

export default Navbar