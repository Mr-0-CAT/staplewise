import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from './LoginModal';
import { Role } from '@prisma/client';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const getDashboardRoute = () => {
    if (!user) return '/';
    switch (user.role) {
      case Role.ADMIN:
        return '/admin';
      case Role.SALES:
        return '/sales';
      case Role.SELLER:
        return '/seller';
      default:
        return '/';
    }
  };

  const isSellerPortal = location.pathname.startsWith('/seller');

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SW</span>
                </div>
                <span className="text-xl font-bold text-primary font-playfair">StapleWise</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {!isSellerPortal && (
                <>
                  <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
                  <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">Products</Link>
                  <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
                  <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact</Link>
                </>
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to={getDashboardRoute()}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                {!isSellerPortal && (
                  <>
                    <Link to="/" className="text-gray-700 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link to="/products" className="text-gray-700 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                    <Link to="/about" className="text-gray-700 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                  </>
                )}
                
                {user ? (
                  <>
                    <Link 
                      to={getDashboardRoute()}
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{user.name}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors text-left"
                  >
                    Login
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Header;