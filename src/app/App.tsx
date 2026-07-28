import { useState, useEffect, Fragment } from "react"
import bgImage from "@/imports/image.png"
import heroBrandImage from "@/imports/logo_CDG25_branca.png"
import pibLogo from "@/imports/logo_PIB_white_H_lp_cdg.png"
import { SpecularSurface } from "@/app/components/SpecularButton"
import ShinyText from "@/app/components/ShinyText"
import "./App.css"

const EVENT_DATE = new Date("2026-08-13T00:00:00-03:00")

function useCountdown() {
  const calc = () => {
    const diff = EVENT_DATE.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const COUNTDOWN_ITEMS = [
  { key: "dias", label: "dias", gold: true },
  { key: "hrs", label: "hrs", gold: false },
  { key: "min", label: "min", gold: false },
  { key: "seg", label: "seg", gold: false },
] as const

export default function App() {
  const countdown = useCountdown()

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const values = [countdown.days, countdown.hours, countdown.minutes, countdown.seconds]

  return (
    <div className="lp" style={{ fontFamily: "var(--font-body)" }}>
      <div className="lp__bg" aria-hidden="true">
        <img src={bgImage} alt="" />
        <div className="absolute inset-0" style={{ background: "rgba(8,7,6,0.42)" }} />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,165,90,0.06) 0%, transparent 70%)" }}
        />
      </div>

      <main className="lp__content">
        <img src={heroBrandImage} alt="Casas de Glória 2026" className="lp__logo" />

        <section className="lp__countdown" aria-label="Contagem regressiva para o evento">
          <div className="lp__countdown-grid">
            {COUNTDOWN_ITEMS.map((item, i) => (
              <Fragment key={item.key}>
                <SpecularSurface
                  className="lp__countdown-card"
                  radius={9999}
                  tint="#ffffff"
                  tintOpacity={0.06}
                  blur={24}
                  lineColor="#c9a55a"
                  baseColor="#6b5840"
                  intensity={1.2}
                  shineSize={14}
                  shineFade={35}
                  thickness={1.2}
                  followMouse
                  proximity={400}
                >
                  <span
                    className={`lp__countdown-value ${item.gold ? "lp__countdown-value--gold" : "lp__countdown-value--light"}`}
                  >
                    {String(values[i]).padStart(2, "0")}
                  </span>
                  <span className="lp__countdown-label">{item.label}</span>
                </SpecularSurface>
                {i < 3 && <span className="lp__countdown-sep" aria-hidden="true">:</span>}
              </Fragment>
            ))}
          </div>
          <p className="lp__countdown-caption">
            <span className="lp__countdown-dot" aria-hidden="true" />
            para o evento
          </p>
        </section>

        <p className="lp__status">
          <ShinyText
            text="AGUARDE..."
            speed={2.5}
            delay={0.5}
            color="#d4cfc8"
            shineColor="#c9a55a"
            spread={120}
            direction="left"
            className="lp__status-shiny"
          />
        </p>
        <p className="lp__date">13–16 Agosto 2026</p>
        <img
          src={pibLogo}
          alt="Primeira Igreja Batista de Curitiba"
          className="lp__pib-logo"
        />
      </main>
    </div>
  )
}
