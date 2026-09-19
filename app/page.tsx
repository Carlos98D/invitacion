"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Church, PartyPopper, Heart, Sparkles, MailOpen } from "lucide-react"
import { MusicPlayer } from "@/components/music-player"

export default function Invitacion() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#1c1917] p-2 font-sans text-neutral-800 md:p-6 overflow-hidden">
      {/* Música de fondo */}
      <MusicPlayer src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3" />

      {/* EFECTO DE LUZ DE FONDO */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-neutral-950 to-neutral-950 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* =========================================================
             VISTA 1: SOBRE CON TEMÁTICA DE OSITO (CERRADO)
             ========================================================= */
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center px-4"
          >
            {/* Indicador superior */}
            <motion.p
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-4 flex items-center gap-2 font-serif text-sm italic tracking-widest text-amber-200/90"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              Tienes una invitación especial
              <Sparkles className="h-4 w-4 text-amber-400" />
            </motion.p>

            {/* Tarjeta / Sobre interactivo */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(true)}
              className="group relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-amber-300/40 bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#EADBC8] p-8 text-center shadow-[0_20px_50px_rgba(217,119,6,0.2)] transition-all duration-300 hover:border-amber-400 hover:shadow-[0_25px_60px_rgba(217,119,6,0.3)]"
            >
              {/* Sello superior */}
              <div className="absolute top-0 h-2 w-32 rounded-b-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 shadow-md" />

              {/* Ilustración SVG de Osito */}
              <div className="relative my-4 flex h-36 w-36 items-center justify-center rounded-full bg-amber-100/80 p-4 shadow-inner ring-4 ring-amber-200/50">
                <svg
                  viewBox="0 0 200 200"
                  className="h-full w-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Orejas de oso */}
                  <circle cx="55" cy="55" r="28" fill="#B47B48" />
                  <circle cx="55" cy="55" r="16" fill="#E8C39E" />
                  <circle cx="145" cy="55" r="28" fill="#B47B48" />
                  <circle cx="145" cy="55" r="16" fill="#E8C39E" />

                  {/* Cabeza */}
                  <circle cx="100" cy="100" r="65" fill="#C68A54" />

                  {/* Ojos */}
                  <circle cx="75" cy="90" r="7" fill="#2C1810" />
                  <circle cx="125" cy="90" r="7" fill="#2C1810" />
                  <circle cx="77" cy="88" r="2.5" fill="#FFFFFF" />
                  <circle cx="127" cy="88" r="2.5" fill="#FFFFFF" />

                  {/* Hocico */}
                  <ellipse cx="100" cy="115" rx="26" ry="20" fill="#F4E3D3" />
                  <ellipse cx="100" cy="106" rx="9" ry="6" fill="#2C1810" />
                  <path
                    d="M 100 112 C 100 120, 92 124, 88 120 M 100 112 C 100 120, 108 124, 112 120"
                    stroke="#2C1810"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Mejillas */}
                  <circle cx="62" cy="105" r="8" fill="#F4A261" opacity="0.4" />
                  <circle cx="138" cy="105" r="8" fill="#F4A261" opacity="0.4" />

                  {/* Corbatín */}
                  <path d="M 82 152 L 100 160 L 82 168 Z" fill="#D97706" />
                  <path d="M 118 152 L 100 160 L 118 168 Z" fill="#D97706" />
                  <circle cx="100" cy="160" r="5" fill="#B45309" />
                </svg>

                {/* Corazón pequeño */}
                <div className="absolute bottom-1 right-1 rounded-full bg-amber-500 p-1.5 text-white shadow-md">
                  <Heart className="h-4 w-4 fill-current" />
                </div>
              </div>

              {/* Textos del sobre */}
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800/80">
                Nuestra Pequeña
              </p>
              <h2 className="my-1 font-serif text-xl font-bold uppercase tracking-wide text-neutral-800">
                Bautizo &amp; 1er Año
              </h2>
              <p className="text-xs font-medium text-neutral-500">Sábado 14 de Noviembre</p>

              {/* Botón de acción */}
              <div className="mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-amber-500/30 group-hover:from-amber-600 group-hover:to-amber-700">
                <MailOpen className="h-4 w-4" />
                Abrir Invitación
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* =========================================================
             VISTA 2: INVITACIÓN ABIERTA Y DETALLADA
             ========================================================= */
          <motion.main
            key="invitation-view"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex min-h-screen w-full max-w-md flex-col items-center overflow-y-auto border border-amber-200/50 bg-[#FAF8F5] px-6 py-8 shadow-2xl md:min-h-[850px] md:max-h-[900px] md:rounded-3xl"
          >
            {/* Botón para volver a cerrar el sobre */}
            <button
              onClick={() => setIsOpen(false)}
              className="self-end rounded-full bg-amber-100/80 px-3 py-1 text-[10px] font-semibold text-amber-800 transition-colors hover:bg-amber-200"
            >
              ✕ Cerrar sobre
            </button>

            {/* Ilustración Osito en la invitación */}
            <div className="my-2 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100/70 p-2 shadow-inner ring-2 ring-amber-200/60">
              <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
                <circle cx="55" cy="55" r="28" fill="#B47B48" />
                <circle cx="55" cy="55" r="16" fill="#E8C39E" />
                <circle cx="145" cy="55" r="28" fill="#B47B48" />
                <circle cx="145" cy="55" r="16" fill="#E8C39E" />
                <circle cx="100" cy="100" r="65" fill="#C68A54" />
                <circle cx="75" cy="90" r="7" fill="#2C1810" />
                <circle cx="125" cy="90" r="7" fill="#2C1810" />
                <ellipse cx="100" cy="115" rx="26" ry="20" fill="#F4E3D3" />
                <ellipse cx="100" cy="106" rx="9" ry="6" fill="#2C1810" />
              </svg>
            </div>

            <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-amber-700/80">
              Nuestra Pequeña
            </p>

            <h1 className="my-2 text-center font-serif text-2xl font-bold uppercase leading-snug tracking-wide text-neutral-800 md:text-3xl">
              BAUTIZO <span className="font-sans text-amber-500">&amp;</span> <br />
              PRIMER CUMPLEAÑOS
            </h1>

            <div className="my-3 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-300" />
              <Heart className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="h-px w-8 bg-amber-300" />
            </div>

            <p className="my-4 max-w-xs text-center font-serif text-sm italic leading-relaxed text-neutral-600">
              &quot;Hay momentos en la vida que son verdaderamente especiales, y compartirlos con quienes más amamos los
              hace inolvidables.&quot;
            </p>

            <div className="my-4 w-full rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 text-center shadow-sm backdrop-blur-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">SÁBADO</p>
              <p className="my-1 font-serif text-5xl font-bold text-amber-600">14</p>
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">DE NOVIEMBRE DE 2025</p>
            </div>

            <div className="my-3 grid w-full grid-cols-2 gap-3">
              <div className="flex flex-col items-center rounded-2xl border border-neutral-200/80 bg-white p-4 text-center shadow-sm">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                  <Church className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">MISA BAUTIZO</p>
                <p className="mt-1 text-sm font-bold text-neutral-800">11:00 A.M.</p>
              </div>

              <div className="flex flex-col items-center rounded-2xl border border-neutral-200/80 bg-white p-4 text-center shadow-sm">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                  <PartyPopper className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">CUMPLEAÑOS</p>
                <p className="mt-1 text-sm font-bold text-neutral-800">3:00 P.M.</p>
              </div>
            </div>

            <div className="my-4 w-full rounded-2xl border border-amber-500/20 bg-neutral-900 p-6 text-center text-white shadow-lg">
              <div className="mb-3 inline-flex rounded-full bg-amber-500/10 p-3 text-amber-400">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-amber-400">LUGAR DEL EVENTO</h3>
              <p className="mb-1 text-base font-bold text-white">Salón de Fiestas Flamingo</p>
              <p className="mb-5 text-xs text-neutral-400">Gante 5, CDMX</p>

              <a
                href="https://maps.google.com/?q=Gante+5+CDMX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md active:scale-95"
              >
                <MapPin className="h-4 w-4" />
                Ver ubicación en Google Maps
              </a>
            </div>

            <div className="mt-2 w-full border-t border-amber-200/60 pt-6 text-center">
              <div className="mb-4">
                <p className="font-serif text-xs italic text-neutral-500">Mis Papás</p>
                <p className="text-sm font-bold tracking-wide text-neutral-800">Lidia e Isai</p>
              </div>
              <div>
                <p className="font-serif text-xs italic text-neutral-500">Padrinos</p>
                <p className="text-sm font-bold tracking-wide text-neutral-800">Teresa y Luis</p>
              </div>
            </div>

            <p className="mb-4 mt-8 font-serif text-xl italic text-amber-600">¡Te esperamos!</p>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
