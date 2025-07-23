"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import { createClient } from "@/lib/supabase/client" // Importa el cliente de Supabase
import { useRouter } from "next/navigation" // Importa useRouter para redireccionar

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

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const supabase = createClient() // Inicializa el cliente de Supabase
  const router = useRouter() // Inicializa el router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`, // URL a la que Supabase redirigirá después de la confirmación por correo
      },
    })

    if (signUpError) {
      setError(signUpError.message)
    } else {
      setSuccess("¡Registro exitoso! Por favor, revisa tu correo electrónico para confirmar tu cuenta.")
      // Opcional: redirigir al usuario a una página de confirmación o a la página de inicio de sesión
      // router.push('/login');
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
          <CardTitle className="text-3xl font-bold" style={{ color: "#B6862C" }}>
            <User className="inline-block h-8 w-8 mr-2" /> Registrarse
          </CardTitle>
          <p className="text-sm" style={{ color: "#121212" }}>
            Crea tu cuenta de cliente
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
              Registrarse
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="mt-2 text-sm" style={{ color: "#121212" }}>
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-[#B6862C] hover:underline font-semibold">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
