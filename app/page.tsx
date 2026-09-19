"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Church, PartyPopper, Heart, Sparkles, MailOpen, Calendar, ClipboardList, Volume2, VolumeX, Star } from "lucide-react"

// Ilustración de Osito SVG Premium con Aureola Dorada y Brillo
function BearIllustration({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bearGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Resplandor de fondo */}
      <circle cx="100" cy="100" r="90" fill="url(#bearGlow)" />

      {/* Orejas */}
      <circle cx="55" cy="55" r="28" fill="#B8860B" />
      <circle cx="55" cy="55" r="16" fill="#FDFBF7" />
      <circle cx="145" cy="55" r="28" fill="#B8860B" />
      <circle cx="145" cy="55" r="16" fill="#FDFBF7" />

      {/* Cabeza */}
      <circle cx="100" cy="100" r="65" fill="#C59B6C" />

      {/* Ojos brillantes */}
      <circle cx="75" cy="90" r="6.5" fill="#2A2421" />
      <circle cx="125" cy="90" r="6.5" fill="#2A2421" />
      <circle cx="77" cy="87.5" r="2.5" fill="#FFFFFF" />
      <circle cx="127" cy="87.5" r="2.5" fill="#FFFFFF" />

      {/* Hocico */}
      <ellipse cx="100" cy="115" rx="25" ry="19" fill="#FDFBF7" />
      <ellipse cx="100" cy="106" rx="8" ry="5.5" fill="#2A2421" />
      <path
        d="M 100 111.5 C 100 119, 93 123, 89 119 M 100 111.5 C 100 119, 107 123, 111 119"
        stroke="#2A2421"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Mejillas */}
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
    <svg viewBox="0 0 100 100" className={`h-14 w-14 text-amber-500/60 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M0,0 L45,0 C22,12 12,22 0,45 Z" fill="currentColor" opacity="0.25" />
      <path d="M0,25 C35,25 45,35 45,70" />
      <path d="M25,0 C25,35 35,45 70,45" />
      <circle cx="28" cy="28" r="4.5" fill="currentColor" />
    </svg>
  )
}

// Lluvia constante de Destellos de Oro Animados
function GoldSparkles() {
  const sparkles = Array.from({ length: 25 })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-300"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1.4, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.95, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        >
          <Star className="h-3.5 w-3.5 fill-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
        </motion.div>
      ))}
    </div>
  )
}

export default function InvitacionProfesional() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Autoplay al interactuar por primera vez
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

  // Pausa automática al cambiar pestaña
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return
      if (document.hidden) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else if (isOpen) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
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
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const handleOpenEnvelope = () => {
    setIsOpen(true)
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const locationUrl = `https://www.google.com/maps/dir//Salon+flamingo+Tultitlan,+Av.+Toluca+Esq,+La+Sarda%C3%B1a,+54090+Buenavista,+M%C3%A9x./@19.6083712,-99.1592448,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d1f77daf733af9:0xa27412d4f0116198!2m2!1d-99.1774046!2d19.5935291`

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#0B0908] p-3 font-sans text-[#2A2421] md:p-6 overflow-hidden selection:bg-amber-300">
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
        loop
        preload="auto"
      />

      {isOpen && <GoldSparkles />}

      {/* FONDO AMBIENTAL DE LUJO */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/50 via-[#0B0908] to-[#040303] pointer-events-none" />

      {/* BOTÓN MÚSICA FLOTANTE PROFESIONAL */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        <span className="hidden text-[10px] font-bold uppercase tracking-widest text-amber-200/90 bg-[#1A1512]/90 px-3.5 py-1.5 rounded-full border border-amber-400/40 backdrop-blur-md shadow-2xl md:inline-block">
          {isPlaying ? "Música activa" : "Música en pausa"}
        </span>

        <motion.button
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.85 }}
          onClick={toggleMusic}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-400/70 bg-gradient-to-br from-[#2A2421] via-[#1A1614] to-[#0D0B0A] text-amber-100 shadow-[0_10px_30px_rgba(217,119,6,0.4)] backdrop-blur-lg cursor-pointer"
        >
          {isPlaying ? <Volume2 className="h-6 w-6 text-amber-400 animate-pulse" /> : <VolumeX className="h-6 w-6 text-neutral-400" />}
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* =========================================================
             VISTA 1: SOBRE DE INVITACIÓN PROFESIONAL
             ========================================================= */
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mb-6 flex items-center gap-2.5 font-serif text-xs tracking-[0.4em] uppercase text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.8)]"
            >
              <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
              <span>Invitación Especial</span>
              <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
            </motion.div>

            <motion.button
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenEnvelope}
              className="group relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-[2.5rem] border-2 border-amber-400/60 bg-gradient-to-b from-[#FAF8F5] via-[#F3ECE3] to-[#E2D2C0] p-8 text-center shadow-[0_35px_90px_rgba(217,119,6,0.35)] cursor-pointer"
            >
              <CornerOrnament className="absolute top-2 left-2" />
              <CornerOrnament className="absolute top-2 right-2 rotate-90" />

              <div className="absolute top-0 h-3 w-44 rounded-b-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 shadow-lg" />

              {/* Osito Central en el Sobre con Animación */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative my-6 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-amber-100 to-amber-200/90 p-4 shadow-2xl ring-4 ring-amber-300/50"
              >
                <BearIllustration />
                <div className="absolute bottom-1 right-1 rounded-full bg-gradient-to-r from-amber-700 to-amber-900 p-2 text-amber-100 shadow-xl">
                  <Heart className="h-4 w-4 fill-current text-amber-200" />
                </div>
              </motion.div>

              <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-amber-900">
                Nuestra Pequeña
              </p>
              
              <h2 className="my-1 font-serif text-2xl font-bold tracking-tight text-[#2A2421]">
                Merari Catalina
              </h2>

              <p className="text-xs font-semibold text-amber-800 mt-1">¡Toca para abrir tu invitación!</p>

              <div className="mt-7 flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 px-9 py-4 text-xs font-bold tracking-widest uppercase text-amber-100 shadow-2xl transition-all group-hover:scale-105 group-hover:from-amber-500 group-hover:to-amber-800">
                <MailOpen className="h-4 w-4 text-amber-200 animate-pulse" />
                <span>Abrir Invitación</span>
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* =========================================================
             VISTA 2: TARJETA PRINCIPAL PROFESIONAL Y ELEGANTE
             ========================================================= */
          <motion.main
            key="invitation-view"
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 flex min-h-[900px] w-full max-w-md flex-col items-center overflow-y-auto border-2 border-amber-400/60 bg-[#FDFBF7] px-6 py-8 shadow-[0_35px_110px_rgba(217,119,6,0.4)] md:rounded-[3rem] my-8"
          >
            {/* Esquinas ornamentadas en las 4 esquinas */}
            <CornerOrnament className="absolute top-2 left-2" />
            <CornerOrnament className="absolute top-2 right-2 rotate-90" />
            <CornerOrnament className="absolute bottom-2 left-2 -rotate-90" />
            <CornerOrnament className="absolute bottom-2 right-2 rotate-180" />

            {/* Marcos interiores sofisticados */}
            <div className="absolute inset-3 border border-amber-400/45 rounded-[2.5rem] pointer-events-none" />
            <div className="absolute inset-4 border border-dashed border-amber-300/30 rounded-[2.2rem] pointer-events-none" />

            {/* Botón Cerrar Sobre */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end z-30 rounded-full bg-amber-100/90 px-4 py-1.5 text-[10px] font-black tracking-widest uppercase text-amber-900 transition-all hover:bg-amber-200 hover:scale-105 shadow-sm cursor-pointer"
            >
              ✕ Cerrar Sobre
            </button>

            {/* Encabezado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-1 z-10 w-full"
            >
              <p className="font-serif text-xs italic tracking-widest text-amber-900/80">
                Con mucho amor te invitamos a la
              </p>

              <h1 className="my-2 font-serif text-2xl font-bold uppercase tracking-wider bg-gradient-to-b from-[#2A2421] via-[#3D322C] to-[#1A1614] bg-clip-text text-transparent">
                Ceremonia y <br />
                Recepción
              </h1>

              {/* Nombre de la festejada con estilo tipográfico de lujo */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                className="my-3 py-2 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-500/60" />
                  <Sparkles className="h-3 w-3 text-amber-600/70" />
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-500/60" />
                </div>

                <h2 className="font-serif italic text-4xl md:text-5xl font-extrabold tracking-wide leading-tight bg-gradient-to-r from-amber-900 via-amber-600 to-amber-950 bg-clip-text text-transparent drop-shadow-md">
                  Merari Catalina
                </h2>

                <div className="flex items-center justify-center gap-2 mt-1">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/60" />
                  <div className="h-1.5 w-1.5 rotate-45 bg-amber-500/80" />
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/60" />
                </div>
              </motion.div>
            </motion.div>

            {/* Osito Central con Aureola Giratoria Animada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 120 }}
              className="relative my-2 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-b from-amber-100 to-amber-200/90 p-4 shadow-2xl ring-4 ring-amber-300/60 z-10"
            >
              <BearIllustration />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1.5 rounded-full border-2 border-dashed border-amber-500/60 pointer-events-none"
              />
            </motion.div>

            {/* Mensaje emotivo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="my-2 max-w-xs text-center font-serif text-xs italic leading-relaxed text-neutral-700 z-10"
            >
              Será un día lleno de magia y bendiciones. Queremos compartir este gran momento contigo.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-3 font-serif text-base italic font-extrabold text-amber-800 tracking-wide z-10"
            >
              ¡Te esperamos con los brazos abiertos!
            </motion.p>

            {/* TARJETAS DE FECHA Y HORARIOS (Con efectos hover profesionales) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="my-2 grid w-full grid-cols-3 gap-2 border-y-2 border-amber-300/80 py-4 text-center bg-gradient-to-b from-amber-50/70 to-amber-100/30 rounded-2xl shadow-inner z-10"
            >
              <motion.div whileHover={{ y: -4, scale: 1.03 }} className="flex flex-col items-center justify-start border-r border-amber-300/60 px-1">
                <Calendar className="mb-1 h-5 w-5 text-amber-700 animate-pulse" />
                <p className="text-[11px] font-bold text-[#2A2421]">Sábado</p>
                <p className="my-0.5 font-serif text-2xl font-black text-amber-700">28</p>
                <p className="text-[9px] font-semibold uppercase text-neutral-500">Noviembre 2025</p>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.03 }} className="flex flex-col items-center justify-start border-r border-amber-300/60 px-1">
                <Church className="mb-1 h-5 w-5 text-amber-700" />
                <p className="text-[11px] font-bold text-[#2A2421]">Ceremonia</p>
                <p className="text-[10px] font-extrabold text-amber-900">11:00 a.m.</p>
                <p className="mt-1 text-[10px] font-medium text-neutral-600">Gante 5</p>
                <p className="text-[10px] font-medium text-neutral-600">CDMX</p>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.03 }} className="flex flex-col items-center justify-start px-1">
                <PartyPopper className="mb-1 h-5 w-5 text-amber-700 animate-bounce" />
                <p className="text-[11px] font-bold text-[#2A2421]">Recepción</p>
                <p className="text-[10px] font-extrabold text-amber-900">3:00 p.m.</p>
                <p className="mt-1 text-[10px] font-medium text-neutral-600">Salón Flamingo</p>
              </motion.div>
            </motion.div>

            {/* BOTÓN UBICACIÓN MAPS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="my-3 w-full text-center z-20"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#2A2421] via-[#1F1A17] to-[#12100F] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-amber-100 shadow-2xl border-2 border-amber-400/50 transition-all cursor-pointer"
              >
                <MapPin className="h-4 w-4 text-amber-400 animate-bounce" />
                <span>Ver Ubicación en Maps</span>
              </motion.a>
            </motion.div>

            {/* PAPÁS Y PADRINOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-1 w-full text-center z-10"
            >
              <div className="my-1.5 rounded-2xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-amber-100/70 p-3 border-2 border-amber-300/50 shadow-md">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic font-bold text-amber-900">
                  <BearPawIcon className="h-3.5 w-3.5 text-amber-700" /> Mis Papás <BearPawIcon className="h-3.5 w-3.5 text-amber-700" />
                </p>
                <p className="mt-0.5 text-sm font-extrabold text-[#2A2421]">Isai Lino y Lidia Moreno</p>
              </div>

              <div className="my-1.5 rounded-2xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-amber-100/70 p-3 border-2 border-amber-300/50 shadow-md">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic font-bold text-amber-900">
                  <BearPawIcon className="h-3.5 w-3.5 text-amber-700" /> Mis Padrinos <BearPawIcon className="h-3.5 w-3.5 text-amber-700" />
                </p>
                <p className="mt-0.5 text-sm font-extrabold text-[#2A2421]">Teresa Barcenas y Luis Moreno</p>
              </div>
            </motion.div>

            {/* BOTÓN ASISTENCIA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="mt-3 flex flex-col items-center text-center z-20"
            >
              <p className="max-w-xs font-serif text-[11px] italic text-neutral-600 leading-relaxed font-medium">
                Tu confirmación nos ayudará a organizar todo con mucho amor.
              </p>

              <Link href="/formulario">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 px-9 py-4 text-xs font-black tracking-wider text-amber-100 shadow-2xl transition-all border border-amber-400/50 cursor-pointer"
                >
                  <ClipboardList className="h-4 w-4 text-amber-200 animate-bounce" />
                  <span>Confirmar Asistencia</span>
                </motion.div>
              </Link>

              <p className="mt-3 font-serif text-lg italic font-black text-amber-900">
                ¡Gracias por acompañarnos! ✨
              </p>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
