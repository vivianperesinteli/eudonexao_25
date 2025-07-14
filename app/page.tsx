"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import Dashboard from "@/components/dashboard"
import AdminDashboard from "@/components/admin-dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const handleLogin = (name: string) => {
    setUserName(name)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
    setIsAdmin(false)
  }

  const handleAdminToggle = () => {
    setIsAdmin(!isAdmin)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : isAdmin ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <Dashboard userName={userName} onLogout={handleLogout} />
      )}

      {/* Botão para alternar modo admin - apenas para desenvolvimento */}
      {isLoggedIn && (
        <button
          onClick={handleAdminToggle}
          className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm z-50"
        >
          {isAdmin ? "Modo Usuário" : "Modo Admin"}
        </button>
      )}
    </main>
  )
}
