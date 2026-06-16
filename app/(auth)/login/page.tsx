import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

const navItems = ["Features", "Integrations", "Use Cases", "Security"];
const trustItems = ["Google OAuth", "No passwords", "Encrypted session"];

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#02040d] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,#02040d_0%,#09111f_45%,#02040d_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-26rem] -z-20 h-[42rem] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.32),rgba(99,102,241,0.13)_36%,transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_72%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent"
      />

      <nav
        aria-label="Primary"
        className="relative z-10 border-b border-white/[0.08] bg-white/[0.035] shadow-[0_12px_60px_rgba(2,6,23,0.42)] backdrop-blur-2xl"
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#login"
            className="group flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040d]"
            aria-label="Orbit AI login"
          >
            <span className="grid size-9 place-items-center rounded-2xl border border-cyan-200/25 bg-gradient-to-br from-cyan-300 via-sky-500 to-blue-700 shadow-[0_0_36px_rgba(56,189,248,0.42)] transition duration-300 group-hover:shadow-[0_0_48px_rgba(125,211,252,0.62)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5 text-white"
                fill="none"
              >
                <path
                  d="M12 3v5.4M12 15.6V21M3 12h5.4M15.6 12H21M6.35 6.35l3.82 3.82M13.83 13.83l3.82 3.82M17.65 6.35l-3.82 3.82M10.17 13.83l-3.82 3.82"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 8.75c2.05 0 3.25 1.2 3.25 3.25s-1.2 3.25-3.25 3.25S8.75 14.05 8.75 12 9.95 8.75 12 8.75Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-normal text-white">
                DayPilot AI
              </span>
              <span className="hidden rounded-full border border-cyan-200/20 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-medium text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.14)] sm:inline-flex">
                AI Executive Assistant
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href="#login"
                className="transition duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#02040d]"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-xs font-medium text-slate-300 sm:inline-flex">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
              </span>
              Google OAuth Secured
            </span>
            <a
              href="#login"
              className="rounded-full border border-sky-200/30 bg-sky-400/15 px-4 py-2 text-xs font-semibold text-sky-50 shadow-[0_0_28px_rgba(14,165,233,0.32)] transition duration-200 hover:border-sky-100/50 hover:bg-sky-300/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040d]"
            >
              Sign in
            </a>
          </div>
        </div>
      </nav>

      <section
        id="login"
        className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-x-4 top-10 -z-10 h-40 rounded-full bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent blur-3xl" />

        <div className="w-full max-w-[520px]">
          <div className="mb-6 flex justify-center">
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-cyan-100 shadow-[0_0_38px_rgba(34,211,238,0.16)] backdrop-blur-xl">
              Focused access for Gmail and Google Calendar
            </span>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-sky-400/40 via-cyan-200/20 to-fuchsia-400/30 opacity-80 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.12] bg-white/[0.065] p-6 shadow-[0_30px_110px_rgba(2,6,23,0.72),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl sm:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cyan-200/[0.08] to-transparent"
              />

              <div className="relative flex flex-col items-center text-center">
                <div className="mb-6 grid size-14 place-items-center rounded-2xl border border-cyan-100/30 bg-gradient-to-br from-cyan-200 via-sky-500 to-blue-700 shadow-[0_0_42px_rgba(56,189,248,0.52)]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-7 text-white"
                    fill="none"
                  >
                    <path
                      d="M12 3v5.4M12 15.6V21M3 12h5.4M15.6 12H21M6.35 6.35l3.82 3.82M13.83 13.83l3.82 3.82M17.65 6.35l-3.82 3.82M10.17 13.83l-3.82 3.82"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M12 8.85c1.98 0 3.15 1.17 3.15 3.15S13.98 15.15 12 15.15 8.85 13.98 8.85 12 10.02 8.85 12 8.85Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>
                </div>

                
                <h1 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                  Welcome to DayPilot AI
                </h1>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                  Your AI executive assistant for Gmail, Calendar, and the
                  decisions waiting between them.
                </p>

                <form
                  className="mt-8 w-full"
                  action={async () => {
                    "use server";
                    await signIn("google");
                  }}
                >
                  <button
                    type="submit"
                    className="group relative flex min-h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/60 bg-white px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(255,255,255,0.18),0_14px_38px_rgba(14,165,233,0.2)] transition duration-200 hover:scale-[1.015] hover:shadow-[0_0_56px_rgba(255,255,255,0.28),0_18px_48px_rgba(14,165,233,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#111827] active:scale-[0.99]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-r from-white via-cyan-50 to-blue-50 opacity-0 transition duration-200 group-hover:opacity-100"
                    />
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="relative size-5"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38Z"
                      />
                    </svg>
                    <span className="relative">Continue with Google</span>
                  </button>
                </form>

                <div className="mt-6 grid w-full grid-cols-1 gap-2 text-left sm:grid-cols-3">
                  {trustItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.045] px-3 py-3 text-center text-[11px] font-medium text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex w-full items-center justify-between rounded-2xl border border-cyan-100/[0.1] bg-cyan-100/[0.045] px-4 py-3 text-[11px] text-cyan-50/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <span>Google</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent mx-3" />
                  <span>DayPilot AI</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent mx-3" />
                  <span>Dashboard</span>
                </div>

                <p className="mt-6 max-w-sm text-xs leading-5 text-slate-400">
                  By continuing, you agree to our Terms and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
