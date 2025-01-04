import Hero from '@/app/components/Hero'
import Features from '@/app/components/Features'
import ProcessFlow from '@/app/components/ProcessFlow'
import UseCases from '@/app/components/UseCases'
import FAQ from '@/app/components/FAQ'
import FinalCTA from '@/app/components/FinalCTA'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-primary">
      <Hero />
      <Features />
      <ProcessFlow />
      <UseCases />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
