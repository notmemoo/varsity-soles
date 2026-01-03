import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  FeaturedSection,
  ServicesSection,
  RestorationsGallery,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedSection />
        <ServicesSection />
        <RestorationsGallery />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
