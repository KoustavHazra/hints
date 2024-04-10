import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch  } from "react-redux";
import { setUserName } from "../store/authSlice.js";

function Postcard({ $id, title, featuredImage }) {
  const maxLength = 10; 
  const truncatedTitle = title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  
  // console.log(userData.$id); 

  // useEffect(() => {
  //   if (userData.$id) {
  //     service
  //       .getPost(userData.$id) // Assuming getPost fetches the entire post document
  //       .then((response) => {
  //         if (response) {
  //           dispatch(setUserName(user.name));
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching post details:', error);
  //       });
  //   }
  // }, [userData.$id, dispatch]);

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full rounded-xl p-4' style={{ background: "#9E9E9E" }}>
        <div className='w-full h-40 mb-4 overflow-hidden rounded-xl'>
          {featuredImage && <img src={service.getFilePreview(featuredImage)} alt={title} className='object-cover w-full h-full' />}
        </div>
        <h2 className='text-xl font-bold title' style={{ textTransform: "capitalize", color: "white" }}>
          {truncatedTitle}
        </h2>
        {/* <p className='text-white'>{userData.name || 'Loading...'}</p> */}
      </div>
    </Link>
  )
}

export default Postcard;
