import type React from "react"
import useSWR from "swr"
import { IndianRupee } from "lucide-react"
import { fetchWithCache } from "@/utils/offline"

type PriceRow = { commodity: string; price: number; unit?: string; market?: string }

const feedUrl =
  (typeof window !== "undefined" && (window as any).env?.NEXT_PUBLIC_MARKET_FEED_URL) ||
  (typeof process !== "undefined" && (process as any).env?.NEXT_PUBLIC_MARKET_FEED_URL) ||
  ""

const fallback: PriceRow[] = [
  { commodity: "Tomato", price: 22, unit: "₹/kg", market: "Alappuzha" },
  { commodity: "Banana (Nendran)", price: 48, unit: "₹/kg", market: "Thrissur" },
]

const fetcher = async (url: string) => {
  if (!url) return fallback
  const res = await fetchWithCache(url)
  if (!res.ok) throw new Error("failed")
  return res.json()
}

const MarketPrices: React.FC = () => {
  const { data, error } = useSWR<PriceRow[]>(feedUrl || "fallback", fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  const rows = error || !data ? fallback : data

  return (
    <div className="rounded-xl border bg-white p-3">
      <ul className="divide-y">
        {rows.slice(0, 4).map((r, idx) => (
          <li key={idx} className="py-2 flex items-center justify-between">
            <div>
              <div className="font-semibold">{r.commodity}</div>
              <div className="text-xs text-gray-600">{r.market || "Local mandi"}</div>
            </div>
            <div className="flex items-center gap-1 text-emerald-700">
              <IndianRupee className="w-4 h-4" />
              <span className="font-bold">{r.price}</span>
              <span className="text-xs text-gray-600">{r.unit || "₹/kg"}</span>
            </div>
          </li>
        ))}
      </ul>
      {!feedUrl && (
        <div className="mt-2 text-xs text-gray-600">
          Using sample prices. Set NEXT_PUBLIC_MARKET_FEED_URL to enable live rates.
        </div>
      )}
    </div>
  )
}

export default MarketPrices
