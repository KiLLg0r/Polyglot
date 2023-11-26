"use client";

import "./globals.css";
import "./blog.css";

import Navigation from "@components/Navigation/navigation";
import { usePathname } from "next/navigation";
import AuthProvider from "@components/AuthProvider/authProvider";

export default function RootLayout({ children, modal }) {
  const currentPath = usePathname();

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="wrapper">
            {currentPath === "/" || currentPath.includes("/blog") ? (
              <Navigation />
            ) : null}
            {currentPath.includes("dashboard") ? (
              children
            ) : (
              <div className="container">
                {children}
                {modal}
              </div>
            )}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
