
import React from 'react';
import { LogoIcon, BellIcon, UserCircleIcon } from './icons';

interface HeaderProps {
    activeItem: string;
    onItemClick: (name: string) => void;
}

const NavLink: React.FC<{ name: string; activeItem: string; onClick: (name: string) => void; isMobile?: boolean; }> = ({ name, activeItem, onClick, isMobile = false }) => {
    const isActive = activeItem === name;
    
    const baseClasses = 'py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200';
    const desktopClasses = `py-2 ${isActive ? 'font-bold text-teal-600 border-b-2 border-teal-500' : 'text-gray-500 hover:text-gray-800'}`;
    const mobileClasses = `flex-1 text-center ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-500'}`;

    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick(name);
            }}
            className={isMobile ? `${baseClasses} ${mobileClasses}` : desktopClasses}
            aria-current={isActive ? 'page' : undefined}
        >
            {name}
        </a>
    );
};


const Header: React.FC<HeaderProps> = ({ activeItem, onItemClick }) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left & Center Combined for simplicity */}
                    <div className="flex items-center gap-x-8">
                        <button onClick={() => onItemClick('Dashboard')} className="flex-shrink-0 flex items-center gap-2 text-lg font-bold text-gray-800">
                           <LogoIcon className="h-8 w-8" />
                           <span>Syahadah SDQ</span>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-4">
                            <NavLink name="Dashboard" activeItem={activeItem} onClick={onItemClick} />
                            <NavLink name="Penilaian" activeItem={activeItem} onClick={onItemClick} />
                        </nav>
                    </div>


                    {/* Right side: User actions */}
                    <div className="flex items-center space-x-4">
                         <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" />
                        </button>
                        <div className="relative">
                           <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                           </div>
                        </div>
                    </div>
                </div>
            </div>
             {/* Mobile Navigation */}
            <nav className="md:hidden border-t border-gray-200">
                <div className="flex items-center">
                    <NavLink name="Dashboard" activeItem={activeItem} onClick={onItemClick} isMobile={true} />
                    <NavLink name="Penilaian" activeItem={activeItem} onClick={onItemClick} isMobile={true} />
                </div>
            </nav>
        </header>
    );
};

export default Header;