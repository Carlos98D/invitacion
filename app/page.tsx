"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Church, PartyPopper, Heart, Sparkles, MailOpen, Calendar, MessageCircle, Volume2, VolumeX } from "lucide-react"

// Ilustración de Osito SVG Elegante con Adornos
function BearIllustration({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="55" cy="55" r="28" fill="#B8860B" opacity="0.85" />
      <circle cx="55" cy="55" r="16" fill="#FDFBF7" />
      <circle cx="145" cy="55" r="28" fill="#B8860B" opacity="0.85" />
      <circle cx="145" cy="55" r="16" fill="#FDFBF7" />

      <circle cx="100" cy="100" r="65" fill="#C59B6C" />

      <circle cx="75" cy="90" r="6" fill="#2A2421" />
      <circle cx="125" cy="90" r="6" fill="#2A2421" />
      <circle cx="77" cy="88" r="2" fill="#FFFFFF" />
      <circle cx="127" cy="88" r="2" fill="#FFFFFF" />

      <ellipse cx="100" cy="115" rx="24" ry="18" fill="#FDFBF7" />
      <ellipse cx="100" cy="106" rx="8" ry="5" fill="#2A2421" />
      <path
        d="M 100 111 C 100 118, 93 122, 89 118 M 100 111 C 100 118, 107 122, 111 118"
        stroke="#2A2421"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <circle cx="62" cy="105" r="7" fill="#D9A08B" opacity="0.4" />
      <circle cx="138" cy="105" r="7" fill="#D9A08B" opacity="0.4" />
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

// Adorno Elegante para Esquinas (Filigrana / Arabesco)
function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`h-12 w-12 text-amber-600/40 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M0,0 L40,0 C20,10 10,20 0,40 Z" fill="currentColor" opacity="0.15" />
      <path d="M0,20 C30,20 40,30 40,60" />
      <path d="M20,0 C20,30 30,40 60,40" />
      <circle cx="25" cy="25" r="4" fill="currentColor" />
    </svg>
  )
}

// Partículas flotantes de fondo
function FloatingParticles() {
  const particles = Array.from({ length: 18 })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-300/25"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  )
}

export default function Invitacion() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // 1. Iniciar música tras primer toque/clic
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

  // 2. PAUSAR MÚSICA SI SALE O CAMBIA DE PESTAÑA / NAVEGADOR
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

  // Toggle manual de audio
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

  const whatsappUrl = `https://api.whatsapp.com/send?phone=5215536975513&text=Confirmo%20mi%20asistencia`
  
  // URL exacta de tu ubicación en Google Maps
  const locationUrl = `https://www.google.com/maps/dir//Salon+flamingo+Tultitlan,+Av.+Toluca+Esq,+La+Sarda%C3%B1a,+54090+Buenavista,+M%C3%A9x./@19.6083712,-99.1592448,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d1f77daf733af9:0xa27412d4f0116198!2m2!1d-99.1774046!2d19.5935291`

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#141211] p-3 font-sans text-[#2A2421] md:p-6 overflow-hidden selection:bg-amber-200">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
        loop
        preload="auto"
      />

      <FloatingParticles />

      {/* BOTÓN FLOTANTE DE BOMBILLA / AUDIO EN LA ESQUINA INFERIOR DERECHA */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-amber-200/80 bg-[#2A2421]/90 px-3 py-1.5 rounded-full border border-amber-300/20 backdrop-blur-md md:inline-block">
          {isPlaying ? "Música activa" : "Música en pausa"}
        </span>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="flex h-13 w-13 items-center justify-center rounded-full border-2 border-amber-400/40 bg-gradient-to-br from-[#2A2421] to-[#12100F] text-amber-100 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all hover:border-amber-400"
          title={isPlaying ? "Silenciar música" : "Activar música"}
        >
          {isPlaying ? (
            <Volume2 className="h-6 w-6 text-amber-400 animate-pulse" />
          ) : (
            <VolumeX className="h-6 w-6 text-neutral-400" />
          )}
        </motion.button>
      </motion.div>

      {/* Resplandor de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-[#141211] to-[#0A0908] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* =========================================================
             VISTA 1: SOBRE ELEGANTE DE LUJO
             ========================================================= */
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -40 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mb-5 flex items-center gap-2 font-serif text-xs tracking-[0.35em] uppercase text-amber-300"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Invitación Especial</span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </motion.div>

            <motion.button
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenEnvelope}
              className="group relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-[2.5rem] border-2 border-amber-300/40 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#E5D7C8] p-8 text-center shadow-[0_30px_70px_rgba(0,0,0,0.8)] transition-all duration-500"
            >
              {/* Adornos en esquinas superiores */}
              <CornerOrnament className="absolute top-2 left-2" />
              <CornerOrnament className="absolute top-2 right-2 rotate-90" />

              <div className="absolute top-0 h-2 w-36 rounded-b-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shadow-md" />

              <div className="absolute top-6 left-6 text-amber-900/10 rotate-[-15deg]">
                <BearPawIcon className="h-8 w-8" />
              </div>
              <div className="absolute top-6 right-6 text-amber-900/10 rotate-[15deg]">
                <BearPawIcon className="h-8 w-8" />
              </div>

              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative my-6 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-amber-100/90 to-amber-200/70 p-4 shadow-md ring-2 ring-amber-300/60"
              >
                <BearIllustration />
                <div className="absolute bottom-1 right-1 rounded-full bg-amber-800 p-2 text-amber-100 shadow-lg">
                  <Heart className="h-4 w-4 fill-current" />
                </div>
              </motion.div>

              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-900/70">
                Nuestra Pequeña
              </p>
              <h2 className="my-2 font-serif text-2xl font-bold tracking-wide text-[#2A2421]">
                Bautizo &amp; Primer Cumpleaños
              </h2>
              <p className="text-xs font-medium text-neutral-500">Sábado 14 de Noviembre</p>

              <div className="mt-8 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#2A2421] to-[#1A1614] px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-amber-100 shadow-2xl transition-all duration-300 group-hover:from-amber-900 group-hover:to-amber-950">
                <MailOpen className="h-4 w-4 text-amber-400" />
                <span>Abrir Invitación</span>
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* =========================================================
             VISTA 2: TARJETA / SITIO CON ADORNOS Y ACABADOS PRO
             ========================================================= */
          <motion.main
            key="invitation-view"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex min-h-screen w-full max-w-md flex-col items-center overflow-y-auto border-2 border-amber-300/40 bg-[#FDFBF7] px-6 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.85)] md:min-h-[880px] md:max-h-[920px] md:rounded-[2.5rem]"
          >
            {/* Adornos Dorados en Esquinas */}
            <CornerOrnament className="absolute top-2 left-2" />
            <CornerOrnament className="absolute top-2 right-2 rotate-90" />
            <CornerOrnament className="absolute bottom-2 left-2 -rotate-90" />
            <CornerOrnament className="absolute bottom-2 right-2 rotate-180" />

            {/* Marco de Línea Doble */}
            <div className="absolute inset-3 border border-amber-300/30 rounded-[2rem] pointer-events-none" />

            {/* Botón Cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end z-20 rounded-full bg-amber-100/70 px-3.5 py-1 text-[10px] font-semibold tracking-wider text-amber-900 transition-all hover:bg-amber-200"
            >
              ✕ Cerrar
            </button>

            {/* Encabezado */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-1"
            >
              <p className="font-serif text-xs italic tracking-wider text-amber-900/80">
                Con mucho amor te invitamos al
              </p>

              <h1 className="my-2 font-serif text-2xl font-bold leading-snug tracking-wide text-[#2A2421] md:text-3xl">
                Bautizo y <br />
                Primer Cumpleaños
              </h1>

              <p className="font-serif text-xs italic text-amber-900/80">
                de nuestra pequeña
              </p>
            </motion.div>

            {/* Osito Central con Aureola Animada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="relative my-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-b from-amber-50 to-amber-100/80 p-3 shadow-inner ring-2 ring-amber-300/50"
            >
              <BearIllustration />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/40 pointer-events-none"
              />
            </motion.div>

            {/* Mensaje principal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="my-2 max-w-xs text-center font-serif text-xs italic leading-relaxed text-neutral-600"
            >
              Será un día muy especial y queremos compartirlo con las personas más importantes en nuestras vidas.
            </motion.p>

            <p className="mb-4 font-serif text-sm italic font-bold text-amber-800">
              ¡Te esperamos!
            </p>

            {/* BLOQUE DE FECHA Y HORARIOS CON MARCOS DE ADORNO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="my-3 grid w-full grid-cols-3 gap-2 border-y-2 border-amber-200/80 py-5 text-center bg-amber-50/30 rounded-xl"
            >
              <motion.div whileHover={{ y: -3 }} className="flex flex-col items-center justify-start border-r border-amber-200/60 px-1">
                <Calendar className="mb-1.5 h-4 w-4 text-amber-800" />
                <p className="text-[11px] font-bold text-[#2A2421]">Sábado</p>
                <p className="my-0.5 font-serif text-2xl font-bold text-amber-800">14</p>
                <p className="text-[9px] font-medium uppercase text-neutral-500">de noviembre de 2025</p>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} className="flex flex-col items-center justify-start border-r border-amber-200/60 px-1">
                <Church className="mb-1.5 h-4 w-4 text-amber-800" />
                <p className="text-[11px] font-bold text-[#2A2421]">Bautizo</p>
                <p className="text-[10px] font-semibold text-amber-900">11:00 a.m.</p>
                <p className="mt-1 text-[10px] text-neutral-600">Gante 5</p>
                <p className="text-[10px] text-neutral-600">CDMX</p>
              </motion.div>

              <motion.div whileHover={{ y: -3 }} className="flex flex-col items-center justify-start px-1">
                <PartyPopper className="mb-1.5 h-4 w-4 text-amber-800" />
                <p className="text-[11px] font-bold text-[#2A2421]">Cumpleaños</p>
                <p className="text-[10px] font-semibold text-amber-900">3:00 p.m.</p>
                <p className="mt-1 text-[10px] text-neutral-600">Salón Flamingo</p>
              </motion.div>
            </motion.div>

            {/* BOTÓN UBICACIÓN REAL DE GOOGLE MAPS RESTAURADO */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="my-3 w-full text-center z-20"
            >
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2A2421] to-[#1A1614] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-amber-100 shadow-xl border border-amber-400/30 transition-all"
              >
                <MapPin className="h-4 w-4 text-amber-400 animate-bounce" />
                <span>Ver Ubicación en Maps</span>
              </motion.a>
            </motion.div>

            {/* TARJETAS DE PAPÁS Y PADRINOS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-2 w-full text-center"
            >
              <div className="my-2 rounded-2xl bg-gradient-to-r from-amber-100/50 via-amber-50/80 to-amber-100/50 p-3 border border-amber-300/40 shadow-sm">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic text-amber-900">
                  <BearPawIcon className="h-3 w-3 text-amber-700" /> Nuestros papás <BearPawIcon className="h-3 w-3 text-amber-700" />
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#2A2421]">Lidia e Isai</p>
              </div>

              <div className="my-2 rounded-2xl bg-gradient-to-r from-amber-100/50 via-amber-50/80 to-amber-100/50 p-3 border border-amber-300/40 shadow-sm">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic text-amber-900">
                  <BearPawIcon className="h-3 w-3 text-amber-700" /> Padrinos <BearPawIcon className="h-3 w-3 text-amber-700" />
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#2A2421]">Teresa y Luis</p>
              </div>
            </motion.div>

            {/* CONFIRMACIÓN WHATSAPP */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-4 flex flex-col items-center text-center z-20"
            >
              <p className="max-w-xs font-serif text-[11px] italic text-neutral-500 leading-relaxed">
                Tu confirmación te agradecería nos ayudará a organizar todo con amor.
              </p>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-3 text-xs font-bold tracking-wide text-white shadow-xl shadow-emerald-900/20 transition-all hover:from-emerald-700 hover:to-emerald-800"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Confirmar por WhatsApp</span>
              </motion.a>

              <p className="mt-4 font-serif text-base italic font-bold text-amber-900">
                ¡Gracias!
              </p>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
