import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme);

  const fetchUser = async () => {
    if (user) return;
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data.user));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={`flex flex-col min-h-screen ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navbar />
      <main className="flex-grow w-full ">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Body;