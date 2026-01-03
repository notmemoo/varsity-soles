import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  FeaturedSection,
  ServicesSection,
  GallerySection,
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
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
