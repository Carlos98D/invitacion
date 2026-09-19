"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Church, PartyPopper, Heart, Sparkles, MailOpen, Calendar, MessageCircle, Volume2, VolumeX } from "lucide-react"

// Ilustración de Osito SVG Sobria
function BearIllustration({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Orejas */}
      <circle cx="55" cy="55" r="28" fill="#B8860B" opacity="0.8" />
      <circle cx="55" cy="55" r="16" fill="#FDFBF7" />
      <circle cx="145" cy="55" r="28" fill="#B8860B" opacity="0.8" />
      <circle cx="145" cy="55" r="16" fill="#FDFBF7" />

      {/* Cabeza */}
      <circle cx="100" cy="100" r="65" fill="#C59B6C" />

      {/* Ojos */}
      <circle cx="75" cy="90" r="6" fill="#2A2421" />
      <circle cx="125" cy="90" r="6" fill="#2A2421" />
      <circle cx="77" cy="88" r="2" fill="#FFFFFF" />
      <circle cx="127" cy="88" r="2" fill="#FFFFFF" />

      {/* Hocico */}
      <ellipse cx="100" cy="115" rx="24" ry="18" fill="#FDFBF7" />
      <ellipse cx="100" cy="106" rx="8" ry="5" fill="#2A2421" />
      <path
        d="M 100 111 C 100 118, 93 122, 89 118 M 100 111 C 100 118, 107 122, 111 118"
        stroke="#2A2421"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Mejillas sutiles */}
      <circle cx="62" cy="105" r="7" fill="#D9A08B" opacity="0.35" />
      <circle cx="138" cy="105" r="7" fill="#D9A08B" opacity="0.35" />
    </svg>
  )
}

// Icono de Huellita Elegante
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

