import { AIChat } from "@/components/sections/ai-chat"
import { ChallengeSolution } from "@/components/sections/challenge-solution"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import React from "react"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ChallengeSolution />
      <AIChat />
      <Contact />
    </>
  )
}
