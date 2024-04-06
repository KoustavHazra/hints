import React, { useEffect } from 'react'
import {Container, PostForm} from '../components'
import service from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
import { setPosts } from '../store/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

function EditPost() {
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();

    // when user click on edit post, user will go the edit page. So we can fetch the 
    // available data from the url. And to fetch data from url, useParams() can help us.
    const {slug} = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (slug) {
    //         service.getPost(slug).then((post) =>{
    //             if (post) {
    //                 setPost(post);
    //             }
    //         })
    //     } else {
    //         navigate("/")
    //     }
    // }, [slug, navigate]);

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    dispatch(setPosts({ posts: post }));
                }
            });
        } else {
            navigate("/")
        }
    }, [slug, navigate, dispatch]);
    
    return posts ? (
        <div className='py-8'>
            <Container>
                <PostForm post={posts} />
            </Container>
        </div>
    ) : null
}

export default EditPost;
