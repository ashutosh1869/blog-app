import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { Input, Logo,Button } from './index'
function Signup() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const create = async(data) => {
        console.log(data)
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
        <div>
            <div className="flex items-center justify-center">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block  text-black w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl text-black font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            type="text"
                            {...register('name', {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                // validate: {
                                //     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                //         "Email address must be a valid address",
                                // }
                            })}
                        />
                        <Input
                            label='password:'
                            placeholder='Enter your password'
                            type='password'
                            {...register('password',{
                                required: true,
                            })}
                        />
                        <Button
                            
                            className='w-full'
                            type='submit'
                            
                        >Create Account</Button>
                    </div>
                </form>
                </div>
                
            </div>
        </div>
    )
}

export default Signup