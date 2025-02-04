import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((store) => store.theme);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const inputClasses = `w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-colors
    ${theme === 'dark' 
      ? 'bg-gray-700 border-gray-600 text-white' 
      : 'bg-white border-gray-300 text-gray-900'}`;

  const labelClasses = `block text-sm font-medium mb-1
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md rounded-xl shadow-xl p-6 sm:p-8 
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-6
          ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        
        <form className="space-y-4">
          {!isLoginForm && (
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  className={inputClasses}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClasses}>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  className={inputClasses}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <div>
            <label className={labelClasses}>Email ID</label>
            <input
              type="email"
              value={emailId}
              className={inputClasses}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          
          <div>
            <label className={labelClasses}>Password</label>
            <input
              type="password"
              value={password}
              className={inputClasses}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <button
            type="button"
            className="w-full py-2 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </form>
        
        <button
          className={`mt-4 w-full text-sm text-center hover:underline
            ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm ? "New User? Sign up here" : "Existing User? Login here"}
        </button>
      </div>
    </div>
  );
};

export default Login;