"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Church, PartyPopper, Heart, Sparkles, MailOpen, Calendar, ClipboardList, Volume2, VolumeX, Star, Music, Gift, Smile } from "lucide-react"

// Esquinas ornamentadas en tono dorado original
function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`h-14 w-14 text-amber-500/60 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M0,0 L50,0 C25,15 15,25 0,50 Z" fill="currentColor" opacity="0.3" />
      <path d="M0,30 C40,30 50,40 50,80" />
      <path d="M30,0 C30,40 40,50 80,50" />
      <circle cx="30" cy="30" r="5" fill="currentColor" />
    </svg>
  )
}

// Lluvia constante de confeti y destellos en tonos dorados y champaña festivos
function GoldPartyConfetti() {
  const items = Array.from({ length: 35 })
  const colors = ["#F59E0B", "#D97706", "#FCD34D", "#B45309", "#FFFBEB", "#FBBF24"]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {items.map((_, i) => {
        const randomColor = colors[i % colors.length]
        const size = Math.random() * 8 + 5
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: "-10%",
              left: `${Math.random() * 100}%`,
              width: size,
              height: size * (Math.random() > 0.5 ? 1 : 2.5),
              backgroundColor: randomColor,
              boxShadow: "0 0 8px rgba(245, 158, 11, 0.6)"
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, (Math.random() - 0.5) * 120],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [1, 0.9, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        )
      })}
    </div>
  )
}

export default function InvitacionFiestaDorada() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Autoplay con interacción
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
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#0F0D0C] p-3 font-sans text-[#2A2421] md:p-6 overflow-hidden selection:bg-amber-300">
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
        loop
        preload="auto"
      />

      {isOpen && <GoldPartyConfetti />}

      {/* FONDO AMBIENTAL DORADO */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-[#0F0D0C] to-[#050404] pointer-events-none" />

      {/* BOTÓN MÚSICA FLOTANTE */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        <span className="hidden text-[10px] font-bold uppercase tracking-widest text-amber-200/90 bg-[#1F1A17]/90 px-3.5 py-1.5 rounded-full border border-amber-400/30 backdrop-blur-md shadow-2xl md:inline-block">
          {isPlaying ? "¡Música activa!" : "Música en pausa"}
        </span>

        <motion.button
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.85 }}
          onClick={toggleMusic}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-400/60 bg-gradient-to-br from-[#2A2421] via-[#1A1614] to-[#0D0B0A] text-amber-100 shadow-[0_10px_35px_rgba(217,119,6,0.4)] backdrop-blur-lg cursor-pointer"
        >
          {isPlaying ? <Volume2 className="h-6 w-6 text-amber-400 animate-bounce" /> : <VolumeX className="h-6 w-6 text-neutral-400" />}
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* =========================================================
             VISTA 1: SOBRE DORADO INICIAL FESTIVO
             ========================================================= */
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="mb-6 flex items-center gap-2.5 font-serif text-xs tracking-[0.4em] uppercase text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.8)]"
            >
              <PartyPopper className="h-5 w-5 text-amber-400 animate-spin" />
              <span>¡Gran Celebración!</span>
              <PartyPopper className="h-5 w-5 text-amber-400 animate-spin" />
            </motion.div>

            <motion.button
              whileHover={{ y: -10, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenEnvelope}
              className="group relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-[2.5rem] border-2 border-amber-400/60 bg-gradient-to-b from-[#FAF8F5] via-[#F3ECE3] to-[#E2D2C0] p-8 text-center shadow-[0_30px_80px_rgba(217,119,6,0.3)] cursor-pointer"
            >
              <CornerOrnament className="absolute top-2 left-2" />
              <CornerOrnament className="absolute top-2 right-2 rotate-90" />

              <div className="absolute top-0 h-3 w-48 rounded-b-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 shadow-lg" />

              {/* Círculo Central Brillante */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative my-6 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-1 shadow-2xl ring-4 ring-amber-300/50"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#FAF8F5]">
                  <PartyPopper className="h-14 w-14 text-amber-700 animate-bounce" />
                </div>
              </motion.div>

              <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-amber-900">
                Fiesta y Recepción
              </p>
              
              <h2 className="my-1 font-serif text-3xl font-extrabold tracking-tight text-[#2A2421]">
                Merari Catalina
              </h2>

              <p className="text-xs font-bold text-amber-800 mt-1">¡Toca para abrir tu invitación!</p>

              <div className="mt-7 flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 px-9 py-4 text-xs font-black tracking-widest uppercase text-amber-100 shadow-2xl transition-all group-hover:scale-105 group-hover:from-amber-500 group-hover:to-amber-800">
                <MailOpen className="h-4 w-4 animate-pulse text-amber-200" />
                <span>¡Abrir Invitación!</span>
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* =========================================================
             VISTA 2: TARJETA PRINCIPAL EN TONOS DORADOS Y FIESTA
             ========================================================= */
          <motion.main
            key="invitation-view"
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 flex min-h-[900px] w-full max-w-md flex-col items-center overflow-y-visible border-2 border-amber-400/60 bg-[#FDFBF7] px-6 py-8 shadow-[0_30px_100px_rgba(217,119,6,0.35)] md:rounded-[3rem] my-8"
          >
            {/* Esquinas ornamentadas */}
            <CornerOrnament className="absolute top-2 left-2" />
            <CornerOrnament className="absolute top-2 right-2 rotate-90" />
            <CornerOrnament className="absolute bottom-2 left-2 -rotate-90" />
            <CornerOrnament className="absolute bottom-2 right-2 rotate-180" />

            {/* Bordes internos dorados */}
            <div className="absolute inset-3 border border-amber-400/45 rounded-[2.5rem] pointer-events-none" />
            <div className="absolute inset-4 border border-dashed border-amber-300/30 rounded-[2rem] pointer-events-none" />

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
              className="text-center mt-2 z-10 w-full"
            >
              <div className="flex items-center justify-center gap-2 mb-1 text-amber-700 font-bold text-xs uppercase tracking-widest">
                <Sparkles className="h-4 w-4 animate-spin text-amber-500" />
                <span>¡Celebremos Juntos!</span>
                <Sparkles className="h-4 w-4 animate-spin text-amber-500" />
              </div>

              <h1 className="my-1 font-serif text-2xl font-black uppercase tracking-wider text-[#2A2421]">
                Ceremonia y <br />
                Gran Recepción
              </h1>

              {/* Nombre de la festejada en tonos dorados relucientes */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
                className="my-3 py-2 text-center"
              >
                <h2 className="font-serif italic text-4xl md:text-5xl font-black tracking-wide bg-gradient-to-r from-amber-800 via-amber-600 to-amber-950 bg-clip-text text-transparent drop-shadow-md">
                  Merari Catalina
                </h2>
              </motion.div>
            </motion.div>

            {/* Ícono Central Animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
              className="relative my-2 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-1.5 shadow-xl ring-4 ring-amber-300/60 z-10"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#FDFBF7]">
                <Gift className="h-14 w-14 text-amber-700 animate-pulse" />
              </div>
            </motion.div>

            {/* Mensaje alegre */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="my-2 max-w-xs text-center font-serif text-xs italic leading-relaxed text-neutral-700 font-medium z-10"
            >
              ¡Prepara tu mejor energía y tu mejor sonrisa! Vamos a celebrar a lo grande este día tan especial.
            </motion.p>

            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mb-3 font-serif text-base italic font-black text-amber-800 tracking-wide z-10"
            >
              ¡La diversión está garantizada contigo! 🎉
            </motion.p>

            {/* TARJETAS DE FECHA Y HORARIOS */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="my-2 grid w-full grid-cols-3 gap-2 border-y-2 border-amber-300/80 py-4 text-center bg-gradient-to-b from-amber-50/70 to-amber-100/30 rounded-2xl shadow-inner z-10"
            >
              <motion.div whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center justify-start border-r border-amber-300/60 px-1">
                <Calendar className="mb-1 h-5 w-5 text-amber-700 animate-pulse" />
                <p className="text-[11px] font-bold text-[#2A2421]">Sábado</p>
                <p className="my-0.5 font-serif text-2xl font-black text-amber-700">28</p>
                <p className="text-[9px] font-bold uppercase text-neutral-500">Nov 2025</p>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center justify-start border-r border-amber-300/60 px-1">
                <Church className="mb-1 h-5 w-5 text-amber-700" />
                <p className="text-[11px] font-bold text-[#2A2421]">Ceremonia</p>
                <p className="text-[10px] font-extrabold text-amber-900">11:00 a.m.</p>
                <p className="mt-1 text-[10px] font-semibold text-neutral-600">Gante 5, CDMX</p>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center justify-start px-1">
                <PartyPopper className="mb-1 h-5 w-5 text-amber-700 animate-bounce" />
                <p className="text-[11px] font-bold text-[#2A2421]">Recepción</p>
                <p className="text-[10px] font-extrabold text-amber-900">3:00 p.m.</p>
                <p className="mt-1 text-[10px] font-semibold text-neutral-600">Salón Flamingo</p>
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
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#2A2421] via-[#1F1A17] to-[#12100F] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-amber-100 shadow-xl border-2 border-amber-400/50 transition-all cursor-pointer"
              >
                <MapPin className="h-4 w-4 animate-bounce text-amber-400" />
                <span>¡Cómo Llegar a la Fiesta!</span>
              </motion.a>
            </motion.div>

            {/* PAPÁS Y PADRINOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-1 w-full text-center z-10"
            >
              <div className="my-1.5 rounded-2xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-amber-100/70 p-3 border-2 border-amber-300/50 shadow-sm">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic font-bold text-amber-900">
                  <Smile className="h-3.5 w-3.5 text-amber-700" /> Mis Papás <Smile className="h-3.5 w-3.5 text-amber-700" />
                </p>
                <p className="mt-0.5 text-sm font-black text-[#2A2421]">Isai Lino y Lidia Moreno</p>
              </div>

              <div className="my-1.5 rounded-2xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-amber-100/70 p-3 border-2 border-amber-300/50 shadow-sm">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic font-bold text-amber-900">
                  <Star className="h-3.5 w-3.5 text-amber-600 fill-amber-500" /> Mis Padrinos <Star className="h-3.5 w-3.5 text-amber-600 fill-amber-500" />
                </p>
                <p className="mt-0.5 text-sm font-black text-[#2A2421]">Teresa Barcenas y Luis Moreno</p>
              </div>
            </motion.div>

            {/* BOTÓN ASISTENCIA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-3 flex flex-col items-center text-center z-20"
            >
              <p className="max-w-xs font-serif text-[11px] italic text-neutral-600 leading-relaxed font-semibold">
                ¡Confirma tu asistencia para preparar el mejor lugar para ti!
              </p>

              <Link href="/formulario">
                <motion.div
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 px-9 py-4 text-xs font-black tracking-wider text-amber-100 shadow-2xl transition-all border border-amber-400/50 cursor-pointer"
                >
                  <ClipboardList className="h-4 w-4 animate-bounce text-amber-200" />
                  <span>¡Confirmar mi Asistencia!</span>
                </motion.div>
              </Link>

              <p className="mt-3 font-serif text-lg italic font-black text-amber-900">
                ¡Te esperamos con toda la actitud! 🥳
              </p>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
