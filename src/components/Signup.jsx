import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as storeLogin } from '../store/authSlice';
import { Button, Logo, Input } from './index';
import {useDispatch} from "react-redux"
import authService from '../appwrite/auth';
import {useForm} from "react-hook-form";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    
    const signup = async (data) => {
        console.log(`data from signup.jsx file:: ${data}`);
        setError('');
        try {
            const userData = await authService.createAccount(data);
            console.log(`userdata is fetched in signup.jsx :: ${userData}`);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(storeLogin(userData));
                navigate('/');
            }            
        } catch (error) {
            console.log(`Error in signup method :: error :: ${error.message}`);
            setError(error.message);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen' style={{ marginTop: '-100px' }}>
            <div className='w-full max-w-md p-8 bg-white rounded-xl shadow'>
                <div className='mb-6 flex justify-center'>
                    <Logo width='100px' />
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
                <p className='mt-2 text-center text-base text-gray-600'>
                    Already have an account?{' '}
                    <Link to='/login' className='font-medium text-primary hover:underline'>
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(signup)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Full Name:'
                            placeholder='Enter your full name'
                            {...register('name', {
                                required: true,
                            })}
                        />
                        <Input
                            label='Email:'
                            placeholder='Enter your email'
                            type='email'
                            {...register('email', {
                                required: true,
                                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            })}
                        />
                        <Input
                            label='Password:'
                            type='password'
                            placeholder='Enter your password'
                            {...register('password', {
                                required: true,
                            })}
                        />
                        <Button type='submit' className='w-full'>
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
