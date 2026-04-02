import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import ServicesCarousel from "@/components/ServicesCarousel";
import Testimonials from "@/components/Testimonials";
import WhyCleanFantics from "@/components/WhyCleanFantics";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <div className="first-visit-reveal" style={{ animationDelay: "0.04s" }}>
          <Hero />
        </div>
        <div className="first-visit-reveal" style={{ animationDelay: "0.2s" }}>
          <ServicesCarousel />
        </div>
        <div className="first-visit-reveal" style={{ animationDelay: "0.28s" }}>
          <HowItWorks />
        </div>
        <div className="first-visit-reveal" style={{ animationDelay: "0.36s" }}>
          <WhyCleanFantics />
        </div>
        <div className="first-visit-reveal" style={{ animationDelay: "0.44s" }}>
          <Testimonials />
        </div>
        <div className="first-visit-reveal" style={{ animationDelay: "0.52s" }}>
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
