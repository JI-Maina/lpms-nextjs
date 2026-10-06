import Link from "next/link";

import { Button } from "@/components/ui/button";

import Footer from "../components/footer";
import Header from "../components/header";
import { betaNav } from "../components/constants";

const whoShouldApply = [
  {
    label: "Landlords",
    text: "Managing 5+ units and tired of spreadsheets.",
  },
  {
    label: "Property Agents",
    text: "Handling portfolios for multiple clients.",
  },
  {
    label: "Property Managers",
    text: "Overseeing day‑to‑day operations, maintenance, and tenant relations.",
  },
  {
    label: "Real Estate Investors",
    text: "Scaling portfolios and needing better financial oversight.",
  },
];

const responsibilities = [
  {
    label: "Active Usage:",
    text: "Use LPMS for your core property management tasks at least weekly.",
  },
  {
    label: "Constructive Feedback:",
    text: "Share what works, what doesn't, and what's missing via our dedicated feedback channel.",
  },
  {
    label: "Bug Reporting:",
    text: "Report any issues you encounter with clear steps to reproduce.",
  },
  {
    label: "Confidentiality:",
    text: "Keep all platform features, pricing, and unreleased functionality confidential.",
  },
  {
    label: "Community Participation:",
    text: "Join monthly check‑in calls (optional) to discuss your experience.",
  },
];

const terms = [
  {
    icon: "🔒",
    title: "Data Privacy",
    text: "Your property and tenant data are yours. We will never share or sell your data. All data is encrypted and stored securely.",
  },
  {
    icon: "📅",
    title: "Free Access",
    text: "Beta participants retain free access to the platform for 12 months after the official public launch. After that, you'll receive a 40% lifetime discount.",
  },
  {
    icon: "🛑",
    title: "No Obligation",
    text: "You can opt‑out of the beta at any time. Your data will be exported and provided to you upon request.",
  },
  {
    icon: "📢",
    title: "NDA & Feedback",
    text: "You agree not to publicly share unreleased features or screenshots. All feedback becomes the property of LPMS to improve the product.",
  },
];

export default function BetaInfoPage() {
  return (
    <main>
      <Header
        links={betaNav}
        ctaHref="/beta/apply"
        ctaLabel="Apply Now →"
        activeHref="/beta"
      />

      <section className="px-6 pb-8 pt-12 text-center">
        <div className="mx-auto max-w-[1120px]">
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            🚀 LPMS <span className="text-primary">Beta Program</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Be a founding partner in shaping the future of property management in
            Kenya.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 pt-4">
        <div className="mx-auto max-w-[1120px] space-y-8">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-xl shadow-black/30 md:p-10">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              What is the <span className="text-primary">Beta Program</span>?
            </h2>
            <p className="mb-6 text-muted-foreground">
              The LPMS Beta is an exclusive, limited‑access program for property
              professionals who want to get early access to our platform and
              directly influence its development. As a beta tester, you&apos;ll
              use the system in your real‑world operations and provide critical
              feedback that shapes the final product.
            </p>
            <h3 className="mb-3 text-xl font-semibold text-primary">
              🎯 Who should apply?
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              {whoShouldApply.map((item) => (
                <li key={item.label}>
                  <strong className="text-foreground">{item.label}</strong> –{" "}
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-xl shadow-black/30 md:p-10">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Your <span className="text-primary">Role</span> &amp; Responsibilities
            </h2>
            <p className="mb-4 text-muted-foreground">
              As a beta tester, you&apos;re not just a user – you&apos;re a
              co‑creator. We expect:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              {responsibilities.map((item) => (
                <li key={item.label}>
                  <strong className="text-foreground">{item.label}</strong>{" "}
                  {item.text}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-primary">
              ✅ In return, you get <strong>free access</strong> to LPMS forever,
              plus direct access to our founding team.
            </p>
          </div>

          <div
            id="terms"
            className="rounded-2xl border border-border bg-card p-8 shadow-xl shadow-black/30 md:p-10"
          >
            <h2 className="mb-6 text-3xl font-bold text-foreground">
              Terms &amp; <span className="text-primary">Conditions</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {terms.map((term) => (
                <div
                  key={term.title}
                  className="rounded-xl border border-border bg-background/60 p-5"
                >
                  <h4 className="mb-2 font-semibold text-foreground">
                    {term.icon} {term.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{term.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              By applying, you agree to these terms. Full legal agreement will be
              provided upon acceptance.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              Ready to <span className="text-primary">shape</span> the future?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Apply now – we&apos;re looking for 20 dedicated beta testers to
              start in April 2026.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 text-lg font-semibold shadow-[0_0_20px_rgba(39,174,96,0.25)]"
            >
              <Link href="/beta/apply">Apply Now →</Link>
            </Button>
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
