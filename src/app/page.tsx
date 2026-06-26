import { AnimatedBackground } from "@/components/sections/animated-background";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { AIChat } from "@/components/sections/ai-chat";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Header />
      <main className="flex-1">
        <Hero />
        <Projects />
        <TechStack />
        <AIChat />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
