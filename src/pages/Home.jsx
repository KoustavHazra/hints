import React, { useEffect } from 'react';
import { Container, Postcard } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../store/postsSlice';
import service from '../appwrite/config';
import { setLoading } from '../store/authSlice';

function Home() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        dispatch(setLoading(true));
        service.getPosts([]).then((posts) => {
            if (posts) {
                dispatch(setPosts({ posts: posts }));
                dispatch(setLoading(false)); // Set loading to false when fetching completes
                console.log(`posts in all-posts page :: ${posts}`)
            }
        });
    }, [dispatch]);

    if (loading || !posts) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                            {/* we spreaded the post because we want to send all the posts 
                                together, and also where we are passing this data is also
                                taking it as a destructured format.
                            */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;
