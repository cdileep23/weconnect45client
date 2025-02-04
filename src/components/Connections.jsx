import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from '../utils/connectionSlice';
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const theme = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return null;
  }

  if (connections.length === 0) {
    return (
      <div className={`
        min-h-screen 
        flex 
        items-center 
        justify-center 
        p-4
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}
      `}>
        <h1 className="text-2xl font-bold">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className={`
      min-h-screen 
      py-8 
      px-4 
      md:px-6 
      lg:px-8
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}
    `}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`
          text-2xl 
          md:text-3xl 
          font-bold 
          text-center 
          mb-8
          ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
        `}>
          Connections
        </h1>

        <div className="space-y-4">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

            return (
              <div
                key={_id}
                className={`
                  flex 
                  flex-col 
                  sm:flex-row 
                  items-center 
                  sm:items-start 
                  gap-4 
                  p-4 
                  rounded-lg 
                  shadow-md 
                  ${theme === 'dark' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-white text-gray-800'
                  }
                `}
              >
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <img
                    alt={`${firstName}'s photo`}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    src={photoUrl}
                  />
                </div>

                {/* User Info */}
                <div className="flex-grow text-center sm:text-left">
                  <h2 className="font-bold text-xl mb-1">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className={`
                      text-sm 
                      mb-2
                      ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                    `}>
                      {age + ", " + gender}
                    </p>
                  )}
                  <p className={`
                    text-sm 
                    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                  `}>
                    {about}
                  </p>
                </div>

                {/* Chat Button */}
                <div className="flex-shrink-0">
                  <Link to={"/chat/" + _id}>
                    <button className={`
                      px-6 
                      py-2 
                      rounded-lg 
                      font-medium 
                      transition-colors
                      ${theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }
                    `}>
                      Chat
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;