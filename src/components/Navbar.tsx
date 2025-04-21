import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, BarChart2, User as UserIcon, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <BarChart2 className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-white">VestBlock</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
                  Home
                </Link>
                {user && (
                  <>
                    <Link to="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
                      Dashboard
                    </Link>
                    <Link to="/pro-analysis" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
                      Pro Analysis
                    </Link>
                    <Link to="/analyze" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
                      Direct Analysis
                    </Link>
                  </>
                )}
                {isAdmin && (
                  <Link to="/admin" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
                    Admin
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-300">{user.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                        <UserIcon className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                          <Shield className="h-4 w-4" />
                          <span>Admin</span>
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="btn btn-ghost">
                    Log in
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
              Home
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
                  Dashboard
                </Link>
                <Link to="/pro-analysis" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
                  Pro Analysis
                </Link>
                <Link to="/analyze" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
                  Direct Analysis
                </Link>
              </>
            )}
            {isAdmin && (
              <Link to="/admin" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
                Admin
              </Link>
            )}
          </div>
          
          {user ? (
            <div className="border-t border-gray-800 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">{user.email}</div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {isAdmin ? 'Admin' : 'User'}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-800 p-4 flex flex-col gap-2">
              <Link to="/login" className="btn btn-ghost w-full">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-primary w-full">
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}