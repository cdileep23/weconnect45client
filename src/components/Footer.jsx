import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const theme = useSelector((store) => store.theme);
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`
        w-full 
        ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-600'}
        py-4 
        px-6
        
        bottom-0
        left-0
        text-center
        text-sm
        md:text-base
        shadow-lg
      `}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
        <p className="text-center md:text-left">
          Copyright © {currentYear} - All rights reserved
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a 
            href="#" 
            className={`
              hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
              transition-colors
            `}
          >
            Terms of Service
          </a>
          <a 
            href="#" 
            className={`
              hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
              transition-colors
            `}
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className={`
              hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
              transition-colors
            `}
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;