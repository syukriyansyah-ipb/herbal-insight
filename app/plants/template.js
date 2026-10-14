import { Header, Footer } from "@/components";

export default function Template({ children }) {
  return (
    <div className="bg-gray-100 relative">
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
