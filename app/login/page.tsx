"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

// Componente de patrón árabe decorativo (para consistencia)
const ArabicPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 opacity-10 ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="arabicPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="#B6862C">
            <circle cx="30" cy="30" r="2" />
            <path d="M15,15 L45,15 L45,45 L15,45 Z" fill="none" stroke="#B6862C" strokeWidth="0.5" />
            <path d="M30,15 L45,30 L30,45 L15,30 Z" fill="none" stroke="#B6862C" strokeWidth="0.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#arabicPattern)" />
    </svg>
  </div>
)

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // --- Lógica de autenticación simulada ---
    // En un proyecto real, aquí harías una llamada a tu API de autenticación
    // Por ejemplo, usando fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
    // O usando una librería como Auth.js o Supabase Auth.

    if (email === "test@example.com" && password === "password123") {
      setSuccess("¡Inicio de sesión exitoso! Redirigiendo...")
      // En un proyecto real, redirigirías al usuario a su dashboard o página principal
      // router.push('/dashboard');
    } else {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-4"
      style={{ background: "linear-gradient(180deg, #121212 0%, #1a1a1a 100%)" }}
    >
      <ArabicPattern className="fixed inset-0 opacity-5" />
      <Card
        className="w-full max-w-md relative z-10 border-4 border-[#B6862C] shadow-2xl"
        style={{ background: "linear-gradient(135deg, #F8F1E7 0%, #E8D5C4 100%)" }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold" style={{ color: "#8B0000" }}>
            <User className="inline-block h-8 w-8 mr-2" /> Iniciar Sesión
          </CardTitle>
          <p className="text-sm" style={{ color: "#121212" }}>
            Accede a tu cuenta de cliente
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-lg font-semibold" style={{ color: "#121212" }}>
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-[#B6862C] focus:border-[#8B0000] mt-1"
                style={{ backgroundColor: "#F8F1E7", color: "#121212" }}
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-lg font-semibold" style={{ color: "#121212" }}>
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 border-[#B6862C] focus:border-[#8B0000] mt-1"
                style={{ backgroundColor: "#F8F1E7", color: "#121212" }}
              />
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}
            {success && <p className="text-green-600 text-center">{success}</p>}

            <Button
              type="submit"
              className="w-full text-xl py-6 border-4 border-[#B6862C] hover:scale-105 transition-all duration-300 shadow-lg"
              style={{
                backgroundColor: "#8B0000",
                color: "#F8F1E7",
                background: "linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)",
              }}
            >
              Iniciar Sesión
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link href="#" className="text-[#8B0000] hover:underline font-semibold">
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="mt-2 text-sm" style={{ color: "#121212" }}>
              ¿No tienes cuenta?{" "}
              <Link href="#" className="text-[#B6862C] hover:underline font-semibold">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
