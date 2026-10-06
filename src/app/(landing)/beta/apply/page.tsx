"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import Footer from "../../components/footer";
import Header from "../../components/header";
import { betaNav } from "../../components/constants";

type FieldErrors = Partial<
  Record<
    "fullName" | "email" | "phone" | "role" | "propertyCount" | "motivation" | "terms",
    string
  >
>;

export default function BetaApplyPage() {
  const [propertyCount, setPropertyCount] = useState(5);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);

  const validate = (form: HTMLFormElement): FieldErrors => {
    const data = new FormData(form);
    const next: FieldErrors = {};

    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const role = String(data.get("role") || "");
    const motivation = String(data.get("motivation") || "").trim();
    const terms = data.get("terms") === "on";

    if (fullName.length < 2) next.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Please enter a valid email address.";
    }
    if (phone.replace(/\s/g, "").length < 7) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!role) next.role = "Please select your role.";
    if (propertyCount < 0) next.propertyCount = "Please select a valid number.";
    if (motivation.length < 10) {
      next.motivation = "Please tell us why you want to join.";
    }
    if (!terms) next.terms = "You must agree to the terms to apply.";

    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please fix the highlighted errors before submitting.",
      });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    // UI-only for now — wire to your API when ready
    await new Promise((resolve) => setTimeout(resolve, 600));

    setStatus({
      type: "success",
      message:
        "✅ Application submitted successfully! We'll review it and get back to you within 48 hours.",
    });
    form.reset();
    setPropertyCount(5);
    setErrors({});
    setSubmitting(false);
  };

  return (
    <main>
      <Header
        links={betaNav}
        ctaHref="/beta/apply"
        ctaLabel="Apply Now →"
        activeHref="/beta/apply"
      />

      <section className="px-6 pb-6 pt-10 text-center">
        <div className="mx-auto max-w-[720px]">
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-foreground">
            Beta <span className="text-primary">Application</span>
          </h1>
          <p className="text-muted-foreground">
            Tell us about yourself and your property portfolio. We&apos;ll review
            your application within 48 hours.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-[720px]">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-xl shadow-black/30 md:p-10">
            <form className="space-y-6" onSubmit={onSubmit} noValidate>
              <Field
                label="Full Name"
                required
                error={errors.fullName}
                htmlFor="fullName"
              >
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="e.g. Jane Muthoni"
                  className={cn(
                    "h-11 rounded-xl bg-background",
                    errors.fullName && "border-destructive"
                  )}
                />
              </Field>

              <Field
                label="Email Address"
                required
                error={errors.email}
                htmlFor="email"
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={cn(
                    "h-11 rounded-xl bg-background",
                    errors.email && "border-destructive"
                  )}
                />
              </Field>

              <Field
                label="Phone Number"
                required
                error={errors.phone}
                htmlFor="phone"
              >
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. 0712 345 678"
                  className={cn(
                    "h-11 rounded-xl bg-background",
                    errors.phone && "border-destructive"
                  )}
                />
              </Field>

              <Field
                label="What is your primary role?"
                required
                error={errors.role}
                htmlFor="role"
              >
                <select
                  id="role"
                  name="role"
                  defaultValue=""
                  className={cn(
                    "flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    errors.role && "border-destructive"
                  )}
                >
                  <option value="">Select your role</option>
                  <option value="landlord">Landlord</option>
                  <option value="agent">Property Agent</option>
                  <option value="manager">Property Manager</option>
                  <option value="investor">Real Estate Investor</option>
                  <option value="other">Other</option>
                </select>
              </Field>

              <Field
                label="How many properties do you manage?"
                required
                error={errors.propertyCount}
                htmlFor="propertyCount"
              >
                <div className="flex items-center gap-4">
                  <input
                    id="propertyCount"
                    name="propertyCount"
                    type="range"
                    min={0}
                    max={100}
                    value={propertyCount}
                    onChange={(e) => setPropertyCount(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--primary))]"
                  />
                  <span className="min-w-[2.5rem] rounded-lg border border-border bg-background px-3 py-1 text-center font-semibold text-primary">
                    {propertyCount}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Slide to select the number of properties (0 if you&apos;re just
                  starting out).
                </p>
              </Field>

              <Field
                label="What tools do you currently use for property management?"
                htmlFor="currentTools"
              >
                <textarea
                  id="currentTools"
                  name="currentTools"
                  rows={2}
                  placeholder="e.g. Spreadsheets, QuickBooks, physical ledgers, other software..."
                  className="flex min-h-[80px] w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </Field>

              <Field
                label="Why do you want to join the LPMS Beta?"
                required
                error={errors.motivation}
                htmlFor="motivation"
              >
                <textarea
                  id="motivation"
                  name="motivation"
                  rows={3}
                  placeholder="Tell us what challenges you're facing and how LPMS could help..."
                  className={cn(
                    "flex min-h-[100px] w-full resize-y rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    errors.motivation && "border-destructive"
                  )}
                />
              </Field>

              <div className="space-y-2">
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    name="terms"
                    className="mt-1 accent-[hsl(var(--primary))]"
                  />
                  <span>
                    I agree to the{" "}
                    <Link
                      href="/beta#terms"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      Beta Program Terms &amp; Conditions
                    </Link>
                    , including the NDA and data privacy policy.{" "}
                    <span className="text-destructive">*</span>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-sm text-destructive">{errors.terms}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full rounded-full font-semibold shadow-[0_0_20px_rgba(39,174,96,0.25)]"
              >
                {submitting ? "Submitting..." : "Submit Application →"}
              </Button>

              {status && (
                <p
                  className={
                    status.type === "success"
                      ? "text-primary"
                      : "text-destructive"
                  }
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer
        showApply={false}
        links={[
          { name: "Home", href: "/" },
          { name: "Beta Program", href: "/beta" },
          { name: "Apply", href: "/beta/apply" },
          { name: "Contact", href: "/#contact" },
        ]}
      />
    </main>
  );
}

function Field({
  label,
  required,
  error,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
