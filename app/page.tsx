import Hero from './components/Hero'
import Features from './components/Features'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-primary">
      <Hero />
      <Features />
      {/* Other sections will go here */}
    </main>
  );
}
