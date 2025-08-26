import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, PostForm } from '../components';
import authservice from '../appwrite/auth';

function AddPost() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            try {
                const user = await authservice.getCurrentUser();
                setIsAuthenticated(!!user);
                if (!user) {
                    navigate('/login');
                }
            } catch (error) {
                setIsAuthenticated(false);
                navigate('/login');
            }
        }
        checkAuth();
    }, [navigate]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className='py-8 w-full bg-gradient-to-t from-blue-100 to-purple-100'>
            <Container>
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;