import React from 'react';
import { LogoIcon, DashboardIcon, DocumentTextIcon, ClipboardCheckIcon } from './icons';

interface SidebarProps {
    activeItem: string;
    onItemClick: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
    const navItems = [
        { name: 'Dashboard', icon: DashboardIcon },
        { name: 'Penilaian', icon: ClipboardCheckIcon },
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white flex-col flex-shrink-0 hidden lg:flex">
            <div className="flex items-center justify-center h-20 border-b border-gray-700 px-4">
                <LogoIcon className="h-10 w-10 mr-3 flex-shrink-0" />
                <h1 className="text-xl font-bold whitespace-nowrap">Syahadah SDQ</h1>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.name}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onItemClick(item.name)
                                }}
                                className={`flex items-center py-3 px-4 rounded-md transition-colors duration-200 ${
                                    activeItem === item.name
                                        ? 'bg-teal-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                                aria-current={activeItem === item.name ? 'page' : undefined}
                            >
                                <item.icon className="h-5 w-5 mr-4" />
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;