export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="">{children}</div>
      <p>@2023 Libre Property Management System</p>
    </div>
  );
}
