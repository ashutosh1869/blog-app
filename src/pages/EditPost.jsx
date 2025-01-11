import React,{useState,useEffect} from 'react'
import { Container,PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useNavigate,useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState({})
    const {slug}= useParams()
    const navigate = useNavigate()
    useEffect(() => {
        appwriteService.getDocument(slug).then((post)=>{
            if(post){
                setPost(post)
        }else{
            navigate('/')
        }
        console.log(post);
        
    })
    }, [slug,navigate])

  return post? 
    <div>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  
  :null
}

export default EditPost