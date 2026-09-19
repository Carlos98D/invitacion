"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Church, PartyPopper, Heart, Sparkles, MailOpen, Calendar, MessageCircle } from "lucide-react"

// Componente de Osito SVG Reutilizable
function BearIllustration({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Orejas */}
      <circle cx="55" cy="55" r="28" fill="#C68A54" />
      <circle cx="55" cy="55" r="16" fill="#F4E3D3" />
      <circle cx="145" cy="55" r="28" fill="#C68A54" />
      <circle cx="145" cy="55" r="16" fill="#F4E3D3" />

      {/* Cabeza */}
      <circle cx="100" cy="100" r="65" fill="#D99B62" />

      {/* Ojos */}
      <circle cx="75" cy="90" r="6.5" fill="#2C1810" />
      <circle cx="125" cy="90" r="6.5" fill="#2C1810" />
      <circle cx="77" cy="88" r="2.5" fill="#FFFFFF" />
      <circle cx="127" cy="88" r="2.5" fill="#FFFFFF" />

      {/* Hocico */}
      <ellipse cx="100" cy="115" rx="26" ry="20" fill="#F9EFE6" />
      <ellipse cx="100" cy="106" rx="9" ry="6" fill="#2C1810" />
      <path
        d="M 100 112 C 100 120, 92 124, 88 120 M 100 112 C 100 120, 108 124, 112 120"
        stroke="#2C1810"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Mejillas */}
      <circle cx="62" cy="105" r="8" fill="#E89B88" opacity="0.45" />
      <circle cx="138" cy="105" r="8" fill="#E89B88" opacity="0.45" />
    </svg>
  )
}

// Icono de Huellita de Oso
function BearPawIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <ellipse cx="50" cy="65" rx="22" ry="18" />
      <circle cx="28" cy="38" r="7" />
      <circle cx="42" cy="30" r="7" />
      <circle cx="58" cy="30" r="7" />
      <circle cx="72" cy="38" r="7" />
    </svg>
  )
}

