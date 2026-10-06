import Link from "next/link";

import { Button } from "@/components/ui/button";

import { chartBarHeights } from "./constants";

const Hero = () => {
  return (
    <section id="home" className="mx-auto w-full max-w-[1120px] px-6 pb-16 pt-16 md:pt-28">
      <div className="flex min-h-[70vh] flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex-1">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            🚀 Beta Now Open
          </span>
          <h1 className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[3.4rem]">
            Take your property management{" "}
            <span className="relative text-primary">
              to the next level
              <span className="absolute bottom-1 left-0 right-0 -z-10 h-1.5 rounded bg-primary/25" />
            </span>
          </h1>
          <p className="mb-8 max-w-md text-lg text-muted-foreground">
            A single reference system for landlords and agents — track rent,
            tenants, maintenance, and finances without spreadsheets.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-semibold shadow-[0_0_20px_rgba(39,174,96,0.25)] transition hover:-translate-y-0.5"
            >
              <Link href="/beta/apply">Apply for Beta →</Link>
            </Button>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Limited slots — apply now
            </span>
          </div>
        </div>

        <div className="w-full flex-1">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/40">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <div className="flex gap-2">
                <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Overview
                </span>
                <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs text-muted-foreground">
                  Properties
                </span>
                <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs text-muted-foreground">
                  Tenants
                </span>
              </div>
              <span className="text-xs text-muted-foreground">📅 Apr 2026</span>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-3">
              {[
                { label: "Properties", value: "12" },
                { label: "Units", value: "48" },
                { label: "Occupancy", value: "94%", green: true },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[10px] border border-border bg-white/[0.03] p-3"
                >
                  <div className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </div>
                  <div
                    className={`text-xl font-bold ${stat.green ? "text-primary" : "text-foreground"}`}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4 rounded-[10px] border border-border bg-white/[0.02] p-3">
              <div className="mb-1.5 flex justify-between text-[0.7rem] text-muted-foreground">
                <span>Monthly Rent Collection</span>
                <span>+12% vs last month</span>
              </div>
              <div className="flex h-[60px] items-end gap-1.5">
                {chartBarHeights.map((height, i) => (
                  <div
                    key={i}
                    className="min-h-2 flex-1 rounded-t bg-primary/70"
                    style={{ height }}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between text-[0.7rem] text-muted-foreground">
              <span>💰 KES 2.4M collected this month</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Live sync
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
