'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-sm md:px-20">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl font-bold z-50 focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {/* Mobile: Logo */}
        <h1 className="text-xl font-bold md:hidden mr-3">Song4U</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <h1 className="text-xl font-bold mr-8">Song4U</h1>
          <Link href="/" >Beranda</Link>
          <Link href="/about">About</Link>
          <Link href="/message">Message</Link>
        </div>
      </nav>

      {/* (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 pt-20 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <ul className="space-y-4">
            <li><Link href="/" onClick={toggleSidebar} className="block">Beranda</Link></li>
            <li><Link href="/about" onClick={toggleSidebar} className="block">About</Link></li>
            <li><Link href="/message" onClick={toggleSidebar} className="block">Message</Link></li>
          </ul>
        </div>
      </div>

      {/* sidebar terbuka */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-30"
          onClick={toggleSidebar}
        ></div>
      )}

    </>
  )
}
