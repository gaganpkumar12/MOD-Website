import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
// import AppDownload from "@/components/AppDownload";
import ServicesCarousel from "@/components/ServicesCarousel";
import Testimonials from "@/components/Testimonials";
import WhyCleanFanatics from "@/components/WhyCleanFanatics";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://cleanfanatics.com/#website",
      url: "https://cleanfanatics.com/",
      name: "Clean Fanatics",
      description:
        "Clean Fanatics connects you with verified home cleaning professionals in minutes.",
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": "https://cleanfanatics.com/#organization",
      name: "Clean Fanatics",
      url: "https://cleanfanatics.com/",
      logo: "https://cleanfanatics.com/CF%20LOGO%20WITHOUT%20TEXT.png",
      sameAs: [],
    },
    {
      "@type": "Service",
      "@id": "https://cleanfanatics.com/#service",
      name: "Home Cleaning Services",
      serviceType: "Home cleaning",
      provider: {
        "@id": "https://cleanfanatics.com/#organization",
      },
      areaServed: ["Delhi NCR", "Bengaluru", "Mumbai", "Hyderabad", "Chennai"],
      description:
        "Book verified home cleaning professionals for on-demand, scheduled, or recurring cleaning help.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
          <WhyCleanFanatics />
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
