import BackgroundEffects from '@/app/components/common/BackgroundEffects';

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen bg-primary">
      <BackgroundEffects color="green" />
      
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <article className="rounded-2xl bg-primary-light/50 backdrop-blur-sm border border-neutral-light/10 p-8 lg:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-light mb-8">
            Privacy <span className="text-accent-green">Policy</span>
          </h1>
          
          <div className="prose prose-invert">
            <p className="text-xl text-neutral-light/80 leading-relaxed">
              Privacy Policy for WildWatch AI - Coming Soon
            </p>
            
            <p className="text-neutral-light/60 mt-4">
              We are currently drafting our comprehensive privacy policy to ensure transparency 
              about how we handle your data. Check back soon for detailed information about our 
              data collection practices, user rights, and privacy protection measures.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}