import { useState } from "react";
import React from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { X } from "lucide-react";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || 'https://geographyandyou.com/images/user-profile.png');
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const theme = useSelector((store) => store.theme);
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill)) {
      console.log(newSkill)
      setSkills(prevSkills => [...prevSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    console.log(`skill to remove ${skillToRemove}`)
 
    setSkills((prevSkills) => prevSkills.filter(skill => skill !== skillToRemove));
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about, skills },
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
  console.log(skills)
  return (
    <div className="relative min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative">
        <div className={`
          flex 
          flex-col 
          lg:flex-row 
          justify-center 
          items-start 
          gap-8
        `}>
          {/* Edit Profile Card */}
          <div className={`
            w-full 
            lg:w-2/3 
            rounded-xl
            shadow-lg 
            p-6 
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
          `}>
            <h2 className={`
              text-2xl 
              font-semibold 
              mb-8
              text-center 
              ${theme === 'dark' ? 'text-white' : 'text-gray-800'}
            `}>
              Edit Profile
            </h2>

            <div className="space-y-6">
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <label className="block">
                  <span className={`
                    block 
                    mb-2 
                    text-sm 
                    font-medium 
                    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                  `}>
                    First Name
                  </span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`
                      w-full 
                      p-3 
                      rounded-lg
                      border 
                      ${theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-500
                    `}
                  />
                </label>

                {/* Last Name */}
                <label className="block">
                  <span className={`
                    block 
                    mb-2 
                    text-sm 
                    font-medium 
                    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                  `}>
                    Last Name
                  </span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`
                      w-full 
                      p-3 
                      rounded-lg
                      border 
                      ${theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-500
                    `}
                  />
                </label>
              </div>

              {/* Photo URL */}
              <label className="block">
                <span className={`
                  block 
                  mb-2 
                  text-sm 
                  font-medium 
                  ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  Photo URL
                </span>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className={`
                    w-full 
                    p-3 
                    rounded-lg
                    border 
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-blue-500
                  `}
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <label className="block">
                  <span className={`
                    block 
                    mb-2 
                    text-sm 
                    font-medium 
                    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                  `}>
                    Age
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={`
                      w-full 
                      p-3 
                      rounded-lg
                      border 
                      ${theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-500
                    `}
                  />
                </label>

                {/* Gender */}
                <label className="block">
                  <span className={`
                    block 
                    mb-2 
                    text-sm 
                    font-medium 
                    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                  `}>
                    Gender
                  </span>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={`
                      w-full 
                      p-3 
                      rounded-lg
                      border 
                      ${theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-500
                    `}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              {/* About */}
              <label className="block">
                <span className={`
                  block 
                  mb-2 
                  text-sm 
                  font-medium 
                  ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                `}>
                  About
                </span>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className={`
                    w-full 
                    p-3 
                    rounded-lg
                    border 
                    h-32
                    resize-none 
                    ${theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                    }
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-blue-500
                  `}
                />
              </label>

              {/* Skills Section */}
              <div className="space-y-4">
                <label className="block">
                  <span className={`
                    block 
                    mb-2 
                    text-sm 
                    font-medium 
                    ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                  `}>
                    Skills
                  </span>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skills.map((skill, index) => (
                      <span
                        key={skill}
                        className={`
                          inline-flex 
                          items-center 
                          gap-1 
                          px-3 
                          py-1 
                          rounded-full 
                          text-sm
                          ${theme === 'dark' 
                            ? 'bg-gray-700 text-white' 
                            : 'bg-gray-200 text-gray-800'
                          }
                        `}
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="p-1 hover:text-red-500 rounded-full cursor-pointer"

                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      className={`
                        flex-1
                        p-3 
                        rounded-lg
                        border 
                        ${theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500
                      `}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill(e);
                        }
                      }}
                    />
                    <button
                      onClick={handleAddSkill}
                      className={`
                        px-4
                        rounded-lg
                        font-medium 
                        transition-colors 
                        ${theme === 'dark' 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }
                      `}
                    >
                      Add
                    </button>
                  </div>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-center mt-4">
                  {error}
                </p>
              )}

              {/* Save Button */}
              <button
                onClick={saveProfile}
                className={`
                  w-full 
                  py-3 
                  px-4 
                  rounded-lg
                  font-medium 
                  transition-colors 
                  ${theme === 'dark' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }
                `}
              >
                Save Profile
              </button>
            </div>
          </div>

          {/* Preview Card */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0 relative">
            <div className="lg:sticky lg:top-24">
              <UserCard 
                allowButtons={false} 
                user={{ firstName, lastName, photoUrl, age, gender, about, skills }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`
          fixed 
          top-24
          left-1/2 
          transform 
          -translate-x-1/2 
          z-50 
          py-3
          px-6
          rounded-lg
          ${theme === 'dark' ? 'bg-green-600' : 'bg-green-500'} 
          text-white 
          shadow-lg
          transition-all
          duration-300
          ease-in-out
        `}>
          <span>Profile saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default EditProfile;