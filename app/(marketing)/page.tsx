import Hero from '@/app/components/Hero'
import Features from '@/app/components/features/Features'
import ProcessFlow from '@/app/components/process-flow/ProcessFlow'
import UseCases from '@/app/components/use-cases/UseCases'
import FAQ from '@/app/components/faq/FAQ'
import FinalCTA from '@/app/components/FinalCTA'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-primary pt-16">
      <Hero />
      <Features />
      <ProcessFlow />
      <UseCases />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
