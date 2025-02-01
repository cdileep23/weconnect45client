import axios from "axios";
import { BASE_URL } from "../utils/constants";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  console.log(user);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="card bg-base-300 w-full max-w-md shadow-xl md:max-w-lg lg:max-w-xl">
        <figure>
          <img src={photoUrl} alt="User" className="w-full h-64 object-cover rounded-t-xl" />
        </figure>
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-lg sm:text-xl font-semibold">{firstName + " " + lastName}</h2>
          {age && gender && <p className="text-sm sm:text-base">{age + ", " + gender}</p>}
          <p className="text-sm sm:text-base">{about}</p>
          <div className="card-actions justify-center my-4 flex flex-col sm:flex-row gap-2">
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary w-full sm:w-auto"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
