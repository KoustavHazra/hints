import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from '../src/components/index';
import { Outlet } from 'react-router-dom';

function App() {

  // to check user is logged in or not
  // also as we need to fetch our data from appwrite or db or network.. as it happens
  // sometimes it might take some time.
  // So it is a good practice to keep a conditional rendering in our code.
  // If logged in, we will show our data; if not, we will show loading status..
  const [loading, setLoading] = useState(true);
  // next we will use useEffect on it.. so that it the starting of our application..
  // this automatically starts running. That's why we kept true inside useState().
  // and within useEffect we will put it as false.. so that the data will 
  // already be there for us, and once we login.. the data is already present for us.

  const dispatch = useDispatch();
  // using this since we need to work between react and redux. And to send some data like
  // user logged in.. 


  // we are initializing the useEffect.. and getting the userdata as soon as user logs in.
  // however we are breaking it into two steps.. if userData is avaialble, then login user.
  // if not, then logout() will run automatically. It basically helps to keep the state updated.
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch(`Problem occured while fething user details in App.`)
    .finally(() => setLoading(false))
  }, []);
  // since no matter what, finally will always run.. we used to keep setLoading as false.
  // so if user logs in or stays log out.. at the end, finally will run and change the 
  // setLoading as false.
  // again when someone tries to login, the whole method will continue.


  // we will be doing conditional rendering, based on the user login status we will
  // return different things.
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-green-700'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (<h2>Loading...</h2>)
}

export default App;
