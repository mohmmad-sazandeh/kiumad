import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Features from "./components/Features";
import Header from "./components/Header";

export default function About() {
  return (
    <div className="" dir="rtl">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <Header />
        <AboutSection />
        <Features />
        <ContactSection />
      </div>
    </div>
  );
}
