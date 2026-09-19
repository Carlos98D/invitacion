import Link from "next/link"
import { MapPin, Church, PartyPopper, Heart, Sparkles, MailOpen, Calendar, ClipboardList, Star } from "lucide-react"

// Ilustración de Osito SVG Premium
function BearIllustration({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bearGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
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

// Osito Asomándose por la Tarjeta (Efecto 3D superior)
function PeekingBearTop() {
  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
      <div className="relative h-20 w-24 overflow-visible flex justify-center">
        {/* Cabeza saliendo */}
        <div className="absolute top-2 h-16 w-16 rounded-full bg-[#C59B6C] border-2 border-amber-500 shadow-lg flex items-center justify-center">
          {/* Orejas */}
          <div className="absolute -top-2 left-1 h-5 w-5 rounded-full bg-[#B8860B] border border-amber-600" />
          <div className="absolute -top-2 right-1 h-5 w-5 rounded-full bg-[#B8860B] border border-amber-600" />
          {/* Ojitos y hocico simple */}
          <div className="absolute top-6 left-4 h-1.5 w-1.5 rounded-full bg-[#2A2421]" />
          <div className="absolute top-6 right-4 h-1.5 w-1.5 rounded-full bg-[#2A2421]" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 h-3 w-4 rounded-full bg-[#FDFBF7]" />
        </div>
        {/* Patitas apoyadas en el borde */}
        <div className="absolute bottom-0 left-2 h-6 w-7 rounded-t-full bg-[#C59B6C] border border-amber-600" />
        <div className="absolute bottom-0 right-2 h-6 w-7 rounded-t-full bg-[#C59B6C] border border-amber-600" />
      </div>
    </div>
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

export default function Invitacion() {
  const locationUrl = `https://www.google.com/maps/dir//Salon+flamingo+Tultitlan,+Av.+Toluca+Esq,+La+Sarda%C3%B1a,+54090+Buenavista,+M%C3%A9x./@19.6083712,-99.1592448,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x85d1f77daf733af9:0xa27412d4f0116198!2m2!1d-99.1774046!2d19.5935291`

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#0F0D0C] p-3 font-sans text-[#2A2421] md:p-6 overflow-hidden selection:bg-amber-300">
      
      {/* Resplandor ambiental de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-[#0F0D0C] to-[#050404] pointer-events-none" />

      {/* TARJETA PRINCIPAL DIRECTA (Sin necesidad de use client para abrir/cerrar) */}
      <main className="relative z-10 flex min-h-[890px] w-full max-w-md flex-col items-center overflow-y-visible border-2 border-amber-400/50 bg-[#FDFBF7] px-6 py-8 shadow-[0_30px_100px_rgba(217,119,6,0.3)] md:rounded-[2.8rem] my-10">
        
        {/* Osito asomándose por la parte superior de la tarjeta */}
        <PeekingBearTop />

        {/* Filigranas en las 4 esquinas */}
        <CornerOrnament className="absolute top-2 left-2" />
        <CornerOrnament className="absolute top-2 right-2 rotate-90" />
        <CornerOrnament className="absolute bottom-2 left-2 -rotate-90" />
        <CornerOrnament className="absolute bottom-2 right-2 rotate-180" />

        {/* Marco dorado interior */}
        <div className="absolute inset-3 border border-amber-400/40 rounded-[2.3rem] pointer-events-none" />
        <div className="absolute inset-4 border border-dashed border-amber-300/30 rounded-[2rem] pointer-events-none" />

        {/* Encabezado Principal */}
        <div className="text-center mt-6 z-10 w-full">
          <p className="font-serif text-xs italic tracking-widest text-amber-900/80">
            Con mucho amor te invitamos a la
          </p>

          <h1 className="my-2 font-serif text-2xl font-bold uppercase tracking-wider bg-gradient-to-b from-[#2A2421] via-[#3D322C] to-[#1A1614] bg-clip-text text-transparent drop-shadow-sm">
            Ceremonia y <br />
            Recepción
          </h1>

          <p className="font-serif text-xs italic text-amber-900/80">
            de nuestra pequeña
          </p>

          {/* SECCIÓN TIPOGRÁFICA DE "MERARI CATALINA" */}
          <div className="relative my-4 py-2 px-2 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-500/60" />
              <Sparkles className="h-3 w-3 text-amber-600/70" />
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-500/60" />
            </div>

            <h2 className="font-serif italic text-4xl md:text-5xl font-extrabold tracking-wide leading-tight bg-gradient-to-r from-amber-900 via-amber-600 to-amber-950 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(217,119,6,0.15)]">
              Merari Catalina
            </h2>

            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/60" />
              <div className="h-1.5 w-1.5 rotate-45 bg-amber-500/80" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/60" />
            </div>
          </div>
        </div>

        {/* Ilustración Osito Central */}
        <div className="relative my-2 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-b from-amber-100 to-amber-200/90 p-4 shadow-xl ring-4 ring-amber-300/60 z-10">
          <BearIllustration />
        </div>

        {/* Mensaje emotivo */}
        <p className="my-2 max-w-xs text-center font-serif text-xs italic leading-relaxed text-neutral-700 z-10">
          Será un día lleno de magia y bendiciones. Queremos compartir este gran momento contigo.
        </p>

        <p className="mb-3 font-serif text-base italic font-extrabold text-amber-800 tracking-wide z-10">
          ¡Te esperamos con los brazos abiertos!
        </p>

        {/* TARJETAS DE FECHA Y HORARIOS */}
        <div className="my-2 grid w-full grid-cols-3 gap-2 border-y-2 border-amber-300/80 py-4 text-center bg-gradient-to-b from-amber-50/60 to-amber-100/30 rounded-2xl shadow-inner z-10">
          <div className="flex flex-col items-center justify-start border-r border-amber-300/60 px-1">
            <Calendar className="mb-1 h-5 w-5 text-amber-700" />
            <p className="text-[11px] font-bold text-[#2A2421]">Sábado</p>
            <p className="my-0.5 font-serif text-2xl font-black text-amber-700">28</p>
            <p className="text-[9px] font-semibold uppercase text-neutral-500">Noviembre 2025</p>
          </div>

          <div className="flex flex-col items-center justify-start border-r border-amber-300/60 px-1">
            <Church className="mb-1 h-5 w-5 text-amber-700" />
            <p className="text-[11px] font-bold text-[#2A2421]">Ceremonia</p>
            <p className="text-[10px] font-extrabold text-amber-900">11:00 a.m.</p>
            <p className="mt-1 text-[10px] font-medium text-neutral-600">Gante 5</p>
            <p className="text-[10px] font-medium text-neutral-600">CDMX</p>
          </div>

          <div className="flex flex-col items-center justify-start px-1">
            <PartyPopper className="mb-1 h-5 w-5 text-amber-700" />
            <p className="text-[11px] font-bold text-[#2A2421]">Recepción</p>
            <p className="text-[10px] font-extrabold text-amber-900">3:00 p.m.</p>
            <p className="mt-1 text-[10px] font-medium text-neutral-600">Salón Flamingo</p>
          </div>
        </div>

        {/* BOTÓN UBICACIÓN REAL DE GOOGLE MAPS */}
        <div className="my-2.5 w-full text-center z-20">
          <a
            href={locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#2A2421] via-[#1F1A17] to-[#12100F] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-amber-100 shadow-2xl border-2 border-amber-400/40 transition-all hover:scale-105"
          >
            <MapPin className="h-4 w-4 text-amber-400" />
            <span>Ver Ubicación en Maps</span>
          </a>
        </div>

        {/* SECCIÓN PAPÁS Y PADRINOS */}
        <div className="mt-1 w-full text-center z-10">
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
        </div>

        {/* BOTÓN NAVEGACIÓN AL FORMULARIO */}
        <div className="mt-3 flex flex-col items-center text-center z-20">
          <p className="max-w-xs font-serif text-[11px] italic text-neutral-600 leading-relaxed font-medium">
            Tu confirmación nos ayudará a organizar todo con mucho amor.
          </p>

          <Link href="/formulario">
            <div className="mt-3 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 px-9 py-3.5 text-xs font-black tracking-wider text-amber-100 shadow-2xl shadow-amber-900/40 transition-all border border-amber-400/40 cursor-pointer hover:scale-105">
              <ClipboardList className="h-4 w-4 text-amber-200" />
              <span>Confirmar Asistencia</span>
            </div>
          </Link>

          <p className="mt-3 font-serif text-lg italic font-black text-amber-900">
            ¡Gracias por acompañarnos!
          </p>
        </div>

      </main>
    </div>
  )
}