export default function Invitacion() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Intenta reproducir la música inmediatamente al cargar la página
  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          // El navegador bloquea la reproducción sin previa interacción
        })
      }
    }

    startAudio()
    // Evento de respaldo: activa audio al primer clic en cualquier lugar del sitio
    window.addEventListener("click", startAudio, { once: true })
    return () => window.removeEventListener("click", startAudio)
  }, [isPlaying])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleOpenEnvelope = () => {
    setIsOpen(true)
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {})
    }
  }

  // URL directa de WhatsApp con tu número y mensaje formateado
  const whatsappUrl = `https://api.whatsapp.com/send?phone=5215536975513&text=Confirmo%20mi%20asistencia`

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#181615] p-2 font-sans text-[#2A2421] md:p-6 overflow-hidden">
      {/* Audio oculto */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
        loop
        preload="auto"
      />

      {/* Botón Flotante para Silenciar/Activar Música */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/30 bg-[#2A2421]/80 text-amber-100 shadow-2xl backdrop-blur-md transition-all active:scale-95 hover:bg-amber-900/80 hover:text-white"
        title={isPlaying ? "Silenciar música" : "Activar música"}
      >
        {isPlaying ? <Volume2 className="h-5 w-5 animate-pulse text-amber-400" /> : <VolumeX className="h-5 w-5 text-neutral-400" />}
      </button>

      {/* Fondo con brillo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-[#181615] to-[#110f0e] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* =========================================================
             VISTA 1: SOBRE ELEGANTE
             ========================================================= */
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center px-4"
          >
            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mb-5 flex items-center gap-2 font-serif text-xs uppercase tracking-[0.3em] text-amber-300/90"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Invitación Exclusiva
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            </motion.p>

            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOpenEnvelope}
              className="group relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-amber-200/30 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#E8DDD1] p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-300"
            >
              <div className="absolute top-0 h-1.5 w-28 rounded-b-full bg-amber-600/80 shadow-sm" />

              <div className="absolute top-4 left-4 text-amber-900/10 rotate-[-15deg]">
                <BearPawIcon className="h-7 w-7" />
              </div>
              <div className="absolute top-4 right-4 text-amber-900/10 rotate-[15deg]">
                <BearPawIcon className="h-7 w-7" />
              </div>

              <div className="relative my-5 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-amber-100/80 to-amber-200/50 p-4 shadow-inner ring-1 ring-amber-300/40">
                <BearIllustration />
                <div className="absolute bottom-1 right-1 rounded-full bg-amber-800 p-2 text-amber-100 shadow-md">
                  <Heart className="h-3.5 w-3.5 fill-current" />
                </div>
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-900/70">
                Nuestra Pequeña
              </p>
              <h2 className="my-1.5 font-serif text-xl font-bold tracking-wide text-[#2A2421]">
                Bautizo &amp; Primer Cumpleaños
              </h2>
              <p className="text-xs font-medium text-neutral-500">Sábado 14 de Noviembre</p>

              <div className="mt-7 flex items-center gap-2.5 rounded-full bg-[#2A2421] px-7 py-3 text-xs font-semibold tracking-widest uppercase text-amber-100 shadow-xl transition-all group-hover:bg-amber-900">
                <MailOpen className="h-4 w-4 text-amber-400" />
                Abrir Invitación
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* =========================================================
             VISTA 2: TARJETA / SITIO SOBRIO Y ELEGANTE
             ========================================================= */
          <motion.main
            key="invitation-view"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex min-h-screen w-full max-w-md flex-col items-center overflow-y-auto border border-amber-200/30 bg-[#FDFBF7] px-7 py-8 shadow-2xl md:min-h-[860px] md:max-h-[920px] md:rounded-3xl"
          >
            {/* Cerrar sobre */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end rounded-full bg-amber-100/60 px-3 py-1 text-[10px] font-medium tracking-wider text-amber-900 transition-colors hover:bg-amber-200/80"
            >
              ✕ Cerrar
            </button>

            {/* Encabezado */}
            <p className="mt-2 text-center font-serif text-xs italic tracking-wider text-amber-900/80">
              Con mucho amor te invitamos al
            </p>

            <h1 className="my-2 text-center font-serif text-2xl font-bold leading-snug tracking-wide text-[#2A2421] md:text-3xl">
              Bautizo y <br />
              Primer Cumpleaños
            </h1>

            <p className="mb-2 text-center font-serif text-xs italic text-amber-900/80">
              de nuestra pequeña
            </p>

            {/* Ilustración Osito */}
            <div className="relative my-3 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-b from-amber-50 to-amber-100/60 p-3 shadow-inner ring-1 ring-amber-200/60">
              <BearIllustration />
            </div>

            {/* Mensaje principal */}
            <p className="my-2 max-w-xs text-center font-serif text-xs italic leading-relaxed text-neutral-600">
              Será un día muy especial y queremos compartirlo con las personas más importantes en nuestras vidas.
            </p>

            <p className="mb-4 font-serif text-sm italic font-bold text-amber-800">
              ¡Te esperamos!
            </p>

            {/* TARJETAS DE INFORMACIÓN SOBRIAS (3 Columnas) */}
            <div className="my-3 grid w-full grid-cols-3 gap-2 border-y border-amber-200/60 py-5 text-center">
              {/* Fecha */}
              <div className="flex flex-col items-center justify-start border-r border-amber-200/60 px-1">
                <Calendar className="mb-1.5 h-4 w-4 text-amber-800" />
                <p className="text-[11px] font-bold text-[#2A2421]">Sábado</p>
                <p className="my-0.5 font-serif text-2xl font-bold text-amber-800">14</p>
                <p className="text-[9px] font-medium uppercase text-neutral-500">de noviembre de 2025</p>
              </div>

              {/* Bautizo */}
              <div className="flex flex-col items-center justify-start border-r border-amber-200/60 px-1">
                <Church className="mb-1.5 h-4 w-4 text-amber-800" />
                <p className="text-[11px] font-bold text-[#2A2421]">Bautizo</p>
                <p className="text-[10px] font-semibold text-amber-900">11:00 a.m.</p>
                <p className="mt-1 text-[10px] text-neutral-600">Gante 5</p>
                <p className="text-[10px] text-neutral-600">CDMX</p>
              </div>

              {/* Cumpleaños */}
              <div className="flex flex-col items-center justify-start px-1">
                <PartyPopper className="mb-1.5 h-4 w-4 text-amber-800" />
                <p className="text-[11px] font-bold text-[#2A2421]">Cumpleaños</p>
                <p className="text-[10px] font-semibold text-amber-900">3:00 p.m.</p>
                <p className="mt-1 text-[10px] text-neutral-600">Salón de fiestas Flamingo</p>
              </div>
            </div>

            {/* BOTÓN UBICACIÓN SOBRIO */}
            <div className="my-3 w-full text-center">
              <a
                href="https://maps.google.com/?q=Gante+5+CDMX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#2A2421] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-amber-100 shadow-md transition-all active:scale-95 hover:bg-amber-900"
              >
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                Ubicación
              </a>
            </div>

            {/* SECCIÓN PAPÁS Y PADRINOS */}
            <div className="mt-2 w-full text-center">
              <div className="my-2 rounded-xl bg-amber-50/50 p-3 border border-amber-200/40">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic text-amber-900">
                  <BearPawIcon className="h-3 w-3 text-amber-700" /> Nuestros papás <BearPawIcon className="h-3 w-3 text-amber-700" />
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#2A2421]">Lidia e Isai</p>
              </div>

              <div className="my-2 rounded-xl bg-amber-50/50 p-3 border border-amber-200/40">
                <p className="flex items-center justify-center gap-1.5 font-serif text-xs italic text-amber-900">
                  <BearPawIcon className="h-3 w-3 text-amber-700" /> Padrinos <BearPawIcon className="h-3 w-3 text-amber-700" />
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#2A2421]">Teresa y Luis</p>
              </div>
            </div>

            {/* CONFIRMACIÓN Y BOTÓN WHATSAPP CORREGIDO */}
            <div className="mt-4 flex flex-col items-center text-center">
              <p className="max-w-xs font-serif text-[11px] italic text-neutral-500 leading-relaxed">
                Tu confirmación te agradecería nos ayudará a organizar todo con amor.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-flex items-center gap-2.5 rounded-full bg-emerald-700 px-7 py-3 text-xs font-bold tracking-wide text-white shadow-lg shadow-emerald-900/20 transition-all active:scale-95 hover:bg-emerald-800"
              >
                <MessageCircle className="h-4 w-4" />
                Confirmar por WhatsApp
              </a>

              <p className="mt-4 font-serif text-base italic font-bold text-amber-900">
                ¡Gracias!
              </p>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
