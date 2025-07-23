"use client"

import { useState } from "react"
import Link from "next/link" // Importar Link para la navegación
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Minus, Phone, Plus, ShoppingCart, User } from "lucide-react" // Añadir User icon

// Componente de patrón árabe decorativo
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

// Ornamento árabe decorativo
const ArabicOrnament = ({ size = "w-16 h-16" }: { size?: string }) => (
  <div className={`${size} mx-auto`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <g fill="#B6862C">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#B6862C" strokeWidth="2" />
        <path d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,55 L30,65 L35,45 L20,30 L40,30 Z" />
        <circle cx="50" cy="50" r="15" fill="#8B0000" />
        <circle cx="50" cy="50" r="8" fill="#B6862C" />
      </g>
    </svg>
  </div>
)

// Separador árabe decorativo
const ArabicDivider = () => (
  <div className="flex items-center justify-center my-8">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B6862C] to-transparent"></div>
    <div className="mx-4">
      <svg width="40" height="20" viewBox="0 0 40 20">
        <path d="M5,10 Q10,5 15,10 Q20,15 25,10 Q30,5 35,10" fill="none" stroke="#B6862C" strokeWidth="2" />
        <circle cx="20" cy="10" r="3" fill="#B6862C" />
      </svg>
    </div>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#B6862C] to-transparent"></div>
  </div>
)

