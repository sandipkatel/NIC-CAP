import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "NIC College Ambassador Program",
  description:
    "National Innovation Centre, Nepal — College Ambassador Program. Apply, connect, and lead innovation on your campus.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Simple <link> tag instead of next/font — avoids a build-time
            network fetch and keeps the font loading setup easy to follow. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
