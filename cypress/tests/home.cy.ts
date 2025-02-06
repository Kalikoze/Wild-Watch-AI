import { features } from '@/lib/data/features'
import { processSteps } from '@/lib/data/process-steps'
import { useCases } from '@/lib/data/useCases'
import { faqs } from '@/lib/data/faqs'
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
      cy.get('[data-cy="hero-cta-primary"]')
        .should('have.attr', 'href', '/auth')
        .and('contain.text', 'Get Started Free')

      cy.get('[data-cy="hero-cta-secondary"]')
        .should('have.attr', 'href', '/our-story')
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
            cy.get(`[data-cy="feature-icon-${index}"]`)
              .should('be.visible')
            cy.get(`[data-cy="feature-title-${index}"]`)
              .should('be.visible')
              .and('contain.text', feature.title)
            cy.get(`[data-cy="feature-description-${index}"]`)
              .should('be.visible')
              .and('contain.text', feature.description)

            cy.get(`[data-cy="feature-details-${index}"]`)
              .should('be.visible')
              .within(() => {
                feature.details.forEach((detail, detailIndex) => {
                  cy.get(`[data-cy="feature-detail-${index}-${detailIndex}"]`)
                    .should('be.visible')
                    .and('contain.text', detail)
                })
              })

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

  context('Process Flow Section Tests', () => {
    beforeEach(() => {
      cy.get('[data-cy="process-section"]').scrollIntoView()
    })

    it('should render the process section header correctly', () => {
      cy.get('[data-cy="process-header"]').should('be.visible')
      cy.get('[data-cy="process-title"]')
        .should('be.visible')
        .and('contain.text', 'How It Works')
      cy.get('[data-cy="process-description"]')
        .should('be.visible')
        .and('contain.text', 'Our advanced AI system transforms')
    })

    it('should render all process steps', () => {
      cy.get('[data-cy="process-steps-list"]')
        .should('be.visible')
        .and('have.attr', 'aria-label', 'Process steps')

      cy.get('li[data-cy^="process-step-"]').should('have.length', processSteps.length)
    })

    processSteps.forEach((step, index) => {
      it(`should render process step ${index + 1} (${step.title}) correctly`, () => {
        cy.get(`li[data-cy="process-step-${index}"]`)
          .should('be.visible')
          .within(() => {
            // Check step number
            cy.get(`[data-cy="process-step-number-${index}"]`)
              .should('be.visible')
              .and('contain.text', index + 1)

            // Check icon container and icon
            cy.get(`[data-cy="process-step-icon-container-${index}"]`)
              .should('be.visible')
            cy.get(`[data-cy="process-step-icon-${index}"]`)
              .should('be.visible')

            // Check content
            cy.get(`[data-cy="process-step-title-${index}"]`)
              .should('be.visible')
              .and('contain.text', step.title)
            cy.get(`[data-cy="process-step-description-${index}"]`)
              .should('be.visible')
              .and('contain.text', step.description)
          })
      })
    })
  })

  context('Use Cases Section Tests', () => {
    beforeEach(() => {
      cy.get('[data-cy="use-cases-section"]').scrollIntoView()
    })

    it('should render the use cases section header correctly', () => {
      cy.get('[data-cy="use-cases-header"]').should('be.visible')
      cy.get('[data-cy="use-cases-title"]')
        .should('be.visible')
        .and('contain.text', 'Transforming Animal Care')
      cy.get('[data-cy="use-cases-description"]')
        .should('be.visible')
        .and('contain.text', 'Discover how WildWatch AI empowers')
    })

    it('should render all use cases', () => {
      cy.get('[data-cy="use-cases-list"]').should('be.visible')
      cy.get('[data-cy="use-cases-list"] > li > article[data-cy^="use-case-"]')
        .should('have.length', useCases.length)
    })

    useCases.forEach((useCase, index) => {
      it(`should render use case ${index + 1} (${useCase.title}) correctly`, () => {
        cy.get(`[data-cy="use-cases-list"] > li > article[data-cy="use-case-${index}"]`)
          .should('be.visible')
          .within(() => {
            // Check icon
            cy.get(`[data-cy="use-case-icon-${index}"]`)
              .should('be.visible')

            // Check title and description
            cy.get(`[data-cy="use-case-title-${index}"]`)
              .should('be.visible')
              .and('contain.text', useCase.title)
            cy.get(`[data-cy="use-case-description-${index}"]`)
              .should('be.visible')
              .and('contain.text', useCase.description)

            // Check benefits
            cy.get(`[data-cy="use-case-benefits-${index}"]`)
              .should('be.visible')
              .within(() => {
                useCase.benefits.forEach((benefit, benefitIndex) => {
                  cy.get(`[data-cy="use-case-benefit-${index}-${benefitIndex}"]`)
                    .should('be.visible')
                    .and('contain.text', benefit)
                })
              })
          })
      })
    })
  })

  context('FAQ Section Tests', () => {
    beforeEach(() => {
      cy.get('[data-cy="faq-section"]').scrollIntoView()
    })

    it('should render the FAQ section header correctly', () => {
      cy.get('[data-cy="faq-title"]')
        .should('be.visible')
        .and('contain.text', 'Frequently Asked Questions')
      cy.get('[data-cy="faq-description"]')
        .should('be.visible')
        .and('contain.text', 'Learn more about how WildWatch AI')
    })

    it('should render all FAQ items', () => {
      cy.get('[data-cy^="faq-question-"]').should('have.length', faqs.length)
    })

    faqs.forEach((faq, index) => {
      it(`should render and interact with FAQ item ${index + 1} correctly`, () => {
        cy.get(`[data-cy="faq-question-${index}"]`)
          .should('be.visible')
          .and('contain.text', faq.question)

        // Initially, answer should not be visible
        cy.get(`[data-cy="faq-answer-${index}"]`)
          .should('exist')
          .and('not.be.visible')

        // Click question to expand
        cy.get(`[data-cy="faq-question-${index}"]`).click()

        // Answer should now be visible with correct text
        cy.get(`[data-cy="faq-answer-${index}"]`)
          .should('be.visible')
          .and('contain.text', faq.answer)

        // Click again to collapse
        cy.get(`[data-cy="faq-question-${index}"]`).click()

        // Answer should be hidden again
        cy.get(`[data-cy="faq-answer-${index}"]`)
          .should('exist')
          .and('not.be.visible')
      })
    })

    it('should maintain proper accordion behavior in each column', () => {
      const middleIndex = Math.ceil(faqs.length / 2)

      // Test left column
      cy.get(`[data-cy="faq-question-0"]`).click()
      cy.get(`[data-cy="faq-answer-0"]`).should('be.visible')
      cy.get(`[data-cy="faq-question-1"]`).click()
      cy.get(`[data-cy="faq-answer-0"]`).should('not.be.visible')
      cy.get(`[data-cy="faq-answer-1"]`).should('be.visible')

      // Test right column
      cy.get(`[data-cy="faq-question-${middleIndex}"]`).click()
      cy.get(`[data-cy="faq-answer-${middleIndex}"]`).should('be.visible')
      cy.get(`[data-cy="faq-question-${middleIndex + 1}"]`).click()
      cy.get(`[data-cy="faq-answer-${middleIndex}"]`).should('not.be.visible')
      cy.get(`[data-cy="faq-answer-${middleIndex + 1}"]`).should('be.visible')
    })
  })

  context('Final CTA Section Tests', () => {
    beforeEach(() => {
      cy.get('[data-cy="final-cta-section"]').scrollIntoView()
    })

    it('should render the final CTA section', () => {
      cy.get('[data-cy="final-cta-section"]').should('be.visible')
      cy.get('[data-cy="final-cta-content"]').should('be.visible')
    })

    it('should display the correct title and description', () => {
      cy.get('[data-cy="final-cta-title"]')
        .should('be.visible')
        .and('contain.text', 'Ready to Transform Animal Care?')

      cy.get('[data-cy="final-cta-description"]')
        .should('be.visible')
        .and('contain.text', 'Join the future of wildlife monitoring and research')
    })

    it('should have working CTA buttons with correct links and text', () => {
      cy.get('[data-cy="final-cta-buttons"]').within(() => {
        cy.get('[data-cy="final-cta-demo-button"]')
          .should('be.visible')
          .and('have.attr', 'href', '/contact')
          .and('contain.text', 'Schedule Demo')

        cy.get('[data-cy="final-cta-learn-more-button"]')
          .should('be.visible')
          .and('have.attr', 'href', '/our-story')
          .and('contain.text', 'Learn More')
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

        it('should render features section correctly', () => {
          cy.get('[data-cy="features-section"]').scrollIntoView()
          cy.get('[data-cy="features-header"]').should('be.visible')
          cy.get('[data-cy="features-list"]').should('be.visible')
          features.forEach((_, index) => {
            cy.get(`[data-cy="feature-row-${index}"]`).scrollIntoView().should('be.visible')
          });
        });

        it('should render process flow section correctly', () => {
          cy.get('[data-cy="process-section"]').scrollIntoView()
          cy.get('[data-cy="process-header"]').should('be.visible')
          cy.get('[data-cy="process-steps-list"]').should('be.visible')
          processSteps.forEach((_, index) => {
            cy.get(`[data-cy="process-step-${index}"]`).should('be.visible')
          });
        });

        it('should render use cases section correctly', () => {
          cy.get('[data-cy="use-cases-section"]').scrollIntoView()
          cy.get('[data-cy="use-cases-header"]').should('be.visible')
          cy.get('[data-cy="use-cases-list"]').should('be.visible')
          useCases.forEach((_, index) => {
            cy.get(`[data-cy="use-case-${index}"]`).scrollIntoView().should('be.visible')
          });
        });

        it('should render FAQ section correctly', () => {
          cy.get('[data-cy="faq-section"]').scrollIntoView()
          cy.get('[data-cy="faq-title"]').should('be.visible')
          cy.get('[data-cy="faq-description"]').should('be.visible')
          faqs.forEach((_, index) => {
            cy.get(`[data-cy="faq-question-${index}"]`).scrollIntoView().should('be.visible')
          });
        });

        it('should render final CTA section correctly', () => {
          cy.get('[data-cy="final-cta-section"]').scrollIntoView()
          cy.get('[data-cy="final-cta-title"]').should('be.visible')
          cy.get('[data-cy="final-cta-description"]').should('be.visible')
        });
      });
    });
  });
});
