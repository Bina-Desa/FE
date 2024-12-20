import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    navigate('/login');
    return false;
  }

  return true;
}
