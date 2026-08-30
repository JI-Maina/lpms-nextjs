"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { betaBenefits } from "./constants";

const Beta = () => {
  return (
    <section id="beta" className="mx-auto w-full max-w-screen-2xl px-6 py-20 sm:px-10 lg:px-16">
      <div className="rounded-3xl border border-border bg-card px-8 py-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          🚀 Join the LPMS Beta
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          Be among the first to use a property management system built for the
          Kenyan market. Free during beta — your feedback shapes the product.
        </p>

        <div className="mx-auto mb-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {betaBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <div className="mb-2 text-4xl">{benefit.icon}</div>
              <h4 className="mb-1 font-semibold text-foreground">{benefit.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <form
          className="mx-auto flex max-w-md flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="Enter your email to join the waitlist"
            className="h-12 rounded-xl bg-background px-4 text-base"
          />
          <Button type="submit" size="lg" className="rounded-full text-base font-semibold">
            Join Beta Waitlist →
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Beta;
