"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Church, PartyPopper, Sparkles, MailOpen, Calendar, ClipboardList, Volume2, VolumeX, Star } from "lucide-react"

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
        <span className="hidden text-[10px] font-bold uppercase tracking-widest text-amber-200/90 bg-[#1F1A17]/90 px-3.5 py-1.5 rounded-full border border-amber-400/35 backdrop-blur-md shadow-2xl md:inline-block">
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

              {/* OSITO CON NOMBRE INTEGRADO EN EL SOBRE */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative my-6 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-b from-amber-100 to-amber-200/80 p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] ring-4 ring-amber-300/40 overflow-hidden"
              >
                <Image src="/oso.png" alt="Osito" width={160} height={160} className="object-contain" priority />
                {/* Nombre Merari Catalina dentro del osito */}
                <div className="absolute inset-x-0 bottom-[15%] flex justify-center">
                  <span className="font-serif text-[10px] font-black text-amber-950/80 bg-white/60 px-2 py-0.5 rounded-full shadow-sm tracking-wide">
                    Merari Catalina
                  </span>
                </div>
              </motion.div>

              {/* TEXTO ACTUALIZADO DEL SOBRE */}
              <p className="text-sm font-extrabold uppercase tracking-wide text-amber-950/90 leading-tight">
                Bautizo y <br /> Primer Año
              </p>
              
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-amber-900/60 mt-3">
                De nuestra pequeña
              </p>

              <div className="mt-7 flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 px-9 py-3.5 text-xs font-bold tracking-widest uppercase text-amber-100 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:from-amber-500 group-hover:to-amber-800">
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
            className="relative z-10 flex min-h-screen w-full max-w-md flex-col items-center overflow-y-auto border-2 border-amber-400/50 bg-[#FDFBF7] px-6 py-8 shadow-[0_30px_100px_rgba(217,119,6,0.3)] md:min-h-[960px] md:max-h-[980px] md:rounded-[2.8rem]"
          >
            <CornerOrnament className="absolute top-2 left-2" />
            <CornerOrnament className="absolute top-2 right-2 rotate-90" />
            <CornerOrnament className="absolute bottom-2 left-2 -rotate-90" />
            <CornerOrnament className="absolute bottom-2 right-2 rotate-180" />

            <div className="absolute inset-3 border border-amber-400/40 rounded-[2.3rem] pointer-events-none" />
            <div className="absolute inset-4 border border-dashed border-amber-300/30 rounded-[2rem] pointer-events-none" />

            <button
              onClick={() => setIsOpen(false)}
              className="self-end z-25 rounded-full bg-amber-100 px-4 py-1.5 text-[11px] font-extrabold tracking-[0.25em] uppercase text-amber-950 transition-all hover:bg-amber-200 hover:scale-105 active:scale-95 shadow-md border border-amber-300/60"
            >
              ✕ Cerrar
            </button>

            {/* ENCABEZADO SUPERIOR */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-3 mb-1 z-10 w-full"
            >
              <p className="font-serif text-[11px] italic tracking-wider text-amber-900/80">
                Con mucho amor te invitamos a la
              </p>
              <h1 className="font-serif text-lg md:text-xl font-black tracking-widest text-amber-950 uppercase my-1">
                Celebración de mi primer año
              </h1>
              <p className="font-serif text-xs md:text-sm font-bold tracking-wider text-amber-900 uppercase">
                Bautizo
              </p>
            </motion.div>

            {/* FOTO PRINCIPAL / OSITO */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative my-4 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-amber-100 to-amber-200 p-2 shadow-inner ring-4 ring-amber-300/50"
            >
              <Image src="/oso.png" alt="Merari Catalina" width={140} height={140} className="object-contain drop-shadow-md" />
            </motion.div>

            <div className="text-center mb-6">
              <h2 className="font-serif text-2xl md:text-3xl font-black tracking-widest text-amber-950 uppercase">
                Merari Catalina
              </h2>
              <p className="font-serif text-xs text-amber-900/80 tracking-widest mt-1">
                Mis primeros pasos y bendiciones
              </p>
            </div>

            {/* ITINERARIO Y DETALLES */}
            <div className="w-full space-y-4 mb-6">
              {/* Ceremonia */}
              <div className="flex items-center gap-4 rounded-2xl bg-amber-50/80 p-4 border border-amber-200/60 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-900">
                  <Church className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-amber-950">Ceremonia Religiosa</h3>
                  <p className="text-xs text-amber-900/80">Iglesia / Parroquia</p>
                  <p className="text-xs font-bold text-amber-950 mt-0.5">12:00 PM</p>
                </div>
              </div>

              {/* Recepción */}
              <div className="flex items-center gap-4 rounded-2xl bg-amber-50/80 p-4 border border-amber-200/60 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-900">
                  <PartyPopper className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-amber-950">Recepción / Salón</h3>
                  <p className="text-xs text-amber-900/80">Salón Flamingo Tultitlán</p>
                  <p className="text-xs font-bold text-amber-950 mt-0.5">02:30 PM</p>
                </div>
              </div>
            </div>

            {/* BOTÓN MAPA */}
            <Link
              href={locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 py-3.5 text-xs font-bold tracking-widest uppercase text-amber-100 shadow-lg transition-all hover:scale-[1.02] active:scale-95 mb-6"
            >
              <MapPin className="h-4 w-4 text-amber-200" />
              <span>Ver Ubicación en Google Maps</span>
            </Link>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
