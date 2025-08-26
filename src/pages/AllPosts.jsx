import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen py-10">
            <Container>
                <h1 className="text-4xl font-bold text-center text-purple-700 mb-10 drop-shadow-lg">
                    All Posts
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300"
                        >
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;