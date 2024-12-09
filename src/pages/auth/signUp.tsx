import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);



  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      const response = await axios.post('https://assignmentprojectbackend-1.onrender.com/api/auth/signup',
        data,
        { withCredentials: true }
      );

      if (response) {
        console.log('Signup successful');
        router.push('/');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }finally{
      setLoading(false);
    }
  };

  const handleGoogleSignUP = () => {
    window.location.href = 'https://assignmentprojectbackend-1.onrender.com/api/auth/google';
  };
  



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>
        <p className="text-center text-gray-600">Join us and unlock exclusive features!</p>

        {/* Username Field */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Username</label>
          <Input
            {...register('username', { required: 'Username is required' })}
            placeholder="Enter your username"
            className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Email</label>
          <Input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email format',
              },
            })}
            placeholder="Enter your email"
            className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Password</label>
          <Input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            placeholder="Enter your password"
            className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
         {loading ?  <Loader2 className="animate-spin" /> : 'Sign Up'}
        </Button>

        <Button
        type='button'
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={handleGoogleSignUP}
        >
          Sign Up with Google
        </Button>

       
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/signIn" className="text-indigo-600 hover:underline">
            Log In
          </Link>
        </p>
        
        
      </form>
    </div>
  );
};

export default Signup;
