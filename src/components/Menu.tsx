import { useNavigate } from 'react-router-dom';
import { useFirebaseUser } from '../hooks/useFirebaseUser';
import Button from './Button';

export default function Menu() {
  const { user, logout } = useFirebaseUser();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <div className='flex flex-row justify-end space-x-3 p-4 bg-sky-800 '>
      <Button 
        variant="primary"
        className='bg-orange-300 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded' 
        onClick={() => navigate('/home')}
      >
        Home
      </Button>
      
      <Button 
        variant="primary"
        className='bg-orange-300 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded' 
        onClick={() => navigate('/posts')}
      >
        Posts
      </Button>

      <Button 
        variant="primary"
        className='bg-orange-300 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded' 
        onClick={logout}
      >
        Sign Out
      </Button>
      
    </div>
  );
};
