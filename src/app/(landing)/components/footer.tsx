import Link from "next/link";

import { navigation } from "./constants";

const Footer = () => {
  return (
    <footer className="mt-8 border-t border-border px-6 py-8 text-center text-muted-foreground sm:px-10 lg:px-16">
      <p>
        &copy; 2026 <strong className="text-foreground">LPMS</strong> – Liber
        Property Management System. All rights reserved.
      </p>
      <p className="mt-2 text-sm">
        {navigation.map((item, index) => (
          <span key={item.name}>
            {index > 0 && " · "}
            <Link href={item.href} className="text-primary hover:underline">
              {item.name}
            </Link>
          </span>
        ))}
      </p>
    </footer>
  );
};

export default Footer;
