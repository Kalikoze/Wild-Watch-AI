import { features } from '@/lib/data/features';
import FeatureRow from '@/app/(marketing)/components/features/FeatureRow';
import FeatureHeader from '@/app/(marketing)/components/features/FeatureHeader';
import BackgroundEffects from '@/app/components/common/BackgroundEffects';
export default function Features() {
  return (
    <section className="relative py-32 overflow-hidden" data-cy="features-section">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light to-primary" />

      <BackgroundEffects color="green" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeatureHeader />

        <ul className="space-y-20" role="list" data-cy="features-list">
          {features.map((feature, index) => (
            <li key={index} data-cy={`feature-item-${index}`}>
              <FeatureRow
                {...feature}
                imagePosition={index % 2 === 0 ? 'right' : 'left'}
                index={index}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
} 