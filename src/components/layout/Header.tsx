import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../ui/Logo';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const activeClass = "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-pink-500 after:origin-bottom-right after:scale-x-100";
  const inactiveClass = "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-pink-500 after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100";

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/90 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="z-50">
            <Logo className="h-10 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({isActive}) => isActive ? activeClass : inactiveClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? activeClass : inactiveClass}>
              About
            </NavLink>
            <NavLink to="/projects" className={({isActive}) => isActive ? activeClass : inactiveClass}>
              Projects
            </NavLink>
            <NavLink to="/gallery" className={({isActive}) => isActive ? activeClass : inactiveClass}>
              Gallery
            </NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? activeClass : inactiveClass}>
              Contact
            </NavLink>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-gray-900/95 flex flex-col items-center justify-center space-y-8 text-xl transform transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <NavLink to="/" onClick={toggleMenu} className="hover:text-pink-500 transition-colors">
            Home
          </NavLink>
          <NavLink to="/about" onClick={toggleMenu} className="hover:text-pink-500 transition-colors">
            About
          </NavLink>
          <NavLink to="/projects" onClick={toggleMenu} className="hover:text-pink-500 transition-colors">
            Projects
          </NavLink>
          <NavLink to="/gallery" onClick={toggleMenu} className="hover:text-pink-500 transition-colors">
            Gallery
          </NavLink>
          <NavLink to="/contact" onClick={toggleMenu} className="hover:text-pink-500 transition-colors">
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;