import Link from "next/link";

import { navigation } from "./constants";

type FooterProps = {
  links?: { name: string; href: string }[];
  showApply?: boolean;
};

const Footer = ({ links = navigation, showApply = true }: FooterProps) => {
  return (
    <footer className="mt-8 border-t border-border py-10 text-center text-muted-foreground">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="mb-4 text-2xl font-extrabold text-foreground">
          LP<span className="text-primary">MS</span>
        </div>
        <p className="mb-3 text-sm">
          {links.map((item, index) => (
            <span key={`${item.name}-${item.href}`}>
              {index > 0 && " · "}
              <Link href={item.href} className="text-primary hover:underline">
                {item.name}
              </Link>
            </span>
          ))}
          {showApply && (
            <>
              {" · "}
              <Link href="/beta/apply" className="text-primary hover:underline">
                Apply Now
              </Link>
            </>
          )}
        </p>
        <p>
          &copy; 2026 <strong className="text-foreground">LPMS</strong> – Liber
          Property Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
