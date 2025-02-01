import { useState } from "react";
import React from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || 'https://geographyandyou.com/images/user-profile.png');
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || "An error occurred.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center my-10 px-4 sm:px-6">
      {/* Edit Profile Card */}
      <div className="card bg-base-300 w-full max-w-lg shadow-xl p-6 rounded-lg">
        <h2 className="card-title text-center text-xl font-semibold mb-4">
          Edit Profile
        </h2>
        <div>
          {/* First Name */}
          <label className="form-control w-full mb-3">
            <span className="label-text">First Name:</span>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          {/* Last Name */}
          <label className="form-control w-full mb-3">
            <span className="label-text">Last Name:</span>
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          {/* Photo URL */}
          <label className="form-control w-full mb-3">
            <span className="label-text">Photo URL:</span>
            <input
              type="text"
              value={photoUrl}
              className="input input-bordered w-full"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>

          {/* Age */}
          <label className="form-control w-full mb-3">
            <span className="label-text">Age:</span>
            <input
              type="number"
              min="1"
              max="100"
              value={age}
              className="input input-bordered w-full"
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          {/* Gender (Dropdown) */}
          <label className="form-control w-full mb-3">
            <span className="label-text">Gender:</span>
            <select
              className="select select-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          {/* About */}
          <label className="form-control w-full mb-3">
            <span className="label-text">About:</span>
            <textarea
              value={about}
              className="textarea textarea-bordered w-full h-24"
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Save Button */}
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary w-full" onClick={saveProfile}>
            Save Profile
          </button>
        </div>
      </div>

      {/* Preview User Card */}
      <div className="mt-8 lg:mt-0 lg:ml-10">
        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center absolute top-5 left-1/2 transform -translate-x-1/2">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
