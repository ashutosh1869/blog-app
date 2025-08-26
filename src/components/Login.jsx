import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input, Logo, Button } from './index';
import authservice from '../appwrite/auth';
import { login as authLogin } from '../store/authSlice';

function Login() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginUser = async (data) => {
        setError('');
        try {
            await authservice.login(data);
            const userData = await authservice.getCurrentUser();
            if (userData) {
                console.log("User data after login:", userData);
                dispatch(authLogin(userData));
                navigate('/');
            } else {
                setError('Failed to fetch user data');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="mx-auto w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-gray-200">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-24 h-24 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                        <Logo width="70%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl text-gray-800 font-extrabold mb-2 tracking-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-gray-500">
                    Don’t have an account?{' '}
                    <Link
                        to="/signup"
                        className="font-semibold text-purple-600 hover:text-pink-500 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && (
                    <p className="text-red-500 mt-6 text-center font-medium bg-red-50 rounded-lg py-2 px-4 border border-red-200">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit(loginUser)} className="mt-8">
                    <div className="space-y-6">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                            {...register('email', { required: true })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            className="rounded-lg border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                            {...register('password', { required: true })}
                        />
                        <Button
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-md hover:from-pink-500 hover:to-purple-500 transition-all duration-200"
                            type="submit"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;