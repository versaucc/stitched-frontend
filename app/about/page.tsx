'use client';

import InvisibleNavbar from '../../components/navbar/InvisibleNavbar';
import MatrixRain from '../../components/backgrounds/matrix-rain-enhanced'

export default function About() {
  return (
    <>
      <InvisibleNavbar />
      <MatrixRain></MatrixRain>
      <main className="min-h-screen bg-black text-white">
        {/* Gallery content here */}
      </main>
    </>
  );
}