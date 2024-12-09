'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Loader2 } from 'lucide-react';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignInFormData>();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignInFormData) => {

    console.log("data", data)
    try {
      const response = await axios.post('http://localhost:4000/api/auth/sign-in', data, { withCredentials: true });
      console.log("response", response);

      if (response) {
        reset();
        console.log('Signin successful');
      }

      router.push('/');

    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleLogInWithGoogle = async () => {
    window.location.href = 'http://localhost:4000/api/auth/google';
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign In</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full"
          />
          {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="w-full"
          />
          {errors.password && <p className="text-red-600 mt-1">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ?  <Loader2 className="animate-spin" /> : 'Sign In'}
        </Button>

        <Button
          type='button'
          className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={handleLogInWithGoogle}
        >
          Login with Google
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
