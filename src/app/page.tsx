"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { ChallengeSolution } from "@/components/sections/challenge-solution";
import { AIChat } from "@/components/sections/ai-chat";
import { Contact } from "@/components/sections/contact";
import { ContinuousCursorGlow } from "@/components/sections/continuous-cursor-glow";

type View = "home" | "projects";

export default function Home() {
  const [view, setView] = useState<View>("home");

  // Scroll to top whenever the view changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [view]);

  return (
    <>
      {/* Cursor glow — only in Hero + Why Automation, seamless across their boundary */}
      <ContinuousCursorGlow sectionIds={["hero", "flow"]} />
      <Header view={view} onViewChange={setView} />
      <main className="flex-1">
        {view === "home" ? (
          <>
            <Hero onViewProjects={() => setView("projects")} />
            <ChallengeSolution />
            <AIChat />
            <Contact />
          </>
        ) : (
          <div className="pt-20">
            <Projects />
          </div>
        )}
      </main>
    </>
  );
}
