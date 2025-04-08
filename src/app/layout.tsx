'use client'

import './globals.css'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const hideNavbarRoutes = ['/auth/register', '/auth/login', '/auth/reset-password']

  const shouldHideNavbar = hideNavbarRoutes.includes(pathname)

  return (
    <html lang="es">
      <body className="bg-gray-100">
        {!shouldHideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  )
}
