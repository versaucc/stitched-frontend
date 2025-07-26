// app/page.tsx
import MatrixRain from '../components/backgrounds/MatrixRain'
import MinimalNavbar from '../components/navbar/MinimalNavbar'
import SilhouetteAnimation from '../components/backgrounds/SilhouetteAnimation'

export default function LandingPage() {
  return (
    <div
      className="
        relative w-full min-h-screen
        bg-black text-white
        flex flex-col items-center
      "
    >
    <div
      className="
        fixed              /* take it out of the flow and pin it */
        top-0 left-[-15%]       /* to the very top-left */
        h-full          /* full viewport height */
        w-auto             /* width auto (we let the SVG size itself) */
        overflow-hidden    /* chop off anything that sticks out */
        clip-path-[polygon(0_0,75%_0,100%_100%,0_100%)] 
        bg-black
        z-0
      "
    >
      <SilhouetteAnimation
      />
    </div>


      {/* navbar */}
      <nav className="relative z-10 w-full">
        <MinimalNavbar />
      </nav>

      {/* content: input + menu */}
      <main className="relative z-10 flex flex-col items-center mt-[30vh] gap-6">
        {/* email box */}
        <input
          type="text"
          placeholder="Enter your email…"
          className="
            w-[15vw]        /* 15% of viewport width */
            max-w-xs        /* caps at small screens */
            h-10            /* 2.5rem */
            px-4            /* 1rem padding */
            text-white
            bg-black
            border border-[rgba(255, 0, 0, 0.5)]
            rounded-md
            focus:border-cyan-400 focus:outline-none
            transition-colors duration-200
          "
        />

        {/* menu directly under input */}
        <nav
          className="
            bg-black
            border-2 border-[rgba(255, 255, 255, 0.81)]
            text-white
            h-[40vh] w-[15vw]
            flex flex-col items-center justify-evenly
          "
        >
          <a href="./shop"        className="hover:underline">Shop</a>
          <a href="./lookbook"     className="hover:underline">Lookbook</a>
          <a href="./shop/custom"    className="hover:underline">Custom Denim</a>
          <a href="./" className="hover:underline">Locations</a>
          <a href="./account"     className="hover:underline">Account</a>
          <a href="./"     className="hover:underline">Contact</a>
        </nav>
      </main>
    </div>
  )
}
