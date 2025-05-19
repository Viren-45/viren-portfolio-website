import HomeSection from "@/components/sections/home-section";
import AboutSection from "@/components/sections/about-section";
import FeaturedProjectsSection from "@/components/sections/featured-projects-section";
import CertificationSectionServer from "@/components/sections/certification-section-server";
import ContactSection from "@/components/sections/contact-section";

export default function Home() {
    return (
        <div>
            <HomeSection />
            <AboutSection />
            <FeaturedProjectsSection />
            <CertificationSectionServer />
            <ContactSection />
        </div>
    )
}