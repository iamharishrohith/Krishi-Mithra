import OnboardingGuard from "@/components/onboarding-guard"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <OnboardingGuard />
      <h1 className="text-3xl font-bold tracking-tight text-pretty">Welcome to the app</h1>
      <p className="mt-2 text-muted-foreground">
        If you haven’t completed onboarding, you’ll be redirected automatically. To force onboarding again, open the app
        with {"?intro=1"} in the URL.
      </p>
    </main>
  )
}
