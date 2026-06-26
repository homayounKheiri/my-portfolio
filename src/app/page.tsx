import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { ChallengeSolution } from "@/components/sections/challenge-solution";
import { AIChat } from "@/components/sections/ai-chat";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Section colorize: white → black → white → black → white */}
        <Hero />
        <Projects />
        <ChallengeSolution />
        <AIChat />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
