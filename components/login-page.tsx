"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface LoginPageProps {
  onLogin: (name: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulando login - em produção seria uma validação real
    onLogin("Marcelo")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/instituto-claro-logo.png"
              alt="Instituto Claro"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold" style={{ color: "#DA291C" }}>
            Educonexão
          </CardTitle>
          <p className="text-gray-600 text-sm mt-2">Programa de capacitação para professores em tecnologias</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail ou Celular
              </label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail ou celular"
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full text-white font-medium" style={{ backgroundColor: "#DA291C" }}>
              Entrar na Plataforma
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">Esqueceu sua senha? Entre em contato com nossa equipe</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
