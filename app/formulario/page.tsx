"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, CheckCircle, Send, User, Users, Phone, Baby, Plus, Minus, AlertCircle, Ticket } from "lucide-react"

// URL DE TU GOOGLE APPS SCRIPT
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyI9G1Ttkmd9AAZczFkZ7FULTLaPhK4R4lyqL35pKbVaW0Byz80s897Mp8McA_hh7Nr/exec"

const MAX_INVITADOS_TOTAL = 200

export default function Page() {
  const [formData, setFormData] = useState({
    nombre: "",
    adultos: 1,
    ninos: 0,
    telefono: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionState, setSubmissionState] = useState<"idle" | "success" | "full" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [validationError, setValidationError] = useState("")
  const [folioAsignado, setFolioAsignado] = useState("") // Estado para guardar el folio secreto con la mesa oculta

  const totalInvitadosActuales = formData.adultos + formData.ninos

  const incrementarAdultos = () => {
    if (totalInvitadosActuales < MAX_INVITADOS_TOTAL) {
      setFormData((prev) => ({ ...prev, adultos: prev.adultos + 1 }))
    }
  }

  const decrementarAdultos = () => {
    if (formData.adultos > 1) {
      setFormData((prev) => ({ ...prev, adultos: prev.adultos - 1 }))
    }
  }

  const incrementarNinos = () => {
    if (totalInvitadosActuales < MAX_INVITADOS_TOTAL) {
      setFormData((prev) => ({ ...prev, ninos: prev.ninos + 1 }))
    }
  }

  const decrementarNinos = () => {
    if (formData.ninos > 0) {
      setFormData((prev) => ({ ...prev, ninos: prev.ninos - 1 }))
    }
  }

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError("")

    const nombreLimpio = formData.nombre.trim()
    const telefonoLimpio = formData.telefono.trim()

    if (!nombreLimpio || !telefonoLimpio) {
      setValidationError("Por favor, completa todos los campos sin dejar espacios en blanco.")
      return
    }

    const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{3,}$/
    if (!regexNombre.test(nombreLimpio)) {
      setValidationError("Por favor, introduce un nombre válido (mínimo 3 letras y sin caracteres extraños).")
      return
    }

    const telefonoDigitos = telefonoLimpio.replace(/[\s-]/g, "")
    const regexTelefono = /^\d{7,15}$/
    if (!regexTelefono.test(telefonoDigitos)) {
      setValidationError("Por favor, introduce un número de teléfono válido (entre 7 y 15 dígitos).")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          nombre: nombreLimpio,
          adultos: formData.adultos,
          ninos: formData.ninos,
          telefono: telefonoLimpio,
        }),
      })

      const result = await response.json()

      if (result.status === "success") {
        // Guardamos el folio encriptado/con prefijo que nos mande Google Sheets (ej. "M1-8932")
        setFolioAsignado(result.folio || "MC-2026-X") 
        setSubmissionState("success")
      } else if (result.status === "full") {
        setSubmissionState("full")
        setErrorMessage(result.message)
      } else {
        setSubmissionState("error")
        setErrorMessage(result.message || "Ocurrió un error inesperado.")
      }
    } catch (error) {
      console.error("Error al enviar asistencia:", error)
      setSubmissionState("error")
      setErrorMessage("No se pudo conectar con el servidor. Intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#0F0D0C] p-4 font-sans text-[#2A2421] md:p-6 overflow-hidden selection:bg-amber-300">
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
            Por favor ingresa tus datos para registrar tu asistencia.
          </p>
        </div>

        {/* PANTALLA DE ÉXITO CON FOLIO */}
        {submissionState === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-6 text-center"
          >
            <CheckCircle className="h-12 w-12 text-emerald-600 mb-2 animate-bounce" />
            <h2 className="font-serif text-lg font-bold text-amber-950">
              ¡Registro guardado con éxito!
            </h2>
            <p className="text-xs text-neutral-600 mt-1 font-serif italic">
              Hemos registrado tus lugares. Guarda muy bien tu folio de acceso:
            </p>

            {/* TARJETA DE FOLIO SECRETO */}
            <div className="my-5 w-full rounded-2xl bg-white border-2 border-amber-400 p-4 shadow-md flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 flex items-center gap-1">
                <Ticket className="h-4 w-4 text-amber-600" /> Tu Folio de Acceso
              </span>
              <span className="font-mono text-2xl font-black text-amber-950 tracking-wider my-2 bg-amber-50 px-4 py-1.5 rounded-xl border border-amber-200">
                {folioAsignado}
              </span>
              <span className="text-[10px] text-neutral-500 italic">
                Presenta este código al ingresar a la recepción.
              </span>
            </div>

            <button
              onClick={() => {
                setSubmissionState("idle")
                setFormData({ nombre: "", adultos: 1, ninos: 0, telefono: "" })
              }}
              className="mt-2 text-xs text-amber-800 underline font-bold cursor-pointer"
            >
              Registrar a otro invitado
            </button>
          </motion.div>
        )}

        {/* PANTALLA DE CUPO LLENO */}
        {submissionState === "full" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <AlertCircle className="h-14 w-14 text-amber-700 mb-3" />
            <h2 className="font-serif text-lg font-bold text-amber-950">
              Lo sentimos, cupo agotado
            </h2>
            <p className="text-xs text-amber-900 mt-2 font-medium bg-amber-200/60 p-3 rounded-xl border border-amber-300">
              {errorMessage}
            </p>
            <button
              onClick={() => setSubmissionState("idle")}
              className="mt-5 text-xs text-amber-800 underline font-bold cursor-pointer"
            >
              Intentar de nuevo
            </button>
          </motion.div>
        )}

        {/* PANTALLA DE ERROR */}
        {submissionState === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <AlertCircle className="h-14 w-14 text-red-600 mb-3" />
            <h2 className="font-serif text-lg font-bold text-amber-950">
              Ocurrió un error
            </h2>
            <p className="text-xs text-red-800 mt-2 font-medium bg-red-100 p-3 rounded-xl border border-red-200">
              {errorMessage}
            </p>
            <button
              onClick={() => setSubmissionState("idle")}
              className="mt-5 text-xs text-amber-800 underline font-bold cursor-pointer"
            >
              Regresar al formulario
            </button>
          </motion.div>
        )}

        {/* FORMULARIO PRINCIPAL */}
        {submissionState === "idle" && (
          <form onSubmit={handleSubmitForm} className="flex flex-col gap-5 text-left">
            {validationError && (
              <div className="rounded-xl bg-red-100 border border-red-300 p-3 text-[11px] font-semibold text-red-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{validationError}</span>
              </div>
            )}

            {/* NOMBRE */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                <User className="h-4 w-4 text-amber-700" /> Nombre Completo:
              </label>
              <input
                type="text"
                placeholder="Ej. María López"
                value={formData.nombre}
                onChange={(e) => {
                  setFormData({ ...formData, nombre: e.target.value })
                  if (validationError) setValidationError("")
                }}
                className="w-full rounded-xl border border-amber-300/80 bg-white/90 px-3.5 py-2.5 text-xs text-[#2A2421] placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300/50 shadow-inner transition-all"
              />
            </div>

            {/* CONTADORES DE ADULTOS Y NIÑOS */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center rounded-2xl border border-amber-300/80 bg-white/80 p-3 shadow-inner">
                <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1">
                  <Users className="h-4 w-4 text-amber-700" /> Adultos:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decrementarAdultos}
                    disabled={formData.adultos <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200/80 text-amber-900 transition-all hover:bg-amber-300 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-serif text-lg font-bold text-amber-950">
                    {formData.adultos}
                  </span>
                  <button
                    type="button"
                    onClick={incrementarAdultos}
                    disabled={totalInvitadosActuales >= MAX_INVITADOS_TOTAL}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-amber-100 transition-all hover:bg-amber-800 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-2xl border border-amber-300/80 bg-white/80 p-3 shadow-inner">
                <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1">
                  <Baby className="h-4 w-4 text-amber-700" /> Niños:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decrementarNinos}
                    disabled={formData.ninos <= 0}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200/80 text-amber-900 transition-all hover:bg-amber-300 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-serif text-lg font-bold text-amber-950">
                    {formData.ninos}
                  </span>
                  <button
                    type="button"
                    onClick={incrementarNinos}
                    disabled={totalInvitadosActuales >= MAX_INVITADOS_TOTAL}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-amber-100 transition-all hover:bg-amber-800 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center font-serif text-xs italic text-amber-900">
              Total de personas a registrar: <span className="font-bold text-amber-950">{totalInvitadosActuales}</span>
            </div>

            {/* TELÉFONO */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-amber-700" /> Número Telefónico:
              </label>
              <input
                type="tel"
                placeholder="Ej. 55 1234 5678"
                value={formData.telefono}
                onChange={(e) => {
                  setFormData({ ...formData, telefono: e.target.value })
                  if (validationError) setValidationError("")
                }}
                className="w-full rounded-xl border border-amber-300/80 bg-white/90 px-3.5 py-2.5 text-xs text-[#2A2421] placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300/50 shadow-inner transition-all"
              />
            </div>

            {/* BOTÓN ENVIAR */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 py-3.5 text-xs font-black tracking-widest text-amber-100 shadow-xl border border-amber-400/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "PROCESANDO..." : "CONFIRMAR ASISTENCIA"}</span>
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