export default function Invitacion() {
  const [isOpen, setIsOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleOpenEnvelope = () => {
    setIsOpen(true)
    // Inicia la música automáticamente al hacer clic en el sobre
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Maneja restricciones de reproducción automática del navegador si aplica
      })
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#1c1917] p-2 font-sans text-neutral-800 md:p-6 overflow-hidden">
      {/* Reproductor de Audio Oculto */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
        loop
        preload="auto"
      />

      {/* Efecto de Luz de Fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-neutral-950 to-neutral-950 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* =========================================================
             VISTA 1: SOBRE CERRADO
             ========================================================= */
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center px-4"
          >
            <motion.p
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-4 flex items-center gap-2 font-serif text-sm italic tracking-widest text-amber-200/90"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              Tienes una invitación especial
              <Sparkles className="h-4 w-4 text-amber-400" />
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenEnvelope}
              className="group relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#EADBC8] p-8 text-center shadow-[0_20px_50px_rgba(217,119,6,0.2)] transition-all duration-300 hover:border-amber-400"
            >
              <div className="absolute top-0 h-2 w-32 rounded-b-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 shadow-md" />

              {/* Decoración de huellitas sutiles en las esquinas */}
              <div className="absolute top-4 left-4 text-amber-900/10 rotate-[-20deg]">
                <BearPawIcon className="h-6 w-6" />
              </div>
              <div className="absolute top-4 right-4 text-amber-900/10 rotate-[20deg]">
                <BearPawIcon className="h-6 w-6" />
              </div>

              {/* Osito Central */}
              <div className="relative my-4 flex h-36 w-36 items-center justify-center rounded-full bg-amber-100/80 p-4 shadow-inner ring-4 ring-amber-200/50">
                <BearIllustration />
                <div className="absolute bottom-1 right-1 rounded-full bg-amber-500 p-1.5 text-white shadow-md">
                  <Heart className="h-4 w-4 fill-current" />
                </div>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800/80">
                Nuestra Pequeña
              </p>
              <h2 className="my-1 font-serif text-xl font-bold uppercase tracking-wide text-neutral-800">
                Bautizo &amp; Primer Cumpleaños
              </h2>
              <p className="text-xs font-medium text-neutral-500">Sábado 14 de Noviembre</p>

              <div className="mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-amber-500/30 group-hover:from-amber-600 group-hover:to-amber-700">
                <MailOpen className="h-4 w-4" />
                Abrir Invitación
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* =========================================================
             VISTA 2: INVITACIÓN ABIERTA CON TEXTOS DE LA IMAGEN
             ========================================================= */
          <motion.main
            key="invitation-view"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex min-h-screen w-full max-w-md flex-col items-center overflow-y-auto border border-amber-200/50 bg-[#FAF8F5] px-6 py-8 shadow-2xl md:min-h-[850px] md:max-h-[900px] md:rounded-3xl"
          >
            {/* Botón opcional para cerrar sobre */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end rounded-full bg-amber-100/80 px-3 py-1 text-[10px] font-semibold text-amber-800 transition-colors hover:bg-amber-200"
            >
              ✕ Cerrar sobre
            </button>

            {/* Cabecera exactamente como en la imagen */}
            <p className="mt-2 text-center font-serif text-sm italic text-amber-900/80">
              Con mucho amor te invitamos al
            </p>

            <h1 className="my-2 text-center font-serif text-2xl font-bold leading-snug tracking-wide text-amber-950 md:text-3xl">
              Bautizo y <br />
              Primer Cumpleaños
            </h1>

            <p className="mb-3 text-center font-serif text-xs italic text-amber-900/80">
              de nuestra pequeña
            </p>

            {/* Ilustración de Osito Principal */}
            <div className="relative my-2 flex h-32 w-32 items-center justify-center rounded-full bg-amber-100/60 p-3 shadow-inner ring-2 ring-amber-200/50">
              <BearIllustration />
            </div>

            {/* Texto de dedicatoria de la imagen */}
            <p className="my-3 max-w-xs text-center font-serif text-xs italic leading-relaxed text-neutral-600">
              Será un día muy especial y queremos compartirlo con las personas más importantes en nuestras vidas.
            </p>

            <p className="mb-4 font-serif text-base italic font-bold text-amber-700">
              ¡Te esperamos!
            </p>

            {/* SECCIÓN DETALLES (3 Columnas con pequeños iconos/ositos) */}
            <div className="my-3 grid w-full grid-cols-3 gap-2 border-y border-amber-200/60 py-4 text-center">
              {/* Fecha */}
              <div className="flex flex-col items-center justify-start border-r border-amber-200/60 px-1">
                <Calendar className="mb-1 h-5 w-5 text-amber-600" />
                <p className="text-[11px] font-bold text-neutral-800">Sábado</p>
                <p className="my-0.5 font-serif text-2xl font-bold text-amber-600">14</p>
                <p className="text-[9px] font-medium uppercase text-neutral-500">de noviembre de 2025</p>
              </div>

              {/* Bautizo y Ubicación en 1 columna */}
              <div className="flex flex-col items-center justify-start border-r border-amber-200/60 px-1">
                <Church className="mb-1 h-5 w-5 text-amber-600" />
                <p className="text-[11px] font-bold text-neutral-800">Bautizo</p>
                <p className="text-[10px] font-semibold text-amber-700">11:00 a.m.</p>
                <p className="mt-1 text-[10px] text-neutral-600">Gante 5</p>
                <p className="text-[10px] text-neutral-600">CDMX</p>
              </div>

              {/* Cumpleaños */}
              <div className="flex flex-col items-center justify-start px-1">
                <PartyPopper className="mb-1 h-5 w-5 text-amber-600" />
                <p className="text-[11px] font-bold text-neutral-800">Cumpleaños</p>
                <p className="text-[10px] font-semibold text-amber-700">3:00 p.m.</p>
                <p className="mt-1 text-[10px] text-neutral-600">Salón de fiestas Flamingo</p>
              </div>
            </div>

            {/* BOTÓN UBICACIÓN CORTO */}
            <div className="my-3 w-full text-center">
              <a
                href="https://www.google.com/maps/place/Salon+flamingo+Tultitlan/@19.5935478,-99.1773921,17z/data=!3m1!4b1!4m6!3m5!1s0x85d1f77daf733af9:0xa27412d4f0116198!8m2!3d19.5935478!4d-99.1773921!16s%2Fg%2F11sd0vvt6p?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md active:scale-95 hover:bg-amber-700"
              >
                <MapPin className="h-3.5 w-3.5" />
                Ubicación
              </a>
            </div>

            {/* PAPÁS Y PADRINOS */}
            <div className="mt-2 w-full text-center">
              <div className="my-2 rounded-2xl bg-amber-50/70 p-2.5 border border-amber-200/40">
                <p className="flex items-center justify-center gap-1 font-serif text-xs italic text-amber-800">
                  <BearPawIcon className="h-3 w-3 text-amber-600" /> Nuestros papás <BearPawIcon className="h-3 w-3 text-amber-600" />
                </p>
                <p className="text-sm font-bold text-neutral-800">Lidia e Isai</p>
              </div>

              <div className="my-2 rounded-2xl bg-amber-50/70 p-2.5 border border-amber-200/40">
                <p className="flex items-center justify-center gap-1 font-serif text-xs italic text-amber-800">
                  <BearPawIcon className="h-3 w-3 text-amber-600" /> Padrinos <BearPawIcon className="h-3 w-3 text-amber-600" />
                </p>
                <p className="text-sm font-bold text-neutral-800">Teresa y Luis</p>
              </div>
            </div>

            {/* CONFIRMACIÓN Y BOTÓN DE WHATSAPP DE LA IMAGEN */}
            <div className="mt-4 flex flex-col items-center text-center">
              <p className="max-w-xs font-serif text-[11px] italic text-neutral-500">
                Tu confirmación te agradecería nos ayudará a organizar todo con amor.
              </p>

              <a
                href="https://wa.me/?text=Hola!%20Confirmo%20mi%20asistencia%20al%20Bautizo%20y%20Cumplea%C3%B1os."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Confirmar por WhatsApp
              </a>

              <p className="mt-3 font-serif text-base italic font-bold text-amber-800">
                ¡Gracias!
              </p>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
