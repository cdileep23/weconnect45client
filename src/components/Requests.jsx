import React, { useEffect } from 'react'
import { useDispatch ,useSelector} from "react-redux";
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addRequests,removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const dispatch=useDispatch()
  const requests=useSelector((store)=>store.requests)
  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };
const fetchRequests=async()=>{
  if(requests){
    return
  }
  try {
    const response=await axios.get(BASE_URL+'/user/requests/received', {withCredentials:true})
console.log(response.data.connectRequests)
dispatch(addRequests(response.data.connectRequests))

  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  fetchRequests()
},[])
if(!requests){
 return  <p>Loading ...........</p>
}

if(requests.length===0){
  return <div className='h-80 flex flex-col items-center justify-center'>No Requests Found</div>
}
  return (
    <div className="text-center my-10">
    <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

    {requests.map((request) => {
      const { _id, firstName, lastName, photoUrl, age, gender, about } =
        request.fromUserId;

      return (
        <div
          key={_id}
          className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
        >
          <div>
            <img
              alt="photo"
              className="w-20 h-20 rounded-full"
              src={photoUrl|| 'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'}
            />
          </div>
          <div className="text-left mx-4 ">
            <h2 className="font-bold text-xl">
              {firstName + " " + lastName}
            </h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
          </div>
          <div>
            <button
              className="btn btn-primary mx-2"
              onClick={() => reviewRequest("rejected", request._id)}
            >
              Reject
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={() => reviewRequest("accepted", request._id)}
            >
              Accept
            </button>
          </div>
        </div>
      );
    })}
  </div>
  )
}

export default Requests
