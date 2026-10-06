"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { betaRoles, betaTerms, privacyTerms } from "./constants";

const Beta = () => {
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenPanel((current) => (current === id ? null : id));
  };

  return (
    <section id="beta" className="py-20">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <h2 className="mb-2 text-center text-4xl font-bold tracking-tight text-foreground md:text-[2.6rem]">
          Join the <span className="text-primary">LPMS Beta</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-lg text-muted-foreground">
          Be a founding partner — shape the future of property management in
          Kenya.
        </p>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl shadow-black/30 md:p-10">
          <h3 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            🚀 About the <span className="text-primary">Beta Program</span>
          </h3>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            We&apos;re looking for 20 dedicated property professionals to test
            LPMS in real‑world operations. Your feedback directly influences the
            product roadmap.
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {betaRoles.map((role) => (
              <div
                key={role.title}
                className="rounded-xl border border-border bg-background/60 p-5 text-center"
              >
                <span className="mb-2 block text-3xl">{role.icon}</span>
                <h4 className="font-semibold text-foreground">{role.title}</h4>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 space-y-3">
            <AccordionItem
              open={openPanel === "terms"}
              onToggle={() => toggle("terms")}
              title={betaTerms.title}
            >
              <p className="mb-3 font-medium text-foreground">{betaTerms.intro}</p>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                {betaTerms.items.map((item) => (
                  <li key={item.label}>
                    <strong className="text-foreground">{item.label}</strong>{" "}
                    {item.text}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">{betaTerms.note}</p>
            </AccordionItem>

            <AccordionItem
              open={openPanel === "privacy"}
              onToggle={() => toggle("privacy")}
              title={privacyTerms.title}
            >
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                {privacyTerms.items.map((item) => (
                  <li key={item.label}>
                    <strong className="text-foreground">{item.label}</strong>{" "}
                    {item.text}
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-semibold shadow-[0_0_20px_rgba(39,174,96,0.25)]"
            >
              <Link href="/beta">EXPLORE THE BETA PROGRAM →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

function AccordionItem({
  open,
  onToggle,
  title,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/50">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground"
      >
        {title}
        <span
          className={cn(
            "text-primary transition-transform",
            open && "rotate-180"
          )}
        >
          ▾
        </span>
      </button>
      {open && <div className="border-t border-border px-5 py-4">{children}</div>}
    </div>
  );
}

export default Beta;
