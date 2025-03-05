import Hero from '@/app/(marketing)/components/Hero'
import Features from '@/app/(marketing)/components/features/Features'
import ProcessFlow from '@/app/(marketing)/components/process-flow/ProcessFlow'
import UseCases from '@/app/(marketing)/components/use-cases/UseCases'
import FAQ from '@/app/(marketing)/components/faq/FAQ'
import FinalCTA from '@/app/(marketing)/components/FinalCTA'

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
