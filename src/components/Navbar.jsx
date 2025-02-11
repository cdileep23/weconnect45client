import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { removeConnection } from '../utils/connectionSlice';
import { resetFeed } from '../utils/feedSlice';
import { resetRequests } from '../utils/requestSlice';
import { toggleTheme } from '../utils/themeSlice';
import axios from 'axios';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { BASE_URL } from '../utils/constants';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme);

  const handleLogout = async () => {
    try {
      await axios.get(BASE_URL + '/logout', { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeConnection());
      dispatch(resetFeed());
      dispatch(resetRequests());
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
   
          <div className="flex-shrink-0 font-bold text-xl">
            We Connect
          </div>

      
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="hover:text-blue-500">Feed</Link>
              <Link to="/profile" className="hover:text-blue-500">Profile</Link>
              <Link to="/connections" className="hover:text-blue-500">Connections</Link>
              <Link to="/requests" className="hover:text-blue-500">Requests</Link>
              <button onClick={handleLogout} className="hover:text-blue-500">Logout</button>
              <button 
                onClick={handleThemeToggle}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          )}

       
          {user && (
            <div className="md:hidden flex items-center">
              <button 
                onClick={handleThemeToggle}
                className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>

       
        {user && isMenuOpen && (
          <div className="md:hidden">
            <div className={`pt-2 pb-3 space-y-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Feed
              </Link>
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link 
                to="/connections" 
                className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Connections
              </Link>
              <Link 
                to="/requests" 
                className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Requests
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;