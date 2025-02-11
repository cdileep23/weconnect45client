import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const theme = useSelector((store) => store.theme);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    
    try {
      const response = await axios.get(
        `${BASE_URL}/user/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequests(response.data.connectRequests));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return (
      <div className={`min-h-screen flex items-center justify-center
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center text-lg py-20
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        No Requests Found
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 py-8 
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto flex flex-col">
        <h1 className={`text-3xl font-bold text-center mb-8
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Connection Requests
        </h1>

        <div className="grid gap-6 max-w-3xl mx-auto">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

            return (
              <div
                key={_id}
                className={`flex flex-col sm:flex-row items-center gap-4 p-6 rounded-xl shadow-lg
                  ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              >
                <img
                  alt={`${firstName}'s photo`}
                  className="w-24 h-24 rounded-full object-cover"
                  src={photoUrl || 'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'}
                />
                
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <h2 className={`font-bold text-xl
                    ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {`${firstName} ${lastName}`}
                  </h2>
                  {age && gender && (
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {`${age}, ${gender}`}
                    </p>
                  )}
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>
                    {about}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    className="px-4 py-2 rounded-lg font-medium text-white transition-colors
                      bg-red-500 hover:bg-red-600"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-medium text-white transition-colors
                      bg-green-500 hover:bg-green-600"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
