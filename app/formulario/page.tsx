"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, CheckCircle, Send, User, Users, Phone, Baby } from "lucide-react"

// URL DE TU GOOGLE APPS SCRIPT
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTQxuY6UWUe86ZnDUOGru9eQT182zW56r1vcG83d4z2__UM3JYVtIk9nyhgQjg_Dw/exec"

export default function FormularioPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    adultos: "1",
    ninos: "0",
    telefono: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error al enviar asistencia:", error)
      alert("Ocurrió un error al enviar tu respuesta. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#0F0D0C] p-4 font-sans text-[#2A2421] md:p-6 overflow-hidden selection:bg-amber-300">
      {/* Resplandor de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-[#0F0D0C] to-[#050404] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-gradient-to-b from-amber-100/90 via-amber-50 to-amber-100/80 p-6 md:p-8 border-2 border-amber-400/50 shadow-[0_25px_80px_rgba(217,119,6,0.25)]"
      >
        <div className="text-center mb-6">
          <h1 className="font-serif text-2xl font-bold text-amber-950 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-600" />
            Registro de Invitados
            <Sparkles className="h-5 w-5 text-amber-600" />
          </h1>
          <p className="font-serif text-xs italic text-neutral-600 mt-1">
            Por favor ingresa tus datos para registrar tu grupo.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <CheckCircle className="h-14 w-14 text-emerald-600 mb-3 animate-bounce" />
            <h2 className="font-serif text-lg font-bold text-amber-950">
              ¡Registro guardado!
            </h2>
            <p className="text-xs text-neutral-600 mt-1 font-serif italic">
              Tus datos se enviaron exitosamente. ¡Muchas gracias!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmitForm} className="flex flex-col gap-4 text-left">
            {/* NOMBRE */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                <User className="h-4 w-4 text-amber-700" /> Nombre Completo:
              </label>
              <input
                type="text"
                required
                placeholder="Ej. María López"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full rounded-xl border border-amber-300/80 bg-white/90 px-3.5 py-2.5 text-xs text-[#2A2421] placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300/50 shadow-inner transition-all"
              />
            </div>

            {/* ADULTOS Y NIÑOS */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-amber-700" /> N° Adultos:
                </label>
                <select
                  value={formData.adultos}
                  onChange={(e) => setFormData({ ...formData, adultos: e.target.value })}
                  className="w-full rounded-xl border border-amber-300/80 bg-white/90 px-3 py-2.5 text-xs text-[#2A2421] focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300/50 shadow-inner transition-all"
                >
                  <option value="1">1 Adulto</option>
                  <option value="2">2 Adultos</option>
                  <option value="3">3 Adultos</option>
                  <option value="4">4 Adultos</option>
                  <option value="5">5+ Adultos</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                  <Baby className="h-4 w-4 text-amber-700" /> N° Niños:
                </label>
                <select
                  value={formData.ninos}
                  onChange={(e) => setFormData({ ...formData, ninos: e.target.value })}
                  className="w-full rounded-xl border border-amber-300/80 bg-white/90 px-3 py-2.5 text-xs text-[#2A2421] focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300/50 shadow-inner transition-all"
                >
                  <option value="0">0 Niños</option>
                  <option value="1">1 Niño</option>
                  <option value="2">2 Niños</option>
                  <option value="3">3 Niños</option>
                  <option value="4">4+ Niños</option>
                </select>
              </div>
            </div>

            {/* TELÉFONO */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-amber-700" /> Número Telefónico:
              </label>
              <input
                type="tel"
                required
                placeholder="Ej. 55 1234 5678"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full rounded-xl border border-amber-300/80 bg-white/90 px-3.5 py-2.5 text-xs text-[#2A2421] placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300/50 shadow-inner transition-all"
              />
            </div>

            {/* BOTÓN ENVIAR */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 py-3.5 text-xs font-black tracking-widest text-amber-100 shadow-xl border border-amber-400/30 transition-all disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "ENVIANDO..." : "ENVIAR REGISTRO"}</span>
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
