import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import { Loader } from 'lucide-react';
import { BASE_URL } from '../utils/constants';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const theme = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchFeed = async () => {
    if (feed) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(BASE_URL + '/user/feed', { withCredentials: true });
      dispatch(addFeed(response.data.data));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleNextUser = () => {
    if (feed && currentIndex < feed.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (isLoading) {
    return (
      <div className={`
        min-h-screen 
        flex 
        items-center 
        justify-center
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}
      `}>
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin" />
          <p className="text-lg font-medium">Loading feed...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`
        min-h-screen 
        flex 
        items-center 
        justify-center
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}
      `}>
        <div className="text-center p-6 max-w-md">
          <p className="text-red-500 text-lg font-medium mb-2">Error loading feed</p>
          <p className="text-sm opacity-75">{error}</p>
        </div>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className={`
        min-h-screen 
        flex 
        items-center 
        justify-center
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}
      `}>
        <div className="text-center p-6 max-w-md">
          <p className="text-lg font-medium mb-2">No users found</p>
          <p className="text-sm opacity-75">Check back later for new connections</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      min-h-screen 
      py-8 
      px-4 
      md:px-8 
      flex 
      items-center 
      justify-center
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}
    `}>
      <div className="max-w-md mx-auto h-[500px] flex items-center justify-center">
        <UserCard allowButtons={true} user={feed[currentIndex]} onNext={handleNextUser} />
      </div>
    </div>
  );
};

export default Feed;
