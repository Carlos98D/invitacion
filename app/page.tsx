import { MapPin, Church, PartyPopper, Heart } from "lucide-react"
import { MusicPlayer } from "@/components/music-player"

export default function Invitacion() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-neutral-950 p-0 font-sans text-neutral-800 md:p-4">
      <MusicPlayer src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3" />

      <main className="relative flex min-h-screen w-full max-w-md flex-col items-center overflow-y-auto border border-amber-200/50 bg-[#FAF8F5] px-6 py-10 shadow-2xl md:min-h-[850px] md:max-h-[900px] md:rounded-3xl">
        <div className="mb-6 h-1 w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-amber-700/80">Nuestra Pequeña</p>

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
          &quot;Hay momentos en la vida que son verdaderamente especiales, y compartirlos con quienes m&aacute;s amamos los
          hace inolvidables.&quot;
        </p>

        <div className="my-4 w-full rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 text-center shadow-sm backdrop-blur-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">S&Aacute;BADO</p>
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
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">CUMPLEA&Ntilde;OS</p>
            <p className="mt-1 text-sm font-bold text-neutral-800">3:00 P.M.</p>
          </div>
        </div>

        <div className="my-4 w-full rounded-2xl border border-amber-500/20 bg-neutral-900 p-6 text-center text-white shadow-lg">
          <div className="mb-3 inline-flex rounded-full bg-amber-500/10 p-3 text-amber-400">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-amber-400">LUGAR DEL EVENTO</h3>
          <p className="mb-1 text-base font-bold text-white">Sal&oacute;n de Fiestas Flamingo</p>
          <p className="mb-5 text-xs text-neutral-400">Gante 5, CDMX</p>

          <a
            href="https://maps.google.com/?q=Gante+5+CDMX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md active:scale-95"
          >
            <MapPin className="h-4 w-4" />
            Ver ubicaci&oacute;n en Google Maps
          </a>
        </div>

        <div className="mt-2 w-full border-t border-amber-200/60 pt-6 text-center">
          <div className="mb-4">
            <p className="font-serif text-xs italic text-neutral-500">Mis Pap&aacute;s</p>
            <p className="text-sm font-bold tracking-wide text-neutral-800">Lidia e Isai</p>
          </div>
          <div>
            <p className="font-serif text-xs italic text-neutral-500">Padrinos</p>
            <p className="text-sm font-bold tracking-wide text-neutral-800">Teresa y Luis</p>
          </div>
        </div>

        <p className="mb-4 mt-8 font-serif text-xl italic text-amber-600">&iexcl;Te esperamos!</p>
      </main>
    </div>
  )
}
