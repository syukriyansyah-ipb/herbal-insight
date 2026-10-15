export const dynamic = 'force-dynamic';
import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "HerbalInsight",
  description: "Herbal Database Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}