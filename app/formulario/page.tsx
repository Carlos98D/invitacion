"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Church, PartyPopper, Heart, Sparkles, MailOpen, Calendar, Volume2, VolumeX, Star, CheckCircle, Send, User, Users, Phone, Baby } from "lucide-react"

// PEGA AQUÍ LA URL DE TU GOOGLE APPS SCRIPT
const GOOGLE_SCRIPT_URL = "AQUÍ_PEGA_TU_URL_DE_GOOGLE_APPS_SCRIPT"

function BearIllustration({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bearGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <circle cx="100" cy="100" r="90" fill="url(#bearGlow)" />

      <circle cx="55" cy="55" r="28" fill="#B8860B" />
      <circle cx="55" cy="55" r="16" fill="#FDFBF7" />
      <circle cx="145" cy="55" r="28" fill="#B8860B" />
      <circle cx="145" cy="55" r="16" fill="#FDFBF7" />

      <circle cx="100" cy="100" r="65" fill="#C59B6C" />

      <circle cx="75" cy="90" r="6.5" fill="#2A2421" />
      <circle cx="125" cy="90" r="6.5" fill="#2A2421" />
      <circle cx="77" cy="87.5" r="2.5" fill="#FFFFFF" />
      <circle cx="127" cy="87.5" r="2.5" fill="#FFFFFF" />

      <ellipse cx="100" cy="115" rx="25" ry="19" fill="#FDFBF7" />
      <ellipse cx="100" cy="106" rx="8" ry="5.5" fill="#2A2421" />
      <path
        d="M 100 111.5 C 100 119, 93 123, 89 119 M 100 111.5 C 100 119, 107 123, 111 119"
        stroke="#2A2421"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <circle cx="62" cy="105" r="7.5" fill="#E89B88" opacity="0.45" />
      <circle cx="138" cy="105" r="7.5" fill="#E89B88" opacity="0.45" />
    </svg>
  )
}

function BearPawIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <ellipse cx="50" cy="65" rx="20" ry="16" />
      <circle cx="28" cy="40" r="6" />
      <circle cx="42" cy="32" r="6" />
      <circle cx="58" cy="32" r="6" />
      <circle cx="72" cy="40" r="6" />
    </svg>
  )
}

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`h-14 w-14 text-amber-500/50 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M0,0 L45,0 C22,12 12,22 0,45 Z" fill="currentColor" opacity="0.2" />
      <path d="M0,25 C35,25 45,35 45,70" />
      <path d="M25,0 C25,35 35,45 70,45" />
      <circle cx="28" cy="28" r="4.5" fill="currentColor" />
    </svg>
  )
}

function GoldSparkles() {
  const sparkles = Array.from({ length: 22 })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-300/40"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            scale: [0, 1.3, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        >
          <Star className="h-3 w-3 fill-amber-300" />
        </motion.div>
      ))}
    </div>
  )
}

export default function Invitacion() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Estado con únicamente los datos solicitados
  const [formData, setFormData] = useState({
    nombre: "",
    adultos: "1",
    ninos: "0",
    telefono: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {})
      }
    }

    window.addEventListener("click", handleFirstInteraction, { once: true })
    return () => window.removeEventListener("click", handleFirstInteraction)
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return

      if (document.hidden) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else if (isOpen) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {})
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [isOpen])

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => console.log("Error de audio:", err))
    }
  }

  const handleOpenEnvelope = () => {
    setIsOpen(true)
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {})
    }
  }

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await fetch(https://script.google.com/macros/s/AKfycbyTQxuY6UWUe86ZnDUOGru9eQT182zW56r1vcG83d4z2__UM3JYVtIk9nyhgQjg_Dw/exec, {
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

  const locationUrl = `https://www.google.com/maps/dir//Salon+flamingo+Tultitlan,+Av.+Toluca+Esq,+La+Sarda%C3%B1a,+54090+Buenavista,+M%C3%A9x./@19.6083712,-99.1592448,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d1f77daf733af9:0xa27412d4f0116198!2m2!1d-99.1774046!2d19.5935291`

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#0F0D0C] p-3 font-sans text-[#2A2421] md:p-6 overflow-hidden selection:bg-amber-300">
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
        loop
        preload="auto"
      />

      <GoldSparkles />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        <span className="hidden text-[10px] font-bold uppercase tracking-widest text-amber-200/90 bg-[#1F1A17]/90 px-3.5 py-1.5 rounded-full border border-amber-400/30 backdrop-blur-md shadow-2xl md:inline-block">
          {isPlaying ? "Música activa" : "Música pausada"}
        </span>

        <motion.button
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.85 }}
          onClick={toggleMusic}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-400/60 bg-gradient-to-br from-[#2A2421] via-[#1A1614] to-[#0D0B0A] text-amber-100 shadow-[0_10px_35px_rgba(217,119,6,0.3)] backdrop-blur-lg transition-all hover:border-amber-300"
          title={isPlaying ? "Silenciar música" : "Activar música"}
        >
          {isPlaying ? (
            <Volume2 className="h-6 w-6 text-amber-400 animate-pulse" />
          ) : (
            <VolumeX className="h-6 w-6 text-neutral-400" />
          )}
        </motion.button>
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-[#0F0D0C] to-[#050404] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotateX: 30, y: -50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mb-6 flex items-center gap-2.5 font-serif text-xs tracking-[0.4em] uppercase text-amber-300 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
            >
              <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
              <span>Invitación Exclusiva</span>
              <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
            </motion.div>

            <motion.button
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenEnvelope}
              className="group relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-[2.5rem] border-2 border-amber-400/50 bg-gradient-to-b from-[#FAF8F5] via-[#F3ECE3] to-[#E2D2C0] p-8 text-center shadow-[0_35px_90px_rgba(217,119,6,0.25)] transition-all duration-500 hover:border-amber-300"
            >
              <CornerOrnament className="absolute top-2 left-2" />
              <CornerOrnament className="absolute top-2 right-2 rotate-90" />

              <div className="absolute top-0 h-2.5 w-40 rounded-b-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 shadow-md" />

              <div className="absolute top-6 left-6 text-amber-900/10 rotate-[-15deg]">
                <BearPawIcon className="h-8 w-8" />
              </div>
              <div className="absolute top-6 right-6 text-amber-900/10 rotate-[15deg]">
                <BearPawIcon className="h-8 w-8" />
              </div>

              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative my-6 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-amber-100 to-amber-200/80 p-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] ring-4 ring-amber-300/40"
              >
                <BearIllustration />
                <div className="absolute bottom-1 right-1 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 p-2 text-amber-100 shadow-xl">
                  <Heart className="h-4 w-4 fill-current text-amber-200" />
                </div>
              </motion.div>

              <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-amber-900/80">
                Nuestra Pequeña
              </p>
              <h2 className="my-2 font-serif text-2xl font-bold tracking-wide text-[#2A2421]">
                Bautizo &amp; Primer Cumpleaños
              </h2>
              <p className="text-xs font-semibold text-neutral-500">Sábado 14 de Noviembre</p>

              <div className="mt-8 flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 px-9 py-3.5 text-xs font-bold tracking-widest uppercase text-amber-100 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:from-amber-500 group-hover:to-amber-800">
                <MailOpen className="h-4 w-4 text-amber-200" />
                <span>Abrir Invitación</span>
              </div>
            </motion.button>
          </motion.div>
        ) : (
          <motion.main
            key="invitation-view"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex min-h-screen w-full max-w-md flex-col items-center overflow-y-auto border-2 border-amber-400/50 bg-[#FDFBF7] px-6 py-8 shadow-[0_30px_100px_rgba(217,119,6,0.3)] md:min-h-[890px] md:max-h-[930px] md:rounded-[2.8rem]"
          >
            <CornerOrnament className="absolute top-2 left-2" />
            <CornerOrnament className="absolute top-2 right-2 rotate-90" />
            <CornerOrnament className="absolute bottom-2 left-2 -rotate-90" />
            <CornerOrnament className="absolute bottom-2 right-2 rotate-180" />

            <div className="absolute inset-3 border border-amber-400/40 rounded-[2.3rem] pointer-events-none" />
            <div className="absolute inset-4 border border-dashed border-amber-300/30 rounded-[2rem] pointer-events-none" />

            <button
              onClick={() => setIsOpen(false)}
              className="self-end z-20 rounded-full bg-amber-100/80 px-4 py-1 text-[10px] font-bold tracking-widest uppercase text-amber-900 transition-all hover:bg-amber-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              ✕ Cerrar
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-1 z-10"
            >
              <p className="font-serif text-xs italic tracking-widest text-amber-900">
                Con mucho amor te invitamos al
              </p>

              <h1 className="my-2 font-serif text-3xl font-extrabold leading-snug tracking-wide bg-gradient-to-b from-[#2A2421] via-[#3D322C] to-[#1A1614] bg-clip-text text-transparent drop-shadow-sm">
                Bautizo y <br />
                Primer Cumpleaños
              </h1>

              <p className="font-serif text-xs italic text-amber-900">
                de nuestra pequeña
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 120 }}
              className="relative my-4 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-amber-100 to-amber-200/90 p-4 shadow-xl ring-4 ring-amber-300/60 z-10"
            >
              <BearIllustration />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-full border-2 border-dashed border-amber-400/60 pointer-events-none"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="my-2 max-w-xs text-center font-serif text-xs italic leading-relaxed text-neutral-700 z-10"
            >
              Será un día muy especial y queremos compartirlo con las personas más importantes en nuestras vidas.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-4 font-serif text-base italic font-extrabold text-amber-800 tracking-wide z-10"
            >
              ¡Te esperamos!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="my-3 grid w-full grid-cols-3 gap-2 border-y-2 border-amber-300/80 py-5 text-center bg-gradient-to-b from-amber-50/60 to-amber-100/30 rounded-2xl shadow-inner z-10"
            >
              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="flex flex-col items-center justify-start border-r border-amber-300/60 px-1">
                <Calendar className="mb-1.5 h-5 w-5 text-amber-700" />
                <p className="text-[11px] font-bold text-[#2A2421]">Sábado</p>
                <p className="my-0.5 font-serif text-2xl font-black text-amber-700">14</p>
                <p className="text-[9px] font-semibold uppercase text-neutral-500">Noviembre 2025</p>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="flex flex-col items-center justify-start border-r border-amber-300/60 px-1">
                <Church className="mb-1.5 h-5 w-5 text-amber-700" />
                <p className="text-[11px] font-bold text-[#2A2421]">Bautizo</p>
                <p className="text-[10px] font-extrabold text-amber-900">11:00 a.m.</p>
                <p className="mt-1 text-[10px] font-medium text-neutral-600">Gante 5</p>
                <p className="text-[10px] font-medium text-neutral-600">CDMX</p>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="flex flex-col items-center justify-start px-1">
                <PartyPopper className="mb-1.5 h-5 w-5 text-amber-700" />
                <p className="text-[11px] font-bold text-[#2A2421]">Cumpleaños</p>
                <p className="text-[10px] font-extrabold text-amber-900">3:00 p.m.</p>
                <p className="mt-1 text-[10px] font-medium text-neutral-600">Salón Flamingo</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="my-3 w-full text-center z-20"
            >
              <motion.a
                whileHover={{ scale: 1.05, shadow: "0 15px 30px rgba(0,0,0,0.4)" }}
                whileTap={{ scale: 0.95 }}
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#2A2421] via-[#1F1A17] to-[#12100F] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-amber-100 shadow-2xl border-2 border-amber-400/40 transition-all"
              >
                <MapPin className="h-4 w-4 text-amber-400 animate-bounce" />
                <span>Ver Ubicación en Maps</span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-2 w-full text-center z-10"
            >
              <div className="my-2 rounded-2xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-amber-100/70 p-3.5 border-2 border-amber-300/50 shadow-md">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic font-bold text-amber-900">
                  <BearPawIcon className="h-3.5 w-3.5 text-amber-700" /> Nuestros papás <BearPawIcon className="h-3.5 w-3.5 text-amber-700" />
                </p>
                <p className="mt-1 text-sm font-extrabold text-[#2A2421]">Lidia e Isai</p>
              </div>

              <div className="my-2 rounded-2xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-amber-100/70 p-3.5 border-2 border-amber-300/50 shadow-md">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic font-bold text-amber-900">
                  <BearPawIcon className="h-3.5 w-3.5 text-amber-700" /> Padrinos <BearPawIcon className="h-3.5 w-3.5 text-amber-700" />
                </p>
                <p className="mt-1 text-sm font-extrabold text-[#2A2421]">Teresa y Luis</p>
              </div>
            </motion.div>

            {/* FORMULARIO SIMPLIFICADO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="mt-6 w-full rounded-3xl bg-gradient-to-b from-amber-100/80 via-amber-50 to-amber-100/60 p-5 border-2 border-amber-300/70 shadow-xl z-20"
            >
              <div className="text-center mb-4">
                <h3 className="font-serif text-lg font-bold text-amber-950 flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  Registro de Invitados
                  <Sparkles className="h-4 w-4 text-amber-600" />
                </h3>
                <p className="font-serif text-[11px] italic text-neutral-600">
                  Por favor ingresa tus datos para registrar tu grupo.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <CheckCircle className="h-12 w-12 text-emerald-600 mb-2 animate-bounce" />
                  <h4 className="font-serif text-base font-bold text-amber-950">
                    ¡Registro guardado!
                  </h4>
                  <p className="text-xs text-neutral-600 mt-1 font-serif italic">
                    Tus datos se enviaron exitosamente.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitForm} className="flex flex-col gap-3 text-left">
                  {/* NOMBRE */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-amber-700" /> Nombre Completo:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. María López"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full rounded-xl border border-amber-300/80 bg-white/90 px-3.5 py-2 text-xs text-[#2A2421] placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300/50 shadow-inner"
                    />
                  </div>

                  {/* ADULTOS Y NIÑOS */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-amber-700" /> N° Adultos:
                      </label>
                      <select
                        value={formData.adultos}
                        onChange={(e) => setFormData({ ...formData, adultos: e.target.value })}
                        className="w-full rounded-xl border border-amber-300/80 bg-white/90 px-3 py-2 text-xs text-[#2A2421] focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300/50 shadow-inner"
                      >
                        <option value="1">1 Adulto</option>
                        <option value="2">2 Adultos</option>
                        <option value="3">3 Adultos</option>
                        <option value="4">4 Adultos</option>
                        <option value="5">5+ Adultos</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1">
                        <Baby className="h-3.5 w-3.5 text-amber-700" /> N° Niños:
                      </label>
                      <select
                        value={formData.ninos}
                        onChange={(e) => setFormData({ ...formData, ninos: e.target.value })}
                        className="w-full rounded-xl border border-amber-300/80 bg-white/90 px-3 py-2 text-xs text-[#2A2421] focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300/50 shadow-inner"
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
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-amber-700" /> Número Telefónico:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 55 1234 5678"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full rounded-xl border border-amber-300/80 bg-white/90 px-3.5 py-2 text-xs text-[#2A2421] placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300/50 shadow-inner"
                    />
                  </div>

                  {/* BOTÓN ENVIAR */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 py-3.5 text-xs font-black tracking-widest text-amber-100 shadow-xl border border-amber-400/30 transition-all disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? "ENVIANDO..." : "ENVIAR REGISTRO"}</span>
                  </motion.button>
                </form>
              )}
            </motion.div>

            <p className="mt-6 font-serif text-lg italic font-black text-amber-900 z-10">
              ¡Gracias por acompañarnos!
            </p>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
