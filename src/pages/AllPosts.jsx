import React, { useEffect } from 'react';
import { Container, Postcard } from '../components';
import service from '../appwrite/config';
import { setPosts } from '../store/postsSlice';
import { setLoading } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function AllPosts() {
    const loading = useSelector((state) => state.auth.loading);
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        service.getPosts([]).then((posts) => {
            if (posts) {
                dispatch(setPosts(posts.documents));
                dispatch(setLoading(false)); // Set loading to false when fetching completes
            }
        });
    }, [dispatch]); // Include dispatch in the dependency array

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
      )
}

export default AllPosts;
