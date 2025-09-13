
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Button from './Button';

const Header: React.FC = () => {
  const { user, logout } = useAppContext();

  const activeLinkClass = "text-primary font-semibold";
  const inactiveLinkClass = "text-gray-600 hover:text-primary transition-colors";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            ShareBite
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Browse Food</NavLink>
            {user && <NavLink to="/post" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Post Food</NavLink>}
            {user && <NavLink to="/profile" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>Profile</NavLink>}
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="font-medium hidden sm:inline">{user.name}</span>
                </div>
                <Button onClick={logout} variant="secondary" size="sm">Logout</Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
