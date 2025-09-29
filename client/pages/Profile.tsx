"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { kvGet, kvSet } from "@/utils/offline"

type Member = { id: string; name: string; role?: string }
type FamilyProfile = { sharedAccess: boolean; members: Member[]; sensorId?: string; soilMoisture?: number }

const Profile: React.FC = () => {
  const [fp, setFp] = useState<FamilyProfile>({ sharedAccess: true, members: [] })

  useEffect(() => {
    kvGet<FamilyProfile>("family_profile").then((v) => {
      if (v) setFp(v)
    })
  }, [])

  const save = async (next: FamilyProfile) => {
    setFp(next)
    await kvSet("family_profile", next)
  }

  const addMember = async () => {
    const name = window.prompt("Member name")
    if (!name) return
    const next = { ...fp, members: [...fp.members, { id: crypto.randomUUID(), name }] }
    await save(next)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-white p-4">
        <div className="font-semibold">Rajan P</div>
        <div className="text-sm text-gray-600">Alappuzha • 2 acres • Irrigated</div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <div className="font-semibold mb-2">Farm details</div>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li>Crop: Tomato, Banana</li>
          <li>Soil: Loamy</li>
          <li>Irrigation: Drip</li>
        </ul>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <div className="font-semibold mb-2">Family/Community profiles</div>
        <label className="flex items-center justify-between py-2 border-b last:border-0">
          <span>Shared access enabled</span>
          <input
            type="checkbox"
            checked={fp.sharedAccess}
            onChange={(e) => save({ ...fp, sharedAccess: e.target.checked })}
            className="h-4 w-4"
          />
        </label>

        <div className="mt-3">
          <div className="text-sm text-gray-600 mb-2">Members</div>
          <ul className="space-y-2">
            {fp.members.map((m) => (
              <li key={m.id} className="flex items-center justify-between rounded-lg border p-2">
                <span className="text-sm">{m.name}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={addMember}
            className="mt-3 text-sm rounded-md border px-3 py-1.5 bg-emerald-50 border-emerald-200 text-emerald-900"
          >
            Add member
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <div className="font-semibold mb-2">IoT sensors (optional)</div>
        <label className="flex items-center justify-between py-2 border-b">
          <span>Sensor ID</span>
          <input
            className="border rounded-md px-2 py-1 text-sm"
            placeholder="e.g., KM-001"
            value={fp.sensorId || ""}
            onChange={(e) => save({ ...fp, sensorId: e.target.value })}
          />
        </label>
        <label className="flex items-center justify-between py-2">
          <span>Soil moisture (%)</span>
          <input
            type="number"
            className="border rounded-md px-2 py-1 text-sm w-20"
            value={fp.soilMoisture ?? ""}
            onChange={(e) => save({ ...fp, soilMoisture: Number(e.target.value) })}
          />
        </label>
        <div className="text-xs text-gray-600 mt-2">Future: auto-ingest from low-cost sensors or weather stations.</div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <div className="font-semibold mb-2">Preferences</div>
        <label className="flex items-center justify-between py-2 border-b last:border-0">
          <span>Language</span>
          <span className="text-gray-600">Malayalam</span>
        </label>
        <label className="flex items-center justify-between py-2 border-b last:border-0">
          <span>Notifications</span>
          <input type="checkbox" defaultChecked className="h-4 w-4" />
        </label>
        <label className="flex items-center justify-between py-2">
          <span>Data Saver</span>
          <input type="checkbox" className="h-4 w-4" />
        </label>
      </div>
    </div>
  )
}

export default Profile
