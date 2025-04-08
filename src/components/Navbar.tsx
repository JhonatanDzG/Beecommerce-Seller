'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("#user-menu-button")) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <nav className="bg-gray-900 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/bee.png" alt="beecommerce" width={32} height={32} />
          <span className="text-2xl font-semibold text-white">Beecommerce</span>
        </Link>

        {/* Contenedor de Menús */}
        <div className="flex items-center space-x-4 md:order-2">
          
          {/* Botón de usuario */}
          <div className="relative">
            <button
              id="user-menu-button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-300"
            >
              <Image
                className="w-10 h-10 rounded-full cursor-pointer"
                src="/usuario.png"
                alt="user photo"
                width={40}
                height={40}
              />
            </button>

            {/* Menú desplegable del usuario */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b">
                  <span className="block text-sm font-medium text-gray-900">Bonnie Green</span>
                  <span className="block text-sm text-gray-500">name@flowbite.com</span>
                </div>
                <ul className="py-2">
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="/earnings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Earnings
                    </Link>
                  </li>
                  <li>
                    <Link href="/signout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Botón hamburguesa para móviles */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center text-sm bg-white rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Menú de navegación */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:w-auto w-full`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 text-white">
            <li><Link href="/" className="block py-2 px-3 hover:text-gray-400">Home</Link></li>
            <li><Link href="/about" className="block py-2 px-3 hover:text-gray-400">About</Link></li>
            <li><Link href="/services" className="block py-2 px-3 hover:text-gray-400">Services</Link></li>
            <li><Link href="/pricing" className="block py-2 px-3 hover:text-gray-400">Pricing</Link></li>
            <li><Link href="/contact" className="block py-2 px-3 hover:text-gray-400">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
