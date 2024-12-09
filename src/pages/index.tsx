import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import { set, useForm } from 'react-hook-form';
import { Button, } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/ui/Navbar';
import { UserCard } from '@/components/UserCard';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import { Loader, Loader2 } from 'lucide-react';

interface FormData {
  username: string;
  lastName: string;
  userImage: FileList;
}

interface UserData {
  username: string;
  lastName: string;
  userImage: string;
}

const Index = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('');

  //fetch current user and if not current user redirect to login page
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/getCurrentUser', { withCredentials: true });

        console.log("current user", response);
        setCurrentUser(response?.data.user);

        dispatch(setUser(response?.data.user));

      } catch (error) {
        console.log("err", error);
      }
    };

    fetchCurrentUser();

    if (!currentUser) {
      // router.replace('/auth/signIn');
    }
  }, []);


  //fetch userdata
  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await axios.get('http://localhost:4000/api/userData/getUserData', { withCredentials: true });
        if (response.data.userData) {
          setUserData(response.data.userData)
        }

      } catch (error) {
        console.log("err", error);
      }
    }

    fetchUserData();

    if(userData){
      setCurrentTab("User Data")
    }
  }, [currentUser,currentTab]);



  const handleUploadUserData = async (data: FormData) => {

    if(!currentUser){
      alert("Please sign in to upload user data");
      router.push("/auth/signIn");
    }


    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('lastName', data.lastName);
    formData.append('userImage', data.userImage[0]);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/userData/createUserData', {
        username: data.username,
        lastName: data.lastName,
        userImage: data.userImage[0],
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      setLoading(false);
      console.log("userdata uploaded", response);
      reset();
      setUserData(response.data.userData);

      setCurrentTab("User Data")
    } catch (error: any) {
      console.error("Error uploading user data:", error?.message);
    }
  }



  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {currentTab === "User Data" && userData ?

          <UserCard username={userData?.username} lastName={userData?.lastName} userImage={userData?.userImage} />

          :
          <form
            onSubmit={handleSubmit(handleUploadUserData)}
            className="w-full max-w-md bg-white p-6 shadow-md rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload User Data</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <Input
                {...register("username", { required: 'Username is required' })}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && <p className="text-red-600 mt-1">username is required</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Last Name</label>
              <Input
                {...register("lastName", { required: 'Last name is required' })}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && <p className="text-red-600 mt-1">lastname is required</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">User Image</label>
              <Input
                type="file"
                {...register("userImage", { required: 'User image is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.userImage && <p className="text-red-600 mt-1">user image is required</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Upload'}
            </Button>
          </form>

        }
      </div>
    </>

  );
};

export default Index;
