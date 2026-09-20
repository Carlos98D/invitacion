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

              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative my-6 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-amber-100 to-amber-200/80 p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] ring-4 ring-amber-300/40 overflow-hidden"
              >
                <Image src="/oso.png" alt="Osito" width={140} height={140} className="object-contain" />
              </motion.div>

              <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-amber-900/80">
                Nuestra Pequeña
              </p>
              
              <h2 className="my-1 font-serif text-2xl font-bold tracking-tight text-[#2A2421]">
                Ceremonia &amp; Recepción
              </h2>

              <p className="text-[11px] font-medium text-neutral-500 mt-1">Sábado 28 de Noviembre</p>

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

            {/* ENCABEZADO SUPERIOR ACTUALIZADO */}
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

              <div className="my-2 flex items-center justify-center gap-2">
                <div className="h-[1px] w-12 bg-amber-400/60" />
                <Sparkles className="h-3 w-3 text-amber-600" />
                <div className="h-[1px] w-12 bg-amber-400/60" />
              </div>
            </motion.div>

            {/* IMAGEN DEL OSITO CON EL NOMBRE COMPLETO DENTRO DEL PERGAMINO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -6, 0] 
              }}
              transition={{ 
                opacity: { delay: 0.3 },
                scale: { delay: 0.3, type: "spring", stiffness: 120 },
                y: { repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.4 } 
              }}
              className="relative my-1 flex flex-col items-center justify-center z-10 w-full"
            >
              <div className="relative w-48 h-40 md:w-56 md:h-48 flex items-center justify-center drop-shadow-md">
                <Image 
                  src="/oso.png" 
                  alt="Osito con pergamino" 
                  fill 
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-x-0 top-[45%] flex items-center justify-center px-6 pt-1 pointer-events-none text-center">
                  <span className="font-serif italic font-extrabold text-base md:text-lg tracking-wide bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] leading-tight">
                    Merari Catalina
                  </span>
                </div>
              </div>
            </motion.div>

            {/* BLOQUE DE TEXTOS CON ESPACIADO AMPLIO Y CÓMODO */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="my-5 flex flex-col items-center space-y-4 z-10 px-4 text-center"
            >
              <p className="max-w-xs font-serif text-xs italic leading-relaxed text-neutral-700">
                Será un día lleno de magia y bendiciones. Queremos compartir este gran momento contigo.
              </p>

              <p className="font-serif text-sm italic font-extrabold text-amber-800 tracking-wide py-1">
                ¡Te esperamos con los brazos abiertos!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="my-2 grid w-full grid-cols-3 gap-2 border-y-2 border-amber-300/80 py-3 text-center bg-gradient-to-b from-amber-50/60 to-amber-100/30 rounded-2xl shadow-inner z-10"
            >
              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="flex flex-col items-center justify-start border-r border-amber-300/60 px-1">
                <Calendar className="mb-1 h-4 w-4 text-amber-700" />
                <p className="text-[11px] font-bold text-[#2A2421]">Sábado</p>
                <p className="my-0.5 font-serif text-xl font-black text-amber-700">28</p>
                <p className="text-[9px] font-semibold uppercase text-neutral-500">Nov 2025</p>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="flex flex-col items-center justify-start border-r border-amber-300/60 px-1">
                <Church className="mb-1 h-4 w-4 text-amber-700" />
                <p className="text-[11px] font-bold text-[#2A2421]">Ceremonia</p>
                <p className="text-[10px] font-extrabold text-amber-900 mt-0.5">11:00 a.m.</p>
                <p className="mt-1 text-[10px] font-medium text-neutral-600">Gante 5</p>
                <p className="text-[10px] font-medium text-neutral-600">CDMX</p>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="flex flex-col items-center justify-start px-1">
                <PartyPopper className="mb-1 h-4 w-4 text-amber-700" />
                <p className="text-[11px] font-bold text-[#2A2421]">Recepción</p>
                <p className="text-[10px] font-extrabold text-amber-900 mt-0.5">3:00 p.m.</p>
                <p className="mt-1 text-[10px] font-medium text-neutral-600">Salón Flamingo</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="my-3 w-full text-center z-20"
            >
              <motion.a
                whileHover={{ scale: 1.05, shadow: "0 15px 30px rgba(0,0,0,0.4)" }}
                whileTap={{ scale: 0.95 }}
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#2A2421] via-[#1F1A17] to-[#12100F] px-7 py-3 text-xs font-bold uppercase tracking-widest text-amber-100 shadow-2xl border-2 border-amber-400/40 transition-all"
              >
                <MapPin className="h-4 w-4 text-amber-400 animate-bounce" />
                <span>Ver Ubicación en Maps</span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="my-2 w-full text-center z-10 space-y-2"
            >
              <div className="rounded-2xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-amber-100/70 p-2.5 border-2 border-amber-300/50 shadow-md">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic font-bold text-amber-900">
                  <BearPawIcon className="h-3.5 w-3.5 text-amber-700" /> Mis Papás <BearPawIcon className="h-3.5 w-3.5 text-amber-700" />
                </p>
                <p className="mt-0.5 text-sm font-extrabold text-[#2A2421]">Isai Lino y Lidia Moreno</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-amber-100/70 p-2.5 border-2 border-amber-300/50 shadow-md">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic font-bold text-amber-900">
                  <BearPawIcon className="h-3.5 w-3.5 text-amber-700" /> Mis Padrinos <BearPawIcon className="h-3.5 w-3.5 text-amber-700" />
                </p>
                <p className="mt-0.5 text-sm font-extrabold text-[#2A2421]">Teresa Barcenas y Luis Moreno</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-2 mb-2 flex flex-col items-center text-center z-20"
            >
              <p className="max-w-xs font-serif text-[11px] italic text-neutral-600 leading-relaxed font-medium">
                Tu confirmación nos ayudará a organizar todo con mucho amor.
              </p>

              <Link href="/formulario">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2.5 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 px-8 py-3 text-xs font-black tracking-wider text-amber-100 shadow-2xl shadow-amber-900/40 transition-all border border-amber-400/40 cursor-pointer"
                >
                  <ClipboardList className="h-4 w-4 text-amber-200" />
                  <span>Confirmar Asistencia</span>
                </motion.div>
              </Link>

              <p className="mt-3 font-serif text-base italic font-black text-amber-900">
                ¡Gracias por acompañarnos!
              </p>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