const menuItems = [
  {
    category: "Especialidades Tradicionales",
    items: [
      {
        name: "Warak Dawaly",
        arabicName: "ورق دوالي", // Keeping arabicName for internal data, but not displayed
        description: "Niños envueltos en parra - Deliciosas hojas de parra rellenas con arroz y especias",
        price: 3,
        image: "/placeholder.svg?height=200&width=300",
        query: "Warak Dawaly Palestinian food",
      },
      {
        name: "Maluf",
        arabicName: "ملفوف",
        description: "Niños envueltos en repollo - Hojas de repollo rellenas con carne y arroz",
        price: 3,
        image: "/placeholder.svg?height=200&width=300",
        query: "Maluf Palestinian food",
      },
      {
        name: "Mahmabeom",
        arabicName: "محمبعوم",
        description: "Acompaña pollo y caldo - Plato tradicional palestino completo",
        price: 65,
        image: "/placeholder.svg?height=200&width=300",
        query: "Mahmabeom Palestinian chicken and broth",
      },
    ],
  },
  {
    category: "Kibes y Aperitivos",
    items: [
      {
        name: "Kibes Rellenos",
        arabicName: "كبة محشية",
        description: "Tradicionales kibes palestinos rellenos de carne y especias",
        price: 7,
        image: "/placeholder.svg?height=200&width=300",
        query: "Kibes Rellenos Palestinian food",
      },
      {
        name: "Mini Kibes Rellenos",
        arabicName: "كبة صغيرة",
        description: "Versión pequeña de nuestros deliciosos kibes",
        price: 5,
        image: "/placeholder.svg?height=200&width=300",
        query: "Mini Kibes Rellenos Palestinian food",
      },
      {
        name: "Kibe Natural (1 kg)",
        arabicName: "كبة نية",
        description: "Kibe natural fresco, perfecto para compartir",
        price: 160,
        image: "/placeholder.svg?height=200&width=300",
        query: "Kibe Natural Palestinian food",
      },
    ],
  },
  {
    category: "Dips y Salsas",
    items: [
      {
        name: "Hummus (250 gr)",
        arabicName: "حمص",
        description: "Cremoso hummus tradicional con garbanzos y tahini",
        price: 45,
        image: "/placeholder.svg?height=200&width=300",
        query: "Hummus dip",
      },
      {
        name: "Baba Ganoush (250 gr)",
        arabicName: "بابا غنوج",
        description: "Deliciosa pasta de berenjenas asadas con especias",
        price: 45,
        image: "/placeholder.svg?height=200&width=300",
        query: "Baba Ganoush dip",
      },
      {
        name: "Salsa de Yogurth (250 gr)",
        arabicName: "لبنة",
        description: "Refrescante salsa de yogurt con hierbas",
        price: 40,
        image: "/placeholder.svg?height=200&width=300",
        query: "Yogurt sauce dip",
      },
    ],
  },
  {
    category: "Platos Principales",
    items: [
      {
        name: "Costillar de Cordero",
        arabicName: "ضلع خروف",
        description: "Con ensalada de tahine - Nuestro plato estrella",
        price: 850,
        image: "/placeholder.svg?height=200&width=300",
        query: "Lamb Ribs Palestinian food",
      },
      {
        name: "Arroz Árabe con Almendras",
        arabicName: "رز بالوز",
        description: "Arroz aromático con almendras españolas",
        price: 120,
        image: "/placeholder.svg?height=200&width=300",
        query: "Arabic Rice with Almonds",
      },
      {
        name: "Kabab",
        arabicName: "كباب",
        description: "Brochetas de carne especiada a la parrilla",
        price: 16,
        image: "/placeholder.svg?height=200&width=300",
        query: "Kabab skewers",
      },
      {
        name: "Minikabab",
        arabicName: "كباب صغير",
        description: "Versión pequeña de nuestros kababs",
        price: 8,
        image: "/placeholder.svg?height=200&width=300",
        query: "Mini Kabab skewers",
      },
    ],
  },
  {
    category: "Especialidades y Acompañamientos",
    items: [
      {
        name: "Masakin",
        arabicName: "مساكين",
        description: "Especialidad de la casa con sabores únicos",
        price: 14,
        image: "/placeholder.svg?height=200&width=300",
        query: "Masakin Palestinian dish",
      },
      {
        name: "Sajás",
        arabicName: "سجق",
        description: "Deliciosos bocadillos árabes",
        price: 9,
        image: "/placeholder.svg?height=200&width=300",
        query: "Sajas Arabic snacks",
      },
      {
        name: "Papa Rellena",
        arabicName: "بطاطا محشية",
        description: "Papas rellenas al estilo árabe",
        price: 8,
        image: "/placeholder.svg?height=200&width=300",
        query: "Stuffed Potato Arabic style",
      },
      {
        name: "Kusa o Zanahoria Rellena",
        arabicName: "كوسا محشية",
        description: "Vegetales rellenos con arroz y carne",
        price: 10,
        image: "/placeholder.svg?height=200&width=300",
        query: "Stuffed Zucchini or Carrot Palestinian food",
      },
      {
        name: "Shusbarak (100 unidades)",
        arabicName: "شوشبرك",
        description: "Tradicionales dumplings árabes",
        price: 150,
        image: "/placeholder.svg?height=200&width=300",
        query: "Shusbarak Arabic dumplings",
      },
      {
        name: "Taboule",
        arabicName: "تبولة",
        description: "Ensalada fresca de perejil, tomate y bulgur",
        price: 80,
        image: "/placeholder.svg?height=200&width=300",
        query: "Taboule salad",
      },
    ],
  },
  {
    category: "Bebidas y Pan",
    items: [
      {
        name: "Laban (1 litro)",
        arabicName: "لبن",
        description: "Bebida tradicional de yogurt",
        price: 90,
        image: "/placeholder.svg?height=200&width=300",
        query: "Laban yogurt drink",
      },
      {
        name: "Pan Pita (Docena)",
        arabicName: "خبز عربي",
        description: "Pan árabe fresco y esponjoso",
        price: 10,
        image: "/placeholder.svg?height=200&width=300",
        query: "Pita bread",
      },
      {
        name: "Coca-Cola (500 ml)",
        arabicName: "", // No Arabic name for sodas
        description: "Refresco de cola de 500 ml",
        price: 8,
        image: "/placeholder.svg?height=200&width=300",
        query: "Coca-Cola 500ml bottle",
      },
      {
        name: "Coca-Cola Zero (500 ml)",
        arabicName: "",
        description: "Refresco de cola sin azúcar de 500 ml",
        price: 8,
        image: "/placeholder.svg?height=200&width=300",
        query: "Coca-Cola Zero 500ml bottle",
      },
      {
        name: "Sprite (500 ml)",
        arabicName: "",
        description: "Refresco de lima-limón de 500 ml",
        price: 8,
        image: "/placeholder.svg?height=200&width=300",
        query: "Sprite 500ml bottle",
      },
      {
        name: "Sprite Zero (500 ml)",
        arabicName: "",
        description: "Refresco de lima-limón sin azúcar de 500 ml",
        price: 8,
        image: "/placeholder.svg?height=200&width=300",
        query: "Sprite Zero 500ml bottle",
      },
      {
        name: "Fanta (500 ml)",
        arabicName: "",
        description: "Refresco de naranja de 500 ml",
        price: 8,
        image: "/placeholder.svg?height=200&width=300",
        query: "Fanta Orange 500ml bottle",
      },
    ],
  },
]

