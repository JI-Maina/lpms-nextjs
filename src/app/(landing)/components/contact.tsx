"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setStatus({
      type: "success",
      message: "✅ Message sent! We'll get back to you within 24 hours.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="border-t border-border py-20">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <h2 className="mb-2 text-center text-4xl font-bold tracking-tight text-foreground md:text-[2.6rem]">
          Get in <span className="text-primary">Touch</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-lg text-muted-foreground">
          Have a question about the Beta program or want a demo? Drop us a
          message.
        </p>

        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 md:p-10">
          <form className="space-y-6" onSubmit={onSubmit} noValidate>
            <div className="space-y-2">
              <Label htmlFor="contactName">Full Name</Label>
              <Input
                id="contactName"
                name="name"
                type="text"
                placeholder="Your full name"
                required
                className="h-11 rounded-xl bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email Address</Label>
              <Input
                id="contactEmail"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-11 rounded-xl bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactMessage">Message</Label>
              <textarea
                id="contactMessage"
                name="message"
                placeholder="How can we help you?"
                required
                rows={5}
                className="flex min-h-[120px] w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full font-semibold shadow-[0_0_20px_rgba(39,174,96,0.25)]"
            >
              Send Message
            </Button>

            {status && (
              <p
                className={
                  status.type === "success" ? "text-primary" : "text-destructive"
                }
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
