import Hero from './components/Hero'
import Features from './components/Features'
import ProcessFlow from './components/ProcessFlow'
import UseCases from './components/UseCases'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-primary">
      <Hero />
      <Features />
      <ProcessFlow />
      <UseCases />
    </main>
  );
}
