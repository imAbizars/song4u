'use client'
import Link from 'next/link'
export default function Navbar() {
  return (
    <nav className="sticky flex p-6  aligns-center justify-between px-20 shadow-sm">
        <h1 className="text-xl font-bold">
            Song4U
        </h1>
      <div className="space-x-6">
        <Link href="/" className="hover:text-yellow-300">
          Beranda
        </Link>
        <Link href="/about" className="hover:text-yellow-300">
          About
        </Link>
        <Link href="/support" className="hover:text-yellow-300">
          Support
        </Link>
      </div>
    </nav>
  )
}
