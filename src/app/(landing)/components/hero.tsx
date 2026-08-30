import Link from "next/link";

import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="mx-auto w-full max-w-screen-2xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex-1">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Take your property management{" "}
            <span className="text-primary">to the next level</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            A single reference system for landlords and agents — track rent,
            tenants, maintenance, and finances without spreadsheets.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 text-base font-semibold"
          >
            <Link href="/auth/register">Get Started Free</Link>
          </Button>
        </div>

        <div className="flex min-h-[280px] w-full flex-1 items-center justify-center rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground lg:min-h-[360px]">
          <span className="text-xl">📊 Dashboard Preview</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
