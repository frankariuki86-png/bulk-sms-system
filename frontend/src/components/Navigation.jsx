import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              SMS Hub
            </Link>
            <div className="hidden md:flex gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
              Dashboard
            </Link>
            <Link 
              to="/contacts" 
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Contacts
            </Link>
            <Link 
              to="/campaigns/create" 
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Create Campaign
            </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
