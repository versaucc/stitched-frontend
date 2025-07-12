"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminInventoryPage() {
  const pathname = usePathname();

  const navItems = [
    { label: "Edit", href: "/admin/inventory/edit" },
    { label: "Search", href: "/admin/inventory/search" },
    { label: "Analytics", href: "/admin/inventory/analytics" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex gap-6">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`text-lg font-medium hover:underline ${pathname === href ? "text-black" : "text-gray-500"}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <main className="p-6">
        <p className="text-gray-500">Select an option above to manage inventory.</p>
      </main>
    </div>
  );
}
