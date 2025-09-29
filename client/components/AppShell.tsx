"use client"

import React, { useEffect } from "react"
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Home, MessageSquare, Users, ShoppingBasket, User, Moon, Sun, Languages, Shield } from "lucide-react"
import MicButton from "@/ui/components/MicButton"
import { useI18n } from "@/i18n/i18n"
import { localBranding } from "@/config/local-branding"
import { useOfflineStatus, processWriteQueue } from "@/utils/offline"

const AppShell: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useI18n()
  const hideChrome = location.pathname.startsWith("/onboarding")
  const showMic = location.pathname === "/"

  useEffect(() => {
    const onboarded = localStorage.getItem("km_onboarded")
    if (!onboarded && !hideChrome) {
      navigate("/onboarding", { replace: true })
    }
  }, [hideChrome, navigate])

  // Process any queued writes when the app regains connectivity
  useEffect(() => {
    const onOnline = () => processWriteQueue().catch(() => {})
    window.addEventListener("online", onOnline)
    return () => window.removeEventListener("online", onOnline)
  }, [])

  const isOffline = useOfflineStatus()

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-200/70">
      <div className="relative w-full max-w-[420px] h-[740px] sm:h-[780px] bg-gradient-to-b from-amber-50 to-white text-foreground shadow-2xl rounded-[28px] overflow-hidden flex flex-col">
        {!hideChrome && (
          <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
            <div className="px-4 py-3 relative flex items-center justify-center">
              <LangButton />
              <span className="font-extrabold text-lg tracking-tight text-primary">{t("appName")}</span>
              <ThemeButton />
            </div>
            {/* Branding strip */}
            <div className="px-4 py-2 bg-emerald-50/80 border-t flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>
                  {localBranding.panchayat} • {localBranding.krishiOfficer}
                </span>
              </div>
              {isOffline && (
                <span className="rounded-full bg-amber-100 border border-amber-300 text-amber-900 px-2 py-0.5">
                  Offline mode
                </span>
              )}
            </div>
          </header>
        )}

        <main
          className={`relative px-4 ${hideChrome ? "pb-4" : ""} flex-1 overflow-y-auto`}
          style={!hideChrome ? { paddingBottom: showMic ? "140px" : "90px" } : undefined}
        >
          <Outlet />
        </main>

        {!hideChrome && (
          <>
            {showMic && (
              <div
                className="absolute inset-x-0 z-40 flex justify-center pointer-events-none"
                style={{ bottom: "96px" }}
              >
                <div className="pointer-events-auto">
                  <MicButton />
                </div>
              </div>
            )}

            <nav className="absolute bottom-0 inset-x-0 z-30 border-t bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
              <div className="grid grid-cols-5 gap-1 px-3 py-2 text-sm">
                <Tab to="/" icon={<Home className="w-5 h-5" />} label={t("home")} />
                <Tab to="/advisory" icon={<MessageSquare className="w-5 h-5" />} label={t("advisory")} />
                <Tab to="/community" icon={<Users className="w-5 h-5" />} label={t("community")} />
                <Tab to="/marketplace" icon={<ShoppingBasket className="w-5 h-5" />} label={t("marketplace")} />
                <Tab to="/profile" icon={<User className="w-5 h-5" />} label={t("profile")} />
              </div>
            </nav>
          </>
        )}
      </div>
    </div>
  )
}

const Tab: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center gap-1 rounded-lg py-2 ${
        isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
      }`
    }
  >
    {icon}
    <span className="text-[11px] leading-none">{label}</span>
  </NavLink>
)

const ThemeButton: React.FC = () => {
  const [dark, setDark] = React.useState(() => document.documentElement.classList.contains("dark"))
  React.useEffect(() => {
    const saved = localStorage.getItem("km_theme")
    if (saved) {
      document.documentElement.classList.toggle("dark", saved === "dark")
      setDark(saved === "dark")
    }
  }, [])
  const toggle = () => {
    const next = dark ? "light" : "dark"
    document.documentElement.classList.toggle("dark", next === "dark")
    localStorage.setItem("km_theme", next)
    setDark(!dark)
  }
  return (
    <button
      aria-label={dark ? "Switch to light" : "Switch to dark"}
      onClick={toggle}
      className="absolute right-4 p-2 rounded-full bg-white/70 border shadow-sm text-gray-700"
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

const LangButton: React.FC = () => {
  const { lang, setLang } = useI18n()
  const toggle = () => setLang(lang === "ml" ? "en" : "ml")
  return (
    <button
      aria-label="Switch language"
      onClick={toggle}
      className="absolute left-4 p-2 rounded-full bg-white/70 border shadow-sm text-gray-700"
    >
      <Languages className="w-5 h-5" />
    </button>
  )
}

export default AppShell
