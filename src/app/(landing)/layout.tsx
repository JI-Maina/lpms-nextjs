export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark min-h-screen scroll-smooth bg-[#0b0b0b] text-foreground">
      {children}
    </div>
  );
}
