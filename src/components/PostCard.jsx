import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function PostCard({post}) {
  console.log(post.featuredImage);
  return (
    <Link to={`/post/${post.$id}`}>
  <div className='w-full bg-gray-100 rounded-xl p-4'>
    <div className='w-full flex justify-center mb-4'>
      {post.featuredImage && (
        <img 
          src={appwriteService.getFilePreview(post.featuredImage)} 
          alt={post.title} 
          className="rounded-xl w-full h-80 object-cover"
        />
      )}
    </div>
    <h2 className='text-xl font-bold'>{post.title}</h2>
  </div>
</Link>
  )
}

export default PostCard