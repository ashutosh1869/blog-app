import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {PostCard,Container} from '../components'
import { useSelector } from 'react-redux';
function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    appwriteService.getPosts().then((posts)=>{
      if(posts){
        setPosts(posts.documents)
      }
    }) 
  },[])

  if(userData===null){
    return(
      <div className='w-full h-full flex justify-center items-center'>
        <Container>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2 xl:w-1/3 p-2'>
                <h1>Login to read posts</h1>
              
              </div>
          </div>
        </Container>
        
      </div>
    )
  }
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post)=>(
            <div key={post.$id} className='w-full md:w-1/2 xl:w-1/3 p-2'>
              <PostCard post={post}/>
            </div>
          ))}
        </div>
      </Container>
      
    </div>
  )
  
}

export default Home