describe('Auth Page', () => {
  beforeEach(() => {
    cy.visit('/auth')
  })

  context('Page Rendering', () => {
    it('should render the auth section correctly', () => {
      cy.get('[data-cy="auth-section"]').should('be.visible')
      cy.get('[data-cy="auth-header"]').should('be.visible')
      cy.get('[data-cy="auth-title"]').should('contain.text', 'Welcome to WildWatch AI')
      cy.get('[data-cy="auth-subtitle"]').should('contain.text', 'For wildlife professionals and sanctuary staff')
    })

    it('should render the email form correctly', () => {
      cy.get('[data-cy="auth-email-form"]').should('be.visible')
      cy.get('[data-cy="auth-email-input"]')
        .should('be.visible')
        .and('have.attr', 'placeholder', 'name@organization.com')
      cy.get('[data-cy="auth-email-submit"]')
        .should('be.visible')
        .and('contain.text', 'Continue with Email')
    })

    it('should render OAuth buttons correctly', () => {
      cy.get('[data-cy="auth-oauth-buttons"]').should('be.visible')
      cy.get('[data-cy="auth-google-button"]')
        .should('be.visible')
        .and('contain.text', 'Google')
      cy.get('[data-cy="auth-microsoft-button"]')
        .should('be.visible')
        .and('contain.text', 'Microsoft')
    })
  })

  context('Email Authentication', () => {
    it('should handle successful magic link submission', () => {
      cy.intercept('POST', '**/auth/v1/otp**', {
        statusCode: 200,
        body: { success: true }
      }).as('magicLink')

      const testEmail = 'test@wildlife.org'
      cy.get('[data-cy="auth-email-input"]').type(testEmail)
      cy.get('[data-cy="auth-email-submit"]').click()

      cy.wait('@magicLink')
      cy.get('[role="status"]').should('contain.text', 'Check your email for the magic link!')
    })

    it('should handle invalid email submission', () => {
      cy.intercept('POST', '**/auth/v1/otp**', {
        statusCode: 400,
        body: { error: 'Invalid email' }
      }).as('invalidEmail')

      const invalidEmail = 'invalid@email'
      cy.get('[data-cy="auth-email-input"]').type(invalidEmail)
      cy.get('[data-cy="auth-email-submit"]').click()

      cy.wait('@invalidEmail')
      cy.get('[role="status"]').should('contain.text', 'Failed to send magic link')
    })

    it('should show loading state during submission', () => {
      cy.intercept('POST', '**/auth/v1/otp**', {
        delay: 1000,
        statusCode: 200,
        body: { success: true }
      }).as('slowMagicLink')

      cy.get('[data-cy="auth-email-input"]').type('test@wildlife.org')
      cy.get('[data-cy="auth-email-submit"]').click()

      // Check loading state immediately after click
      cy.get('[data-cy="auth-email-submit"]')
        .should('be.disabled')
        .and('contain.text', 'Sending...')

      // Wait for the request to complete
      cy.wait('@slowMagicLink')

      // Verify button returns to normal state - split into separate assertions
      cy.get('[data-cy="auth-email-submit"]').should('not.be.disabled')
      cy.get('[data-cy="auth-email-submit"]').should('contain.text', 'Continue with Email')
    })
  })

  context('OAuth Authentication', () => {
    it('should configure Google OAuth button correctly', () => {
      cy.get('[data-cy="auth-google-button"]')
        .should('be.visible')
        .and('contain.text', 'Google')
    })

    it('should configure Microsoft OAuth button correctly', () => {
      cy.get('[data-cy="auth-microsoft-button"]')
        .should('be.visible')
        .and('contain.text', 'Microsoft')
    })
  })

  context('Accessibility Tests', () => {
    beforeEach(() => {
      cy.injectAxe()
      cy.wait(500);
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
          cy.viewport(viewport)
          cy.visit('/auth')
          cy.injectAxe()
          cy.wait(500)
        })

        it('should pass accessibility checks', () => {
          cy.checkA11y()
        });

        it('should render auth section correctly', () => {
          cy.get('[data-cy="auth-section"]').should('be.visible')
          cy.get('[data-cy="auth-header"]').should('be.visible')
          cy.get('[data-cy="auth-title"]').should('be.visible')
          cy.get('[data-cy="auth-subtitle"]').should('be.visible')
        });

        it('should render auth forms correctly', () => {
          cy.get('[data-cy="auth-email-form"]').should('be.visible')
          cy.get('[data-cy="auth-email-input"]').should('be.visible')
          cy.get('[data-cy="auth-email-submit"]').should('be.visible')
        });

        it('should render OAuth buttons correctly', () => {
          cy.get('[data-cy="auth-oauth-buttons"]').should('be.visible')
          cy.get('[data-cy="auth-google-button"]').should('be.visible')
          cy.get('[data-cy="auth-microsoft-button"]').should('be.visible')
        });
      });
    });
  })
})
