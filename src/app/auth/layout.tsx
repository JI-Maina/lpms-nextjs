export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const date = new Date().getFullYear();

  return (
    <div className="relative h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
        <span className="text-sm text-muted-foreground flex justify-center items-center">
          Copyright @{date} Liber Agency, All rights reserved
        </span>
      </div>
    </div>
  );
}
