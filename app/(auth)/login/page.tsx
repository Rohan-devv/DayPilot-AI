import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

const navItems = ["Features", "How it works", "Reviews", "Pricing"];
const trustItems = ["Google OAuth", "No passwords", "Encrypted session"];

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/onboarding");
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#000000] text-white">
      {/* Subtle orange glow at top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(255,107,0,0.18),transparent)]"
      />

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        aria-label="Primary"
        className="relative z-10 border-b border-[#1A1A1A] bg-[#000000]"
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#login"
            className="group flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="DayPilot AI login"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#FF6B00] shadow-[0_0_24px_rgba(255,107,0,0.5)] transition duration-300 group-hover:shadow-[0_0_36px_rgba(255,107,0,0.7)]">
              {/* Mail icon matching landing page */}
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 text-white" fill="none">
                <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              DayPilot AI
            </span>
          </a>

          {/* Nav links */}
          <div className="hidden items-center gap-8 text-sm font-medium text-[#999999] md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href="#login"
                className="transition duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]/70"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#login"
            className="rounded-lg bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,107,0,0.35)] transition duration-200 hover:bg-[#FF8C33] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Get started free
          </a>
        </div>
      </nav>

      {/* ── LOGIN SECTION ────────────────────────────────────── */}
      <section
        id="login"
        className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-[460px]">

          {/* Beta badge */}
          <div className="mb-8 flex justify-center">
            <span className="flex items-center gap-2 rounded-full border border-[#1A1A1A] bg-[#0A0A0A] px-4 py-1.5 text-xs font-medium text-[#999999]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#FF6B00]" />
              </span>
              Now in public beta — free for 14 days
            </span>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.8)]">

            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="grid size-12 place-items-center rounded-xl bg-[#FF6B00] shadow-[0_0_32px_rgba(255,107,0,0.45)]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 text-white" fill="none">
                  <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                Welcome to DayPilot AI
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#999999]">
                Your inbox runs you. Time to reverse that. Sign in and let
                DayPilot handle your email and calendar.
              </p>
            </div>

            {/* Google Sign-in — server action preserved */}
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button
                type="submit"
                className="group relative flex min-h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-[#333333] bg-white px-4 py-3 text-sm font-semibold text-[#111111] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition duration-200 hover:bg-[#F5F5F5] hover:shadow-[0_4px_28px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] active:scale-[0.99]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
                  <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38Z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#1A1A1A]" />
              <span className="text-[11px] font-medium text-[#555555]">SECURED BY</span>
              <div className="h-px flex-1 bg-[#1A1A1A]" />
            </div>

            {/* Trust pills */}
            <div className="grid grid-cols-3 gap-2">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-[#1A1A1A] bg-[#111111] px-3 py-2.5 text-center text-[11px] font-medium text-[#999999]"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Flow indicator */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-[#1A1A1A] bg-[#111111] px-4 py-2.5 text-[11px] text-[#555555]">
              <span className="text-[#999999]">Google</span>
              <div className="mx-2 flex flex-1 items-center gap-1">
                <div className="h-px flex-1 bg-[#1A1A1A]" />
                <span className="text-[#FF6B00]">→</span>
                <div className="h-px flex-1 bg-[#1A1A1A]" />
              </div>
              <span className="text-[#999999]">DayPilot AI</span>
              <div className="mx-2 flex flex-1 items-center gap-1">
                <div className="h-px flex-1 bg-[#1A1A1A]" />
                <span className="text-[#FF6B00]">→</span>
                <div className="h-px flex-1 bg-[#1A1A1A]" />
              </div>
              <span className="text-[#999999]">Dashboard</span>
            </div>

            {/* Fine print */}
            <p className="mt-6 text-center text-xs leading-5 text-[#555555]">
              No credit card · Connects in 45 seconds · Works with your existing Gmail
            </p>
            <p className="mt-2 text-center text-xs leading-5 text-[#444444]">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#666666] underline underline-offset-2 hover:text-[#999999]">Terms</a>
              {" "}and{" "}
              <a href="#" className="text-[#666666] underline underline-offset-2 hover:text-[#999999]">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
