"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { User } from "lucide-react"

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  
  useEffect(() => {
    // cek apakah token ada di localStorage
    const token = localStorage.getItem("token");

    // mengambil username di localStorage
    const user = localStorage.getItem("user")
    if (!user) return;
  
    if (token) {
      setIsLoggedIn(true);
      setUserName(user)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false)
    setUserName("")
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl lg:max-w-full mx-auto lg:mx-6 px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          WeRent
        </Link>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <User className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
