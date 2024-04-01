import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import service from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState([]);
    
    // when user click on edit post, user will go the edit page. So we can fetch the 
    // available data from the url. And to fetch data from url, useParams() can help us.
    const slug = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((posts) =>{
                if (posts) {
                    setPost(post);
                }
            })
        } else {
            navigate("/")
        }
    }, [slug, navigate]);
    
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost;
