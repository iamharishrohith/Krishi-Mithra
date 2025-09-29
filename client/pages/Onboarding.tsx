"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Users, BookOpen } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useI18n } from "@/i18n/i18n"

type StepKey = "sih" | "team" | "problem"

const steps: StepKey[] = ["sih", "team", "problem"]

const Onboarding: React.FC = () => {
  const nav = useNavigate()
  const { t } = useI18n()
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const done = localStorage.getItem("km_onboarded")
    if (done) nav("/")
  }, [nav])

  const next = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((s) => s + 1)
    } else {
      localStorage.setItem("km_onboarded", "1")
      nav("/")
    }
  }

  const step = steps[stepIndex]

  return (
    <div className="min-h-[calc(100vh-2rem)] flex flex-col items-center justify-between py-8">
      <div className="w-full max-w-sm">
        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i === stepIndex ? "bg-primary" : "bg-gray-300"}`} />
          ))}
        </div>

        {/* Content */}
        {step === "sih" && (
          <section className="rounded-2xl border bg-white p-6 shadow-sm text-center">
            <img src="/SIH Logo.png" alt="Smart India Hackathon Logo" className="mx-auto h-16 w-16 mb-3" />
            <h1 className="text-2xl font-extrabold text-primary">Smart India Hackathon 2025</h1>
            <p className="mt-2 text-gray-700">
              Empowering farmers in Kerala with AI-guided advisory, community support, and market linkages.
            </p>
          </section>
        )}

        {step === "team" && (
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <img src="/team.png" alt="Team Logo" className="h-12 w-12 rounded-md border" />
              <div>
                <h2 className="text-xl font-bold">Monarch Realms</h2>
                <div className="text-sm text-gray-600">Rathinam College of Arts & Science, Coimbatore</div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" /> Members
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>Subhaharini S – Lead Engineer</li>
                <li>Harish Rohith S – AI/ML</li>
                <li>Sheik Faridul M – UX</li>
                <li>Kevin P – Full-stack</li>
                <li>Ragunathsri  – Ops/QA</li>
              </ul>
            </div>
          </section>
        )}

        {step === "problem" && (
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              Problem Statement
            </h2>
            <p className="mt-2 text-gray-700">
              Kerala’s smallholder farmers often lack access to personalized, timely agricultural advice. Generic advisories fail to account for local crop choices, weather, soil conditions, or farming practices. Many farmers also don’t maintain records of their activities, which limits learning from past seasons and accessing scheme benefits.
            </p>
            <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
              Our solution focuses on trust (local Krishi Officer & panchayat branding), resilience (offline-first), and
              real outcomes (market prices, scheme eligibility).
            </div>
          </section>
        )}
      </div>

      <div className="w-full max-w-sm px-4">
        <button
          onClick={next}
          className="w-full rounded-full bg-primary text-white py-3 text-lg font-semibold shadow-md active:scale-[0.99]"
        >
          {step === "problem" ? "Explore our solution" : "Next"}
        </button>
      </div>
    </div>
  )
}

export default Onboarding
