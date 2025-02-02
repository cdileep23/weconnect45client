import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';

import axios from 'axios';
import { removeConnection } from '../utils/connectionSlice';
import { resetFeed } from '../utils/feedSlice';
import { resetRequests } from '../utils/requestSlice';
const Navbar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const user=useSelector((store)=>store.user)


  const handleLogout=async()=>{
    try {
      const response=await axios.get(BASE_URL+'/logout',{withCredentials:true})

      dispatch(removeUser())
      dispatch(removeConnection())
      dispatch(resetFeed())
      dispatch(resetRequests())
      navigate('/login')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">We Connect 45</a>
    </div>
    {
      user && (<div className="flex gap-2 items-center">
        <p>Welcome<span className='font-bold mx-2 uppercase'>
        {user.firstName}
          </span> </p>
   
      <div className="dropdown dropdown-end mx-5">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><Link to='/'>Feed</Link></li>

          <li>
            <Link to='/profile' className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><Link to='/connections'>Connections</Link></li>
          <li><Link to='/requests'>Requests</Link></li>

          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div>)
    }
  </div>
  )
}

export default Navbar