import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch ,useSelector} from "react-redux";
import {addFeed} from '../utils/feedSlice'
import UserCard from './UserCard';
const Feed = () => {
const feed=useSelector((store)=>store.feed)
const dispatch=useDispatch()

  const fetchFeed=async()=>{
    if(feed){
      return
    }
    try {
      const response=await axios.get(BASE_URL+'/user/feed',{withCredentials:true})
      console.log("in feed")
      console.log(response.data.data)
      dispatch(addFeed(response.data.data))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchFeed()
  },[])
  if(!feed){
    return <p>Loading.........</p>
  }

  if(feed.length===0){
    return <p>NO new Users found</p>
  }
  return (
    <div className="flex items-center justify-center h-screen">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
  
}

export default Feed
