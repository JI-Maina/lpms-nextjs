"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { faqs } from "./constants";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-border py-20">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <h2 className="mb-2 text-center text-4xl font-bold tracking-tight text-foreground md:text-[2.6rem]">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-lg text-muted-foreground">
          Everything you need to know about LPMS and the Beta program.
        </p>

        <div className="mx-auto max-w-2xl space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground"
                >
                  {faq.question}
                  <span
                    className={cn(
                      "shrink-0 text-primary transition-transform",
                      open && "rotate-180"
                    )}
                  >
                    ▾
                  </span>
                </button>
                {open && (
                  <div className="border-t border-border px-5 py-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
