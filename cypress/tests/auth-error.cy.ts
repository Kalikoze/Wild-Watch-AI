describe('Auth Error Page', () => {
  context('Content Tests', () => {
    it('should display expired link message and components', () => {
      cy.visit('/auth/auth-error', {
        headers: {
          'x-auth-error-type': 'expired'
        }
      })

      cy.get('[data-cy="auth-error-container"]').should('be.visible')
      cy.get('[data-cy="auth-error-content"]').should('be.visible')
      cy.get('[data-cy="auth-error-icon"]').should('be.visible')
      cy.get('[data-cy="auth-error-title"]')
        .should('be.visible')
        .and('contain.text', 'Authentication Error')
      cy.get('[data-cy="auth-error-message"]')
        .should('be.visible')
        .and('contain.text', 'This login link has expired or has already been used. Please request a new one.')
      cy.get('[data-cy="auth-error-back-button"]')
        .should('be.visible')
        .and('contain.text', 'Back to Sign Up')
        .and('have.attr', 'href', '/auth')
    })

    it('should display invalid link message', () => {
      cy.visit('/auth/auth-error', {
        headers: {
          'x-auth-error-type': 'invalid'
        }
      })
      cy.get('[data-cy="auth-error-message"]')
        .should('contain.text', 'Invalid login link. Please request a new one.')
    })

    it('should display default error message', () => {
      cy.visit('/auth/auth-error')
      cy.get('[data-cy="auth-error-message"]')
        .should('contain.text', 'There was a problem verifying your authentication. Please try signing in again.')
    })
  })

  context('Navigation Tests', () => {
    beforeEach(() => {
      cy.visit('/auth/auth-error')
    })

    it('should have correct link on back button', () => {
      cy.get('[data-cy="auth-error-back-button"]')
        .should('be.visible')
        .and('have.attr', 'href', '/auth')
        .and('contain.text', 'Back to Sign Up')
    })
  })

  context('Accessibility Tests', () => {
    beforeEach(() => {
      cy.visit('/auth/auth-error')
      cy.injectAxe()
      cy.wait(500)
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
          cy.visit('/auth/auth-error')
          cy.injectAxe()
          cy.wait(500)
        })

        it('should pass accessibility checks', () => {
          cy.checkA11y()
        })

        it('should render error content correctly', () => {
          cy.get('[data-cy="auth-error-container"]').should('be.visible')
          cy.get('[data-cy="auth-error-content"]').should('be.visible')
          cy.get('[data-cy="auth-error-icon"]').should('be.visible')
          cy.get('[data-cy="auth-error-title"]').should('be.visible')
          cy.get('[data-cy="auth-error-message"]').should('be.visible')
          cy.get('[data-cy="auth-error-back-button"]').should('be.visible')
        })
      })
    })
  })
}) 