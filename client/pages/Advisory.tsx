"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Mic, Paperclip, ImageIcon, Sprout, Droplet, Bell, CalendarClock, X } from "lucide-react"
import { recordAdviceFeedback, isAdviceSuppressed } from "@/utils/adaptive"

const Advisory: React.FC = () => {
  const [showAdvice, setShowAdvice] = useState(true)

  useEffect(() => {
    // Example advice key we may want to suppress (e.g., "spray_neem_morning")
    const suppressed = isAdviceSuppressed("spray_neem_morning")
    if (suppressed) setShowAdvice(false)
  }, [])

  const messages = [
    { from: "ai", text: "Rain expected tomorrow, avoid spraying." },
    { from: "me", text: "What about pest control for chilies?" },
    { from: "ai", text: "Use neem oil 3% early morning, avoid noon heat." },
  ]

  const dismissAdvice = async () => {
    const reason = window.prompt("Skip this advice because… (e.g., Not available, Too costly, Not effective, Other)")
    await recordAdviceFeedback("spray_neem_morning", reason || "no_reason")
    setShowAdvice(false)
  }

  return (
    <div className="flex flex-col gap-4 pb-28">
      <section className="mt-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Bell className="w-4 h-4" /> Reminders
        </h3>
        <div className="flex gap-2 overflow-x-auto">
          <div className="shrink-0 rounded-full px-3 py-1 text-xs bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-1">
            <CalendarClock className="w-3.5 h-3.5" /> Spray after rain
          </div>
          <div className="shrink-0 rounded-full px-3 py-1 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800">
            Fertilizer due Fri
          </div>
          <div className="shrink-0 rounded-full px-3 py-1 text-xs bg-stone-50 border border-stone-200 text-stone-800">
            Group call 7 PM
          </div>
        </div>
      </section>

      {showAdvice && (
        <div className="rounded-xl border p-3 bg-emerald-50 border-emerald-200 relative">
          <button
            aria-label="Dismiss advice"
            onClick={dismissAdvice}
            className="absolute right-2 top-2 text-emerald-900/70 hover:text-emerald-900"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="font-semibold mb-1">Advice</div>
          <p className="text-sm text-emerald-900">Use neem oil 3% early morning, avoid noon heat.</p>
          <div className="text-[11px] text-emerald-900/80 mt-2">
            If you skip this advice, we’ll adjust future suggestions.
          </div>
        </div>
      )}

      <div className="space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.from === "ai" ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200 ml-auto"}`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border p-3 bg-white">
          <div className="flex items-center gap-2 font-semibold">
            <Sprout className="w-4 h-4" /> Fertilizer schedule
          </div>
          <p className="text-sm text-gray-600 mt-1">NPK 12:32:16 at 25 DAP, 1kg/cent</p>
        </div>
        <div className="rounded-xl border p-3 bg-white">
          <div className="flex items-center gap-2 font-semibold">
            <Droplet className="w-4 h-4" /> Irrigation tip
          </div>
          <p className="text-sm text-gray-600 mt-1">Drip 30 min in morning; skip if rainfall ≥10mm</p>
        </div>
      </div>

      <div className="sticky bottom-20 z-20 px-4">
        <div className="bg-white/95 backdrop-blur rounded-full border px-3 py-2 flex items-center gap-2 shadow">
          <button className="p-2 rounded-full bg-emerald-50 border text-emerald-700">
            <Mic className="w-5 h-5" />
          </button>
          <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Type your question..." />
          <button className="p-2 text-gray-600">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600">
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Advisory
