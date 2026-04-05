import React from 'react';
import Hero from './Components/Hero/Hero';
import Projects from './Components/Projects/Projects';
import Sidebar from './Components/Sidebar/Sidebar';

export default function EnLandingPage() {
  return (
    <div className="flex flex-col">
      {/* <Sidebar /> */}

      <Hero />

      <Projects />
    </div>
  );
}
