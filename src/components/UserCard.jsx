import axios from "axios";
import { BASE_URL } from "../utils/constants";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, allowButtons }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.theme);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className={`pt-20 pb-16 px-4 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'
    }`}>
      <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-lg">
        <img
          src={photoUrl}
          alt={`${firstName}'s photo`}
          className="w-full h-64 object-cover"
        />
        
        <div className={`p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-xl font-semibold mb-2">
            {`${firstName} ${lastName}`}
          </h2>
          
          {age && gender && (
            <p className={`mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {`${age}, ${gender}`}
            </p>
          )}
          
          <p className={`mb-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
          }`}>
            {about}
          </p>

          {/* Skills section */}
          {skills && skills.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {allowButtons && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="w-full px-4 py-2 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="w-full px-4 py-2 rounded-lg font-medium text-white bg-green-500 hover:bg-green-600 transition-colors"
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;