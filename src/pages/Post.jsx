import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import authservice from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            appwriteService.getDocument(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            }).catch(() => {
                navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    useEffect(() => {
        if (!userData) {
            authservice.getCurrentUser().then((user) => {
                if (user) {
                    dispatch(authLogin(user));
                } else {
                    navigate("/login");
                }
            }).catch(() => {
                navigate("/login");
            });
        }
    }, [userData, navigate, dispatch]);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const editPost = () => {
        navigate(`/edit-post/${post.$id}`);
    };

    const deletePost = async () => {
        try {
            const postDeleted = await appwriteService.deletePost(post.$id);
            if (postDeleted) {
                if (post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
                navigate("/");
            }
        } catch (error) {
            // Handle error
        }
    };

    return post ? (
        <div className="py-10 bg-white min-h-screen">
            <Container>
                <div className="w-full flex justify-center mb-6 relative border border-gray-200 rounded-xl p-4 bg-white">
                    {post.featuredImage && (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl max-h-96 w-full object-cover border border-gray-200"
                        />
                    )}


                    {isAuthor && (
                        <div className="absolute right-8 top-8 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-black"
                                    className="mr-2 text-white font-medium"
                                    onClick={editPost}
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-black"
                                className="text-white font-medium"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-8 text-center">
                    <h1 className="text-3xl font-bold text-black mb-2">{post.title}</h1>
                    <div className="text-sm text-gray-700 italic">
                        {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
                    </div>
                </div>
                <div className="browser-css px-4 py-6 bg-white rounded-lg border border-gray-200 text-black">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
