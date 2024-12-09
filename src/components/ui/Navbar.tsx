'use client';

import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button'; // ShadCN Button
import axios from 'axios';
import { useSelector } from 'react-redux';



const Navbar = () => {
  const router = useRouter();
  const userData = useSelector((state: any) => state.user.userData);

  console.log("userdata in navbar", userData);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/logout', { withCredentials: true });
      console.log(response);
      alert('Logged out successfully');

      router.push('/auth/signIn');
    } catch (error: any) {
      console.error("Error logging out:", error?.message);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-xl font-bold text-gray-800 cursor-pointer"
          onClick={() => router.push('/')}
        >
          MyApp
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <a
            href="/"
            className="text-gray-700 hover:text-blue-500 font-medium transition duration-150"
          >
            Home
          </a>
          {!userData &&
            <>
              <a href="/auth/signUp" className="text-gray-700 hover:text-blue-500">
                Sign Up
              </a>
              <a href="/auth/signIn" className="text-gray-700 hover:text-blue-500">
                Sign In
              </a>
            </>
          }

          {userData &&
            <>
              <span className="font-medium text-gray-800">
                {userData?.username}
              </span>
            </>
          }

          <Button
            onClick={handleLogout}
            className="bg-red-500 text-white hover:bg-red-600 transition duration-150"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
