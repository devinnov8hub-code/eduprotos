"use client";

import { ReactElement, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '../assets/logo.png'
import { LayoutDashboardIcon, BookIcon, Menu, X } from "lucide-react";


const sidebarMenu = [
    {
        name: "Dashboard",
        icon: <LayoutDashboardIcon />,
        href: "/dashboard",
    },
    {
        name: "Courses",
        icon: <BookIcon />,
        href: "/courses",
    },
]

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#5955B3] text-white rounded-md"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/80 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed lg:static inset-y-0 left-0 z-40 min-h-screen
                    flex flex-col w-64 lg:w-1/5 p-6 h-full bg-[#5955B3]
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <Image 
                    src={logo} 
                    alt="logo" 
                    width={800} 
                    height={400}
                    className="w-full h-auto object-contain"
                />
                <div className="flex flex-col p-4 lg:p-10 gap-6 lg:gap-12">
                    {sidebarMenu.map((menuItem: {name: string, href: string, icon: ReactElement}) => (
                        <Link
                            key={menuItem.href}
                            className="flex items-center gap-2 text-white hover:text-gray-200 transition text-base lg:text-lg"
                            href={menuItem.href}
                            onClick={() => setIsOpen(false)}
                        >
                            {menuItem.icon} {menuItem.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}