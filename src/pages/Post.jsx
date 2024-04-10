import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // checking if the user is author -- if the post user id and the user's user id is same
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    // console.log(userData.$id);  // 6615ce2aa0687c3250a1

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {isAuthor && (
                    <div className="mt-8 flex justify-end">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
                <div className="w-full mx-auto border rounded-xl p-2" style={{ maxWidth: "800px" }}>
                    <h1 className="text-2xl font-bold title mt-4" style={{ textTransform: "capitalize", color: "white" }}>
                        {post.title}
                    </h1>
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="mx-auto mt-8 mb-8 rounded-xl"
                        style={{ maxWidth: "100%", height: "auto", verticalAlign: "middle" }}
                    />
                    <div className="browser-css mt-4" style={{ color: "white" }}>
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
        
    ) : null;

}