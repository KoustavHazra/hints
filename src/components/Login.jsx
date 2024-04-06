import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as storeLogin } from '../store/authSlice';
import { Button, Logo, Input } from './index';
import {useDispatch} from "react-redux"
import authService from '../appwrite/auth';
import {useForm} from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState('');
    
    
    // here login we are using to handle the form submit.
    // Usually in all form submit, we create this function with the name of handleSubmit.
    // however since here we already have another handleSubmit, created using useForm. 
    // so both function having same name, can created confusion, or may crash the code. Thus creating
    // this function name as login.
    const login = async (data) => {
        
        console.log(`data from login.jsx file:: ${data}`);

        setError('');  // as login is completed successfully, the errors should be clear. That is what we are doing here.
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();  // used await because we are not getting the user data from
                // the session, we are getting it by using the getCurrentUser() method - which is an async process.
                // if we go to '../appwrite/auth', we can see the getCurrentUser() is an async method.

                if (userData) dispatch(storeLogin(userData));
                // we are dispatching the userData using storeLogin, which is login from store/authSlice only.
                // we just named it here as storeLogin, so that there is no confusion between the login from store
                // and the login function we created here in this file.
                
                navigate('/');
                // and now that used is logged in, we are redirecting them to the root directory.
                // we didn't used Link here, because in case of Link we have to click somewhere to navigate to.
                // Whereas in navigate, we automatically get redirected to a route.
            }
        } catch (error) {
            console.log(`Error in login method :: error :: ${error}`);
            setError(error.message);  // if error still comes, we can save it in the state, thus it is available in every state.
        }
    };
    return (
        <div className='flex items-center justify-center min-h-screen' style={{ marginTop: '-25px' }}>
            <div className='w-full max-w-md p-8 bg-white rounded-xl shadow'>
                <div className='mb-6 flex justify-center'>
                    <Logo width='100px' />
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-gray-600'>
                    Don't have an account?{' '}
                    <Link to='/signup' className='font-medium text-primary hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Email:'
                            placeholder='Enter your email'
                            type='email'
                            {...register('email', {
                                // here we must add the ... before register, otherwise if in any other input form
                                // if we use register, the input values in that input form will be overwritten.
                                required: true,
                                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            })}
                        />
                        <Input
                            label='Password:'
                            type='password'
                            placeholder='Enter your password'
                            {...register('password', { required: true })}
                        />
                        <Button type='submit' className='w-full'>
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login
