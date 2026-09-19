"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Church, PartyPopper, Sparkles, MailOpen, Calendar, ClipboardList, Volume2, VolumeX, Moon, Leaf } from "lucide-react"

// Ilustración Botánica / Lunar Minimalista SVG
function BotanicalMoonIllustration({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Resplandor esmeralda de fondo */}
      <circle cx="100" cy="100" r="90" fill="url(#moonGlow)" />

      {/* Luna Creciente Estilizada */}
      <path
        d="M115 40C84.6243 40 60 64.6243 60 95C60 125.376 84.6243 150 115 150C123.4 150 131.4 148.1 138.5 144.6C121.5 141.2 108.5 126.1 108.5 107.5C108.5 88.9 121.5 73.8 138.5 70.4C131.4 66.9 123.4 65 115 65V40Z"
        fill="#A7F3D0"
        opacity="0.9"
      />

      {/* Hojas Botánicas Decorativas */}
      <path d="M70 120C50 120 35 105 35 90C35 75 50 60 70 60" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
      <path d="M55 80L35 70" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <path d="M60 100L38 105" stroke="#059669" strokeWidth="2" strokeLinecap="round" />

      {/* Pequeñas Estrellas */}
      <circle cx="145" cy="55" r="3" fill="#6EE7B7" />
      <circle cx="155" cy="95" r="2" fill="#A7F3D0" />
      <circle cx="130" cy="155" r="2.5" fill="#6EE7B7" />
    </svg>
  )
}

function LeafIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 10C50 10 90 30 90 60C90 80 70 90 50 90C30 90 10 80 10 60C10 30 50 10 50 10Z" opacity="0.8" />
      <path d="M50 10V90" stroke="#064E3B" strokeWidth="6" />
    </svg>
  )
}

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`h-12 w-12 text-emerald-400/40 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5,5 L95,5 M5,5 L5,95" />
      <circle cx="15" cy="15" r="4" fill="currentColor" />
    </svg>
  )
}

// Lluvia sutil de estrellas plateadas/esmeralda
function SilverSparkles() {
  const sparkles = Array.from({ length: 20 })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-300/30"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        >
          <Sparkles className="h-3 w-3 fill-emerald-200" />
        </motion.div>
      ))}
    </div>
  )
}

export default function InvitacionBotánica() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

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

  const locationUrl = `https://www.google.com/maps/dir//Salon+flamingo+Tultitlan,+Av.+Toluca+Esq,+La+Sarda%C3%B1a,+54090+Buenavista,+M%C3%A9x./@19.6083712,-99.1592448,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d1f77daf733af9:0xa27412d4f0116198!2m2!1d-99.1774046!2d19.5935291`

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#02231A] p-3 font-sans text-emerald-50 md:p-6 overflow-hidden selection:bg-emerald-500 selection:text-white">
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
        loop
        preload="auto"
      />

      <SilverSparkles />

      {/* BOTÓN MÚSICA */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        <span className="hidden text-[10px] font-bold uppercase tracking-widest text-emerald-200 bg-[#064E3B]/90 px-3.5 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-md shadow-2xl md:inline-block">
          {isPlaying ? "Ambiente musical activo" : "Música pausada"}
        </span>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-400/50 bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#011C14] text-emerald-200 shadow-[0_10px_30px_rgba(5,150,105,0.4)] backdrop-blur-lg transition-all hover:border-emerald-300"
        >
          {isPlaying ? (
            <Volume2 className="h-6 w-6 text-emerald-300 animate-pulse" />
          ) : (
            <VolumeX className="h-6 w-6 text-emerald-600/70" />
          )}
        </motion.button>
      </motion.div>

      {/* Fondo con brillo ambiental */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/60 via-[#02231A] to-[#01120D] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* =========================================================
             VISTA 1: PORTADA / SELLO DE SOBRE ESTILIZADO
             ========================================================= */
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mb-6 flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase text-emerald-300/80"
            >
              <Leaf className="h-4 w-4 text-emerald-400" />
              <span>Edición Especial</span>
              <Leaf className="h-4 w-4 text-emerald-400" />
            </motion.div>

            <motion.button
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenEnvelope}
              className="group relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-[2rem] border border-emerald-500/40 bg-gradient-to-b from-[#064E3B] via-[#022C22] to-[#011C14] p-8 text-center shadow-[0_25px_60px_rgba(2,35,26,0.8)] transition-all duration-500 hover:border-emerald-400"
            >
              <CornerOrnament className="absolute top-3 left-3" />
              <CornerOrnament className="absolute top-3 right-3 rotate-90" />

              <div className="absolute top-0 h-1.5 w-32 rounded-b-full bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400 shadow-md" />

              {/* Contenedor central con ilustración lunar */}
              <div className="relative my-6 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-[#022C22] to-[#011C14] p-4 shadow-inner ring-2 ring-emerald-500/30">
                <BotanicalMoonIllustration />
                <div className="absolute bottom-1 right-1 rounded-full bg-emerald-500 p-2 text-emerald-950 shadow-lg">
                  <Moon className="h-4 w-4 fill-current text-emerald-950" />
                </div>
              </div>

              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-400/80">
                Pase de Entrada
              </p>
              
              <h2 className="my-2 font-serif text-2xl font-bold tracking-wide text-white">
                Merari Catalina
              </h2>

              <p className="text-xs font-light text-emerald-200/70 tracking-wider mb-6">Sábado 28 de Noviembre</p>

              <div className="flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-xs font-bold tracking-widest uppercase text-emerald-950 shadow-xl transition-all duration-300 group-hover:bg-emerald-400 group-hover:scale-105">
                <MailOpen className="h-4 w-4" />
                <span>Revelar Invitación</span>
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* =========================================================
             VISTA 2: TARJETA INTERNA MODERNA Y LIMPIA
             ========================================================= */
          <motion.main
            key="invitation-view"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex min-h-screen w-full max-w-md flex-col items-center overflow-y-auto border border-emerald-500/30 bg-[#031F18] px-6 py-8 shadow-[0_20px_80px_rgba(1,18,13,0.9)] md:min-h-[850px] md:max-h-[920px] md:rounded-[2.5rem]"
          >
            {/* Esquinas decorativas */}
            <CornerOrnament className="absolute top-3 left-3" />
            <CornerOrnament className="absolute top-3 right-3 rotate-90" />
            <CornerOrnament className="absolute bottom-3 left-3 -rotate-90" />
            <CornerOrnament className="absolute bottom-3 right-3 rotate-180" />

            {/* Botón Cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end z-20 rounded-full bg-emerald-900/60 px-4 py-1 text-[10px] font-mono tracking-widest uppercase text-emerald-300 transition-all hover:bg-emerald-800 hover:scale-105"
            >
              ✕ Cerrar
            </button>

            {/* Encabezado */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-2 z-10 w-full"
            >
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-emerald-400/70">
                Estás cordialmente invitado a la
              </p>

              <h1 className="my-2 font-serif text-2xl font-light tracking-widest text-white uppercase">
                Ceremonia &amp; Recepción
              </h1>

              {/* Nombre de la protagonista */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative my-4 py-2 text-center"
              >
                <h2 className="font-serif italic text-4xl md:text-5xl font-normal tracking-wide text-emerald-200 drop-shadow-md">
                  Merari Catalina
                </h2>
                <div className="mx-auto mt-2 h-[1px] w-24 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
              </motion.div>
            </motion.div>

            {/* Ilustración Central Reducida */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              className="relative my-2 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-b from-[#064E3B] to-[#011C14] p-3 shadow-lg ring-1 ring-emerald-400/40 z-10"
            >
              <BotanicalMoonIllustration />
            </motion.div>

            {/* Mensaje */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="my-3 max-w-xs text-center font-light text-xs leading-relaxed text-emerald-100/80 z-10"
            >
              Un momento especial merece ser compartido con las personas que más amamos. ¡Te esperamos!
            </motion.p>

            {/* TARJETAS DE FECHA Y HORARIOS (Estilo Moderno Minimal) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="my-3 grid w-full grid-cols-3 gap-2 border-y border-emerald-500/30 py-4 text-center bg-[#022C22]/40 rounded-2xl z-10"
            >
              <div className="flex flex-col items-center justify-start border-r border-emerald-500/20 px-1">
                <Calendar className="mb-1 h-4 w-4 text-emerald-400" />
                <p className="text-[10px] uppercase font-mono text-emerald-300">Sábado</p>
                <p className="my-0.5 font-serif text-2xl font-bold text-white">28</p>
                <p className="text-[9px] uppercase tracking-wider text-emerald-400/60">Nov 2025</p>
              </div>

              <div className="flex flex-col items-center justify-start border-r border-emerald-500/20 px-1">
                <Church className="mb-1 h-4 w-4 text-emerald-400" />
                <p className="text-[10px] uppercase font-mono text-emerald-300">Ceremonia</p>
                <p className="text-[10px] font-bold text-white mt-1">11:00 a.m.</p>
                <p className="mt-1 text-[9px] text-emerald-200/70">Gante 5, CDMX</p>
              </div>

              <div className="flex flex-col items-center justify-start px-1">
                <PartyPopper className="mb-1 h-4 w-4 text-emerald-400" />
                <p className="text-[10px] uppercase font-mono text-emerald-300">Recepción</p>
                <p className="text-[10px] font-bold text-white mt-1">3:00 p.m.</p>
                <p className="mt-1 text-[9px] text-emerald-200/70">Salón Flamingo</p>
              </div>
            </motion.div>

            {/* BOTÓN UBICACIÓN MAPS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="my-2 w-full text-center z-20"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-900 px-7 py-3 text-xs font-bold uppercase tracking-widest text-emerald-100 shadow-xl border border-emerald-500/40 transition-all hover:border-emerald-300"
              >
                <MapPin className="h-4 w-4 text-emerald-300" />
                <span>Ver Ubicación en Google Maps</span>
              </motion.a>
            </motion.div>

            {/* SECCIÓN PAPÁS Y PADRINOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-2 w-full text-center z-10 space-y-2"
            >
              <div className="rounded-xl bg-[#022C22]/60 p-2.5 border border-emerald-500/20">
                <p className="flex items-center justify-center gap-1.5 font-mono text-[11px] text-emerald-300 uppercase tracking-wider">
                  <LeafIcon className="h-3 w-3 text-emerald-400" /> Mis Papás <LeafIcon className="h-3 w-3 text-emerald-400" />
                </p>
                <p className="mt-1 text-xs font-semibold text-white">Isai Lino y Lidia Moreno</p>
              </div>

              <div className="rounded-xl bg-[#022C22]/60 p-2.5 border border-emerald-500/20">
                <p className="flex items-center justify-center gap-1.5 font-mono text-[11px] text-emerald-300 uppercase tracking-wider">
                  <LeafIcon className="h-3 w-3 text-emerald-400" /> Mis Padrinos <LeafIcon className="h-3 w-3 text-emerald-400" />
                </p>
                <p className="mt-1 text-xs font-semibold text-white">Teresa Barcenas y Luis Moreno</p>
              </div>
            </motion.div>

            {/* BOTÓN ASISTENCIA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="mt-4 flex flex-col items-center text-center z-20"
            >
              <p className="max-w-xs font-light text-[11px] text-emerald-200/70">
                Confirma tu asistencia para formar parte de este hermoso día.
              </p>

              <Link href="/formulario">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 inline-flex items-center gap-2.5 rounded-full bg-emerald-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-emerald-950 shadow-2xl transition-all hover:bg-emerald-400 cursor-pointer"
                >
                  <ClipboardList className="h-4 w-4" />
                  <span>Confirmar Asistencia</span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
