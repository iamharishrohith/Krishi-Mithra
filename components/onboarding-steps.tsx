"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    title: "Profile",
    content: "Confirm or update your basic profile settings. You can change these later in Settings.",
  },
  {
    title: "Preferences",
    content: "Choose your theme and default options so the app feels right for you.",
  },
  {
    title: "Finish",
    content: "Review your selections and complete setup. You can revisit onboarding anytime.",
  },
]

export default function OnboardingSteps() {
  const [index, setIndex] = useState(0)
  const router = useRouter()

  const isLast = index === steps.length - 1

  function next() {
    if (!isLast) setIndex((i) => i + 1)
  }

  function back() {
    if (index > 0) setIndex((i) => i - 1)
  }

  function finish() {
    try {
      localStorage.setItem("km_onboarded", "1")
    } catch {
      // ignore storage failures
    }
    router.push("/")
  }

  const step = steps[index]

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-pretty">{`Step ${index + 1} of ${steps.length}: ${step.title}`}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{step.content}</p>

        {/* Example inputs you can customize per step */}
        {index === 0 && (
          <div className="grid gap-3">
            <label className="text-sm" htmlFor="displayName">
              Display name
            </label>
            <input
              id="displayName"
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none"
              placeholder="Your name"
            />
          </div>
        )}
        {index === 1 && (
          <div className="grid gap-3">
            <label className="text-sm" htmlFor="theme">
              Theme
            </label>
            <select
              id="theme"
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none"
              defaultValue="system"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        )}
        {index === 2 && (
          <div className="rounded-md border border-border p-3 text-sm text-muted-foreground">
            You’re all set. Click “Finish” to start using the app.
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <Button
          variant="secondary"
          disabled={index === 0}
          onClick={back}
          className="bg-secondary text-secondary-foreground"
        >
          Back
        </Button>
        {!isLast ? (
          <Button onClick={next} className="bg-primary text-primary-foreground">
            Continue
          </Button>
        ) : (
          <Button onClick={finish} className="bg-primary text-primary-foreground">
            Finish
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
