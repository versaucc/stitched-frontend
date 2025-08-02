// app/page.tsx
import MinimalNavbar from '../components/navbar/MinimalNavbar'
import VectorAnimation from '../components/backgrounds/VectorAnimation'

import '../styles/homepage.css' 

export default function HomePage() {
  return (
    <div className="homepage-root">

      <VectorAnimation/>

      {/* navbar */}
      <nav className="homepage-navbar">
        <MinimalNavbar />
      </nav>

      {/* content: input + menu */}
      <main className="homepage-main">
        {/* email box */}
        <input
          className="homepage-input"
          type="text"
          placeholder="Enter your email…"
        />

        {/* menu directly under input */}
        <nav className="homepage-menu">
          <a href="./lookbook">Lookbook</a>
          <a href="./account">Account</a>
        </nav>
      </main>
    </div>
  )
}
