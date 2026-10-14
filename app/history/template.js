import { Header, Footer } from "@/components";

export default function Template({ children }) {
  return (
    <div className="bg-gray-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
