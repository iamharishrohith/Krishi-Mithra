import OnboardingSteps from "@/components/onboarding-steps"

export default function OnboardingPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-pretty">Let’s get you set up</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Complete these three quick steps. You can revisit onboarding anytime.
        </p>
      </header>

      <OnboardingSteps />
    </main>
  )
}