// ---------- Componentes auxiliares ----------
function OrderDialog({
  cart,
  add,
  remove,
  total,
}: {
  cart: Record<string, number>
  add: (name: string) => void
  remove: (name: string) => void
  total: number
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="relative shadow-lg border-2 border-[#B6862C] hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: "#B6862C",
            color: "#121212",
            background: "linear-gradient(135deg, #B6862C 0%, #D4A574 100%)",
          }}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Pedidos
          {Object.values(cart).length > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center border-2 border-[#B6862C]"
              style={{ backgroundColor: "#8B0000", color: "#F8F1E7" }}
            >
              {Object.values(cart).reduce((s, n) => s + n, 0)}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-2xl max-h-[80vh] overflow-y-auto border-4 border-[#B6862C]"
        style={{ backgroundColor: "#F8F1E7" }}
      >
        <DialogHeader className="relative">
          <ArabicPattern />
          <DialogTitle className="text-center text-2xl font-bold relative z-10" style={{ color: "#8B0000" }}>
            🛒 Tu Pedido
          </DialogTitle>
          <div className="bg-[#3B5323]/20 p-3 rounded-lg border-2 border-[#B6862C] mb-4">
            <p className="text-center font-semibold" style={{ color: "#121212" }}>
              🛵 Servicio de delivery disponible todos los días de 10:00 AM a 11:00 PM
            </p>
          </div>
          <ArabicDivider />
        </DialogHeader>

        {Object.keys(cart).length === 0 ? (
          <div className="text-center py-8">
            <ArabicOrnament size="w-20 h-20" />
            <p className="mt-4 text-lg" style={{ color: "#121212" }}>
              Tu carrito está vacío
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(cart).map(([name, qty]) => {
              const item = menuItems.flatMap((c) => c.items).find((i) => i.name === name)
              if (!item) return null
              return (
                <div
                  key={name}
                  className="flex justify-between items-center p-4 rounded-lg border-2 border-[#B6862C] relative overflow-hidden"
                  style={{ backgroundColor: "#121212" }}
                >
                  <ArabicPattern className="opacity-5" />
                  <div className="relative z-10">
                    <h4 className="font-bold text-lg" style={{ color: "#B6862C" }}>
                      {name}
                    </h4>
                    <p className="text-sm" style={{ color: "#F8F1E7" }}>
                      Cantidad: {qty}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 relative z-10">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => remove(name)}
                      className="border-2 border-[#8B0000] hover:scale-110 transition-transform"
                      style={{ background: "#8B0000", color: "#F8F1E7" }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-lg px-3" style={{ color: "#F8F1E7" }}>
                      {item.price * qty} Bs
                    </span>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => add(name)}
                      className="border-2 border-[#B6862C] hover:scale-110 transition-transform"
                      style={{ background: "#B6862C", color: "#121212" }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}

            <div className="border-t-4 border-[#B6862C] pt-4 bg-gradient-to-r from-[#8B0000] to-[#A52A2A] p-4 rounded-lg">
              <div className="flex justify-between font-bold text-2xl">
                <span style={{ color: "#F8F1E7" }}>Total:</span>
                <span style={{ color: "#B6862C" }}>{total} Bs</span>
              </div>
            </div>

            <div className="space-y-4 bg-white/10 p-4 rounded-lg border-2 border-[#B6862C]">
              <div>
                <Label className="text-lg font-semibold" style={{ color: "#121212" }}>
                  Nombre completo
                </Label>
                <Input placeholder="Tu nombre" className="border-2 border-[#B6862C] focus:border-[#8B0000]" />
              </div>
              <div>
                <Label className="text-lg font-semibold" style={{ color: "#121212" }}>
                  Teléfono
                </Label>
                <Input placeholder="Tu número" className="border-2 border-[#B6862C] focus:border-[#8B0000]" />
              </div>
              <div>
                <Label className="text-lg font-semibold" style={{ color: "#121212" }}>
                  Dirección
                </Label>
                <Textarea
                  placeholder="Dirección completa"
                  className="border-2 border-[#B6862C] focus:border-[#8B0000]"
                />
              </div>
            </div>

            <Button
              className="w-full text-xl py-6 border-4 border-[#B6862C] hover:scale-105 transition-all duration-300 shadow-lg"
              style={{
                backgroundColor: "#8B0000",
                color: "#F8F1E7",
                background: "linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)",
              }}
            >
              ✨ Confirmar Pedido - {total} Bs ✨
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function ReservationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-4 border-[#B6862C] hover:bg-[#B6862C] hover:text-[#121212] transition-all duration-300 shadow-lg hover:shadow-xl bg-transparent"
          style={{
            borderColor: "#B6862C",
            color: "#B6862C",
            backgroundColor: "transparent",
          }}
        >
          <Calendar className="h-5 w-5 mr-2" />
          Reservar Mesa
        </Button>
      </DialogTrigger>

      <DialogContent className="border-4 border-[#B6862C]" style={{ backgroundColor: "#F8F1E7" }}>
        <DialogHeader className="relative">
          <ArabicPattern />
          <DialogTitle className="text-center text-2xl font-bold relative z-10" style={{ color: "#8B0000" }}>
            🍽️ Reservar Mesa
          </DialogTitle>
          <div className="bg-[#8B0000]/20 p-3 rounded-lg border-2 border-[#B6862C] mb-4">
            <p className="text-center font-semibold" style={{ color: "#121212" }}>
              🍽️ Reservas disponibles Viernes y Sábado de 7:00 PM a 11:00 PM
            </p>
          </div>
          <ArabicDivider />
        </DialogHeader>

        <div className="space-y-4 relative z-10">
          <div>
            <Label className="text-lg font-semibold" style={{ color: "#121212" }}>
              Nombre completo
            </Label>
            <Input placeholder="Tu nombre" className="border-2 border-[#B6862C] focus:border-[#8B0000]" />
          </div>
          <div>
            <Label className="text-lg font-semibold" style={{ color: "#121212" }}>
              Teléfono
            </Label>
            <Input placeholder="Tu número" className="border-2 border-[#B6862C] focus:border-[#8B0000]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-lg font-semibold" style={{ color: "#121212" }}>
                Fecha
              </Label>
              <Input type="date" className="border-2 border-[#B6862C] focus:border-[#8B0000]" />
            </div>
            <div>
              <Label className="text-lg font-semibold" style={{ color: "#121212" }}>
                Hora
              </Label>
              <Input type="time" className="border-2 border-[#B6862C] focus:border-[#8B0000]" />
            </div>
          </div>
          <div>
            <Label className="text-lg font-semibold" style={{ color: "#121212" }}>
              Número de personas
            </Label>
            <Input
              type="number"
              min={1}
              placeholder="¿Cuántas personas?"
              className="border-2 border-[#B6862C] focus:border-[#8B0000]"
            />
          </div>
          <div>
            <Label className="text-lg font-semibold" style={{ color: "#121212" }}>
              Comentarios
            </Label>
            <Textarea
              placeholder="Ocasión especial, preferencias…"
              className="border-2 border-[#B6862C] focus:border-[#8B0000]"
            />
          </div>

          <Button
            className="w-full text-xl py-6 border-4 border-[#B6862C] hover:scale-105 transition-all duration-300 shadow-lg"
            style={{
              backgroundColor: "#8B0000",
              color: "#F8F1E7",
              background: "linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)",
            }}
          >
            ✨ Confirmar Reserva ✨
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ---------- Página principal ----------
export default function BrasasArabes() {
  const [cart, setCart] = useState<Record<string, number>>({})

  const addToCart = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] || 0) + 1 }))
  const removeFromCart = (name: string) =>
    setCart((c) => {
      const next = { ...c }
      next[name] > 1 ? (next[name] -= 1) : delete next[name]
      return next
    })
  const total = Object.entries(cart).reduce((sum, [name, qty]) => {
    const item = menuItems.flatMap((c) => c.items).find((i) => i.name === name)
    return sum + (item ? item.price * qty : 0)
  }, 0)

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #121212 0%, #1a1a1a 100%)" }}>
      <ArabicPattern className="fixed inset-0 opacity-5" />

      {/* Header */}
      <header
        className="text-white shadow-2xl sticky top-0 z-50 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #8B0000 0%, #A52A2A 50%, #8B0000 100%)" }}
      >
        <ArabicPattern className="absolute inset-0 opacity-20" />
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="relative">
                <img src="/logo-brasas-arabes.png" alt="Logo Al Jamrah" className="h-20 w-auto drop-shadow-2xl" />
                <div className="absolute -inset-2 bg-[#B6862C] rounded-full opacity-20 blur-lg"></div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-1 drop-shadow-lg" style={{ color: "#B6862C" }}>
                  Al Jamrah
                </h1>
                <p className="text-xl" style={{ color: "#F8F1E7" }}>
                  🔥 Brasas Árabes 🔥
                </p>
                <p className="text-sm opacity-80" style={{ color: "#F8F1E7" }}>
                  Tradición Palestina Auténtica
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col text-sm space-y-2 text-right" style={{ color: "#F8F1E7" }}>
                <div className="flex items-center space-x-2 bg-black/20 px-3 py-1 rounded-full">
                  <MapPin className="h-4 w-4" style={{ color: "#B6862C" }} />
                  <span>📍 Calle Piriti #111</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/20 px-3 py-1 rounded-full">
                  <Phone className="h-4 w-4" style={{ color: "#B6862C" }} />
                  <span>📞 +591 75006434</span>
                </div>
              </div>

              <OrderDialog cart={cart} add={addToCart} remove={removeFromCart} total={total} />
              <ReservationDialog />
              <Link href="/login" passHref>
                <Button
                  variant="outline"
                  className="border-4 border-[#B6862C] hover:bg-[#B6862C] hover:text-[#121212] transition-all duration-300 shadow-lg hover:shadow-xl bg-transparent"
                  style={{
                    borderColor: "#B6862C",
                    color: "#B6862C",
                    backgroundColor: "transparent",
                  }}
                >
                  <User className="h-5 w-5 mr-2" />
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #F8F1E7 0%, #E8D5C4 100%)" }}
      >
        <ArabicPattern className="absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ArabicOrnament size="w-24 h-24" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg" style={{ color: "#8B0000" }}>
            🌟 Auténtica Tradición Palestina 🌟
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold mb-8" style={{ color: "#8B0000" }}>
            Sabores que Cuentan Historias
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-8 leading-relaxed font-medium" style={{ color: "#121212" }}>
              En Al Jamrah — Brasas Árabes, preservamos la herencia culinaria palestina en Santa Cruz de la Sierra. Cada
              plato revive las recetas sagradas de nuestros abuelos, transmitidas con amor a través de generaciones.
            </p>
            <ArabicDivider />
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              <Badge
                className="text-lg px-6 py-3 border-2 border-[#3B5323]"
                style={{ background: "#3B5323", color: "#F8F1E7" }}
              >
                🍽️ Cocina Tradicional
              </Badge>
              <Badge
                className="text-lg px-6 py-3 border-2 border-[#B6862C]"
                style={{ background: "#B6862C", color: "#121212" }}
              >
                🌿 Ingredientes Frescos
              </Badge>
              <Badge
                className="text-lg px-6 py-3 border-2 border-[#8B0000]"
                style={{ background: "#8B0000", color: "#F8F1E7" }}
              >
                ❤️ Hecho con Amor
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Menú */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <ArabicOrnament size="w-20 h-20" />
            <h2 className="text-5xl font-bold mb-4 drop-shadow-lg" style={{ color: "#B6862C" }}>
              Nuestro Menú Tradicional
            </h2>
            <h3 className="text-3xl font-semibold" style={{ color: "#B6862C" }}>
              Sabores de Palestina
            </h3>
            <ArabicDivider />
          </div>

          {menuItems.map((cat, index) => (
            <div key={cat.category} className="mb-20">
              <div className="text-center mb-12 relative">
                <div className="inline-block bg-gradient-to-r from-[#8B0000] to-[#A52A2A] px-8 py-4 rounded-full border-4 border-[#B6862C] shadow-2xl">
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: "#F8F1E7" }}>
                    {cat.category}
                  </h3>
                </div>
                <ArabicDivider />
              </div>

              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <Card
                    key={item.name}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-4 hover:scale-105 relative group"
                    style={{ background: "linear-gradient(135deg, #F8F1E7 0%, #E8D5C4 100%)", borderColor: "#B6862C" }}
                  >
                    <ArabicPattern className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity" />

                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Precio en la esquina superior derecha de la imagen */}
                      <div className="absolute top-3 right-3 z-10">
                        <Badge
                          className="text-base font-bold px-2 py-1 border-2 border-[#B6862C] shadow-lg"
                          style={{
                            background: "linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)",
                            color: "#F8F1E7",
                          }}
                        >
                          {item.price} Bs
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4 relative z-10">
                      <div className="text-center">
                        <h4 className="text-xl font-bold mb-1" style={{ color: "#121212" }}>
                          {item.name}
                        </h4>
                        {/* Removed arabicName display */}
                      </div>

                      <ArabicDivider />

                      <p className="text-center leading-relaxed" style={{ color: "#121212" }}>
                        {item.description}
                      </p>

                      <div className="flex justify-center pt-4">
                        {cart[item.name] ? (
                          <div className="flex items-center space-x-3 bg-gradient-to-r from-[#121212] to-[#2a2a2a] px-4 py-2 rounded-full border-2 border-[#B6862C]">
                            <Button
                              size="icon"
                              onClick={() => removeFromCart(item.name)}
                              className="border-2 border-[#8B0000] hover:scale-110 transition-transform rounded-full"
                              style={{ background: "#8B0000", color: "#F8F1E7" }}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 font-bold text-xl" style={{ color: "#B6862C" }}>
                              {cart[item.name]}
                            </span>
                            <Button
                              size="icon"
                              onClick={() => addToCart(item.name)}
                              className="border-2 border-[#B6862C] hover:scale-110 transition-transform rounded-full"
                              style={{ background: "#B6862C", color: "#121212" }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() => addToCart(item.name)}
                            className="px-6 py-3 text-lg font-semibold border-3 border-[#B6862C] hover:scale-110 transition-all duration-300 shadow-lg rounded-full"
                            style={{
                              background: "linear-gradient(135deg, #B6862C 0%, #D4A574 100%)",
                              color: "#121212",
                            }}
                          >
                            <Plus className="h-5 w-5 mr-2" /> Agregar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #121212 0%, #1a1a1a 100%)", borderTop: "4px solid #B6862C" }}
      >
        <ArabicPattern className="absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <ArabicOrnament size="w-16 h-16" />
          </div>

          <div className="grid gap-8 md:grid-cols-3 text-white">
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end space-x-3 mb-4">
                <img src="/logo-brasas-arabes.png" alt="Logo" className="h-16 w-auto drop-shadow-lg" />
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: "#B6862C" }}>
                    Al Jamrah
                  </h3>
                  <p style={{ color: "#F8F1E7" }}>Brasas Árabes</p>
                </div>
              </div>
              <p className="leading-relaxed" style={{ color: "#F8F1E7" }}>
                Tradición culinaria palestina en el corazón de Santa Cruz de la Sierra.
              </p>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4 border-b-2 border-[#B6862C] pb-2" style={{ color: "#B6862C" }}>
                Contacto
              </h4>
              <div className="space-y-3" style={{ color: "#F8F1E7" }}>
                <div className="flex items-center justify-center space-x-2 bg-[#8B0000]/20 px-4 py-2 rounded-full">
                  <MapPin className="h-5 w-5" style={{ color: "#B6862C" }} />
                  <span>📍 Calle Piriti #111</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-[#8B0000]/20 px-4 py-2 rounded-full">
                  <Phone className="h-5 w-5" style={{ color: "#B6862C" }} />
                  <span>📞 +591 75006434</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-xl font-semibold mb-4 border-b-2 border-[#B6862C] pb-2" style={{ color: "#B6862C" }}>
                Horarios
              </h4>
              <div style={{ color: "#F8F1E7" }} className="space-y-3">
                {/* Pedidos */}
                <div className="bg-[#3B5323]/20 p-3 rounded-lg border border-[#B6862C]">
                  <p className="text-lg font-bold" style={{ color: "#B6862C" }}>
                    🛵 Pedidos
                  </p>
                  <p className="text-lg">Lunes a Domingo</p>
                  <p className="text-xl font-bold" style={{ color: "#B6862C" }}>
                    10:00 AM – 11:00 PM
                  </p>
                </div>

                {/* Reservas y atención en local */}
                <div className="bg-[#8B0000]/20 p-3 rounded-lg border border-[#B6862C]">
                  <p className="text-lg font-bold" style={{ color: "#B6862C" }}>
                    🍽️ Reservas
                  </p>
                  <p className="text-lg">Viernes y Sábado</p>
                  <p className="text-xl font-bold" style={{ color: "#B6862C" }}>
                    7:00 PM – 11:00 PM
                  </p>
                </div>

                <p className="text-sm mt-2 opacity-70 text-center">Siempre bienvenidos</p>
              </div>
            </div>
          </div>

          <ArabicDivider />

          <div className="text-center" style={{ color: "#F8F1E7" }}>
            <p className="text-lg">© 2024 Al Jamrah – Brasas Árabes</p>
            <p className="text-sm opacity-70 mt-2">Hecho con amor en Bolivia ❤️🇵🇸🇧🇴</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
