import React from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.user);
  const theme = useSelector((store) => store.theme);

  return (
    user && (
      <div className={`
        min-h-screen 
        w-full 
        p-4 
        md:p-8 
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}
      `}>
        <div className="max-w-7xl mx-auto">
          <EditProfile user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;