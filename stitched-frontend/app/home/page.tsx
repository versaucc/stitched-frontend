'use client';

import InvisibleNavbar from '../../components/InvisibleNavbar';
import MatrixRain from '../../components/matrix-rain-enhanced'

export default function HomePage() {
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