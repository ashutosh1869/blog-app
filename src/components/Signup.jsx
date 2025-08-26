import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { Input, Logo, Button } from './index'

function Signup() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const create = async (data) => {
        try {
            const success = await authservice.createAccount(data)
            if (success) {
                navigate('/login')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="mx-auto w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-24">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-2">Create your account</h2>
                <p className="text-center text-base text-gray-500 mb-6">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-600 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-6">
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            type="text"
                            className="bg-gray-50"
                            {...register('name', { required: true })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="bg-gray-50"
                            {...register("email", { required: true })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            className="bg-gray-50"
                            {...register('password', { required: true })}
                        />
                        <Button
                            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
                            type="submit"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
