import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

export function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  const navigationLinks = [
    { label: 'Dashboard', path: '/' },
    { label: 'Contacts', path: '/contacts' },
    { label: 'Create Campaign', path: '/campaigns/create' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-bold text-primary-600 flex-shrink-0">
            SMS Hub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-primary-600 transition text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline text-xs sm:text-sm text-gray-600 truncate max-w-[150px]">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="hidden sm:block px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition whitespace-nowrap"
            >
              Logout
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 inline-flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200 py-3 px-2 space-y-2 max-h-[calc(100vh-64px)] overflow-y-auto">
            {navigationLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-md transition text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="px-3 py-1 text-xs text-gray-600 truncate">
                {user.email}
              </p>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
