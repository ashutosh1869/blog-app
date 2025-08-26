import { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { PostCard, Container } from '../components';
import { useSelector } from 'react-redux';

function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (userData === null) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-blue-200 to-purple-100 flex justify-center items-center">
        <Container>
          <div className="flex justify-center items-center">
            <div className="bg-white rounded-3xl shadow-2xl p-14 text-center max-w-lg mx-auto border border-gray-200 transition-all hover:shadow-blue-200">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-extrabold text-indigo-700 mb-3 tracking-tight">Welcome to MegaBlog</h1>
                <p className="text-gray-600 text-lg">Please login to read amazing posts and stories</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-purple-50 flex justify-center items-start py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="w-full transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;