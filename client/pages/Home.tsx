import type React from "react"
import { CloudSun, Bug, Sprout, IndianRupee, Camera, CheckSquare, PhoneCall, BookOpen } from "lucide-react"
import Card from "@/ui/components/Card"
import { useI18n } from "@/i18n/i18n"
import { computeEligibleSchemes } from "@/utils/schemes"
import MarketPrices from "@/components/MarketPrices"

const Home: React.FC = () => {
  const { t } = useI18n()

  const profile = { landHoldingAcres: 2, crop: ["Tomato", "Banana"], isSmallFarmer: true }
  const schemes = computeEligibleSchemes(profile)

  return (
    <div className="pb-6">
      <div className="pt-4">
        <h2 className="text-2xl font-extrabold">
          {t("greeting")}, <span className="text-amber-700">🌥</span>
        </h2>
        <p className="text-gray-600 mt-1">{t("todaysWeather")}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Card
          title={t("weatherAlert")}
          subtitle="Rain likely in 24h"
          icon={<CloudSun className="w-6 h-6 text-emerald-700" />}
          tone="green"
        />
        <Card
          title={t("pestAlert")}
          subtitle="Monitor for leaf miner"
          icon={<Bug className="w-6 h-6 text-amber-700" />}
          tone="yellow"
        />
        <Card
          title={t("cropTip")}
          subtitle="Apply organic mulch"
          icon={<Sprout className="w-6 h-6 text-emerald-800" />}
          tone="brown"
        />
        <Card
          title={t("marketPrice")}
          subtitle="Tomato ₹22/kg"
          icon={<IndianRupee className="w-6 h-6 text-emerald-700" />}
          tone="neutral"
        />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-base mb-2">Quick actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card title="Sell" subtitle="List produce" icon={<IndianRupee className="w-5 h-5" />} tone="green" />
          <Card title="Log" subtitle="Sowing/Irrigation" icon={<CheckSquare className="w-5 h-5" />} tone="yellow" />
          <Card title="Scan" subtitle="Disease photo" icon={<Camera className="w-5 h-5" />} tone="brown" />
          <Card title="Consult" subtitle="Book expert" icon={<BookOpen className="w-5 h-5" />} tone="neutral" />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-base mb-2">Eligible schemes</h3>
        <ul className="space-y-2">
          {schemes.map((s) => (
            <li key={s.code} className="flex items-center gap-3 rounded-lg border p-3 bg-white">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-gray-600">{s.short}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-base mb-2">Market prices</h3>
        <MarketPrices />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-base mb-2">Today</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-3 rounded-lg border p-3 bg-white">
            <Sprout className="w-5 h-5 text-emerald-700" />
            <span>Fertilizer: 50kg FYM for tomato plot</span>
          </li>
          <li className="flex items-center gap-3 rounded-lg border p-3 bg-white">
            <CloudSun className="w-5 h-5 text-amber-600" />
            <span>Irrigate 20 minutes if no rain by 6 PM</span>
          </li>
          <li className="flex items-center gap-3 rounded-lg border p-3 bg-white">
            <PhoneCall className="w-5 h-5 text-emerald-700" />
            <span>Join group call at 7 PM: Tomato growers</span>
          </li>
        </ul>
      </div>

      <div className="mt-3 text-center text-sm text-gray-500">
        Tap the mic to ask questions. Try: “Should I irrigate today?”
      </div>
    </div>
  )
}

export default Home
