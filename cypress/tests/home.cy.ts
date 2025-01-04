import { features } from '@/lib/data/features'

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('Hero Section Tests', () => {
    it('should render the hero section', () => {
      cy.get('[data-cy="hero-section"]').should('be.visible')
    })

    it('should display the correct brand name', () => {
      cy.get('[data-cy="hero-brand"]')
        .should('be.visible')
        .and('contain.text', 'WildWatch AI')
    })

    it('should display the main title', () => {
      cy.get('[data-cy="hero-title"]')
        .should('be.visible')
        .and('contain.text', 'Intelligent Wildlife Monitoring with AI')
    })

    it('should display the description', () => {
      cy.get('[data-cy="hero-description"]')
        .should('be.visible')
        .and('contain.text', 'Empowering zoos, sanctuaries, and educators')
    })

    it('should have working CTA buttons with correct links', () => {
      // Check primary CTA
      cy.get('[data-cy="hero-cta-primary"]')
        .should('have.attr', 'href', '/dashboard')
        .and('contain.text', 'Get Started')

      // Check secondary CTA
      cy.get('[data-cy="hero-cta-secondary"]')
        .should('have.attr', 'href', '/about')
        .and('contain.text', 'Learn More')
    })
  })

  context('Features Section Tests', () => {
    beforeEach(() => {
      cy.get('[data-cy="features-section"]').scrollIntoView()
    })

    it('should render the features section', () => {
      cy.get('[data-cy="features-section"]').should('be.visible')
    })

    it('should render the features header correctly', () => {
      cy.get('[data-cy="features-header"]').scrollIntoView().should('be.visible')
      cy.get('[data-cy="features-title"]')
        .should('be.visible')
        .and('contain.text', 'Streamlined Animal Monitoring')
      cy.get('[data-cy="features-description"]')
        .should('be.visible')
        .and('contain.text', 'Focus on what matters most')
    })

    it('should render all feature items', () => {
      cy.get('[data-cy="features-list"]').should('be.visible')
      cy.get('[data-cy^="feature-item-"]').should('have.length', features.length)
    })

    features.forEach((feature, index) => {
      it(`should render feature ${index + 1} (${feature.title}) correctly`, () => {
        cy.get(`[data-cy="feature-row-${index}"]`).scrollIntoView()
          .should('be.visible')
          .within(() => {
            // Check icon
            cy.get(`[data-cy="feature-icon-${index}"]`)
              .should('be.visible')

            // Check title
            cy.get(`[data-cy="feature-title-${index}"]`)
              .should('be.visible')
              .and('contain.text', feature.title)

            // Check description
            cy.get(`[data-cy="feature-description-${index}"]`)
              .should('be.visible')
              .and('contain.text', feature.description)

            // Check all details
            cy.get(`[data-cy="feature-details-${index}"]`)
              .should('be.visible')
              .within(() => {
                feature.details.forEach((detail, detailIndex) => {
                  cy.get(`[data-cy="feature-detail-${index}-${detailIndex}"]`)
                    .should('be.visible')
                    .and('contain.text', detail)
                })
              })

            // Check image
            cy.get(`[data-cy="feature-image-${index}"]`)
              .should('be.visible')
          })

        // Check image position based on index
        if (index % 2 === 1) { // Odd indexes have left image position
          cy.get(`[data-cy="feature-image-${index}"]`)
            .should('have.class', 'lg:order-1')
        } else { // Even indexes have right image position
          cy.get(`[data-cy="feature-image-${index}"]`)
            .should('not.have.class', 'lg:order-1')
        }
      })
    })
  })

  context('Accessibility Tests', () => {
    beforeEach(() => {
      cy.injectAxe()
    })

    it('should pass accessibility tests', () => {
      cy.checkA11y()
    })
  })

  context('Responsive Design', () => {
    const viewports = ['iphone-6', 'iphone-x', 'samsung-s10', 'samsung-note9'] as const;

    viewports.forEach(viewport => {
      context(`Tests for ${viewport}`, () => {
        beforeEach(() => {
          cy.viewport(viewport);
          cy.visit('/');
          cy.injectAxe();
        });

        it('should pass accessibility checks', () => {
          cy.checkA11y();
        });
      });
    });
  });
});
