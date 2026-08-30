"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <section id="contact" className="mx-auto w-full max-w-screen-2xl px-6 py-20 sm:px-10 lg:px-16">
      <h2 className="mb-8 text-center text-4xl font-bold text-foreground">
        Get in <span className="text-primary">Touch</span>
      </h2>

      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10">
        <form
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              required
              className="h-11 rounded-xl bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="h-11 rounded-xl bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              placeholder="How can we help you?"
              required
              rows={5}
              className="flex min-h-[120px] w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-full font-semibold">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
