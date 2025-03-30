import Header from "@/components/header";
import Footer from "@/components/footer";

interface IProductLayoutProps {
  children: React.ReactNode;
}

export default function ProductLayout({ children }: IProductLayoutProps) {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />

      <main className="container mx-auto pt-16 pb-16 px-6 flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
