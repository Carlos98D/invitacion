"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Church, PartyPopper, Heart, Sparkles, MailOpen, Calendar, ClipboardList, Volume2, VolumeX, Star, Music, Gift, Smile } from "lucide-react"

// Íconos decorativos festivos para la esquina
function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`h-14 w-14 text-amber-400/60 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M0,0 L50,0 C25,15 15,25 0,50 Z" fill="currentColor" opacity="0.3" />
      <path d="M0,30 C40,30 50,40 50,80" />
      <path d="M30,0 C30,40 40,50 80,50" />
      <circle cx="30" cy="30" r="5" fill="currentColor" />
    </svg>
  )
}

// Lluvia constante de confeti y destellos súper alegres
function PartyConfetti() {
  const items = Array.from({ length: 30 })
  const colors = ["#F59E0B", "#EC4899", "#8B5CF6", "#3B82F6", "#10B981", "#EF4444"]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {items.map((_, i) => {
        const randomColor = colors[i % colors.length]
        const size = Math.random() * 8 + 6
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
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, (Math.random() - 0.5) * 120],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [1, 0.8, 0],
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

export default function InvitacionFiesta() {
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
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#120D1A] via-[#1F1428] to-[#0A0711] p-3 font-sans text-[#2A2421] md:p-6 overflow-hidden selection:bg-pink-400">
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
        loop
        preload="auto"
      />

      {isOpen && <PartyConfetti />}

      {/* BOTÓN MÚSICA FLOTANTE */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        <span className="hidden text-[10px] font-bold uppercase tracking-widest text-pink-200 bg-[#251336]/90 px-3.5 py-1.5 rounded-full border border-pink-500/40 backdrop-blur-md shadow-2xl md:inline-block">
          {isPlaying ? "¡Música de Fiesta!" : "Música en pausa"}
        </span>

        <motion.button
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.85 }}
          onClick={toggleMusic}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-pink-400 bg-gradient-to-br from-pink-600 via-purple-600 to-amber-500 text-white shadow-[0_0_25px_rgba(236,72,153,0.6)] backdrop-blur-lg cursor-pointer"
        >
          {isPlaying ? <Volume2 className="h-6 w-6 animate-bounce" /> : <VolumeX className="h-6 w-6" />}
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* =========================================================
             VISTA 1: SOBRE DE FIESTA INICIAL (Animación de rebote y pulso)
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
              className="mb-6 flex items-center gap-2.5 font-serif text-xs tracking-[0.4em] uppercase text-pink-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]"
            >
              <PartyPopper className="h-5 w-5 text-pink-400 animate-spin" />
              <span>¡Estás Invitado a la Fiesta!</span>
              <PartyPopper className="h-5 w-5 text-pink-400 animate-spin" />
            </motion.div>

            <motion.button
              whileHover={{ y: -10, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenEnvelope}
              className="group relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-[2.5rem] border-2 border-pink-400/60 bg-gradient-to-b from-[#FFF5F8] via-[#FFE3EC] to-[#F3C6D3] p-8 text-center shadow-[0_20px_60px_rgba(236,72,153,0.4)] cursor-pointer"
            >
              <CornerOrnament className="absolute top-2 left-2" />
              <CornerOrnament className="absolute top-2 right-2 rotate-90" />

              <div className="absolute top-0 h-3 w-48 rounded-b-full bg-gradient-to-r from-pink-500 via-amber-400 to-pink-500 shadow-lg" />

              {/* Círculo Central con Animación de Brillo */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative my-6 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 p-1 shadow-2xl ring-4 ring-pink-300/60"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <PartyPopper className="h-16 w-16 text-pink-600 animate-bounce" />
                </div>
              </motion.div>

              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-pink-900">
                Gran Celebración
              </p>
              
              <h2 className="my-1 font-serif text-3xl font-extrabold tracking-tight text-[#1E122B]">
                Merari Catalina
              </h2>

              <p className="text-xs font-bold text-pink-700 mt-1">¡Toca para abrir la invitación!</p>

              <div className="mt-7 flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 px-9 py-4 text-xs font-black tracking-widest uppercase text-white shadow-xl transition-all group-hover:scale-105">
                <MailOpen className="h-4 w-4 animate-pulse" />
                <span>¡Abrir Ahora!</span>
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* =========================================================
             VISTA 2: TARJETA PRINCIPAL SÚPER ANIMADA Y FESTIVA
             ========================================================= */
          <motion.main
            key="invitation-view"
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 flex min-h-[900px] w-full max-w-md flex-col items-center overflow-y-visible border-3 border-pink-400/70 bg-[#FFFCFD] px-6 py-8 shadow-[0_25px_90px_rgba(236,72,153,0.5)] md:rounded-[3rem] my-8"
          >
            {/* Esquinas decorativas */}
            <CornerOrnament className="absolute top-2 left-2" />
            <CornerOrnament className="absolute top-2 right-2 rotate-90" />
            <CornerOrnament className="absolute bottom-2 left-2 -rotate-90" />
            <CornerOrnament className="absolute bottom-2 right-2 rotate-180" />

            {/* Bordes internos */}
            <div className="absolute inset-3 border-2 border-pink-300/40 rounded-[2.5rem] pointer-events-none" />

            {/* Botón Cerrar Sobre */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end z-30 rounded-full bg-pink-100 px-4 py-1.5 text-[10px] font-black tracking-widest uppercase text-pink-800 transition-all hover:bg-pink-200 hover:scale-105 shadow-md cursor-pointer"
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
              <div className="flex items-center justify-center gap-2 mb-1 text-pink-600 font-bold text-xs uppercase tracking-widest">
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>¡Estás Invitado!</span>
                <Sparkles className="h-4 w-4 animate-spin" />
              </div>

              <h1 className="my-1 font-serif text-2xl font-black uppercase tracking-wider text-[#1E122B]">
                Ceremonia y <br />
                Gran Recepción
              </h1>

              {/* Nombre de la festejada con estilo brillante */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
                className="my-3 py-2 text-center"
              >
                <h2 className="font-serif italic text-4xl md:text-5xl font-black tracking-wide bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 bg-clip-text text-transparent drop-shadow-md">
                  Merari Catalina
                </h2>
              </motion.div>
            </motion.div>

            {/* Ícono Central Animado de Fiesta */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
              className="relative my-2 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 p-1.5 shadow-2xl ring-4 ring-pink-300/50 z-10"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <Gift className="h-14 w-14 text-pink-600 animate-pulse" />
              </div>
            </motion.div>

            {/* Mensaje alegre */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="my-2 max-w-xs text-center font-serif text-xs italic leading-relaxed text-neutral-700 font-medium z-10"
            >
              ¡Prepara tus mejores pasos y tu mejor sonrisa! Vamos a celebrar a lo grande este día tan especial.
            </motion.p>

            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mb-3 font-serif text-base italic font-black text-pink-600 tracking-wide z-10"
            >
              ¡La diversión está garantizada contigo! 🎉
            </motion.p>

            {/* TARJETAS DE FECHA Y HORARIOS (Animadas con hover) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="my-2 grid w-full grid-cols-3 gap-2 border-y-2 border-pink-300/80 py-4 text-center bg-gradient-to-b from-pink-50/70 to-purple-50/40 rounded-2xl shadow-inner z-10"
            >
              <motion.div whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center justify-start border-r border-pink-200 px-1">
                <Calendar className="mb-1 h-5 w-5 text-pink-600 animate-pulse" />
                <p className="text-[11px] font-bold text-[#1E122B]">Sábado</p>
                <p className="my-0.5 font-serif text-2xl font-black text-pink-600">28</p>
                <p className="text-[9px] font-bold uppercase text-neutral-500">Nov 2025</p>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center justify-start border-r border-pink-200 px-1">
                <Church className="mb-1 h-5 w-5 text-purple-600" />
                <p className="text-[11px] font-bold text-[#1E122B]">Ceremonia</p>
                <p className="text-[10px] font-extrabold text-purple-800">11:00 a.m.</p>
                <p className="mt-1 text-[10px] font-semibold text-neutral-600">Gante 5, CDMX</p>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.05 }} className="flex flex-col items-center justify-start px-1">
                <PartyPopper className="mb-1 h-5 w-5 text-amber-600 animate-bounce" />
                <p className="text-[11px] font-bold text-[#1E122B]">Recepción</p>
                <p className="text-[10px] font-extrabold text-amber-700">3:00 p.m.</p>
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
                className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-pink-600/30 border border-pink-400 transition-all cursor-pointer"
              >
                <MapPin className="h-4 w-4 animate-bounce text-pink-200" />
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
              <div className="my-1.5 rounded-2xl bg-gradient-to-r from-pink-100/70 via-purple-50 to-pink-100/70 p-3 border-2 border-pink-300/50 shadow-sm">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic font-bold text-pink-900">
                  <Smile className="h-3.5 w-3.5 text-pink-600" /> Mis Papás <Smile className="h-3.5 w-3.5 text-pink-600" />
                </p>
                <p className="mt-0.5 text-sm font-black text-[#1E122B]">Isai Lino y Lidia Moreno</p>
              </div>

              <div className="my-1.5 rounded-2xl bg-gradient-to-r from-pink-100/70 via-purple-50 to-pink-100/70 p-3 border-2 border-pink-300/50 shadow-sm">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic font-bold text-pink-900">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-400" /> Mis Padrinos <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
                </p>
                <p className="mt-0.5 text-sm font-black text-[#1E122B]">Teresa Barcenas y Luis Moreno</p>
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
                  className="mt-3 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 px-9 py-4 text-xs font-black tracking-wider text-white shadow-xl shadow-purple-600/40 transition-all border border-pink-300 cursor-pointer"
                >
                  <ClipboardList className="h-4 w-4 animate-bounce text-amber-200" />
                  <span>¡Confirmar mi Asistencia!</span>
                </motion.div>
              </Link>

              <p className="mt-3 font-serif text-lg italic font-black text-pink-600">
                ¡Te esperamos con toda la actitud! 🥳
              </p>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
