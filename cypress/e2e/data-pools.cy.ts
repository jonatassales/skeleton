describe('Data Pools Page', () => {
  beforeEach(() => {
    cy.login('propel+development@propeldata.com', 'rfd=>dc23kT#}KznQPwfjx')
    cy.visit('/data-pools')
  })

  it('displays data pools page with loading state', () => {
    cy.get('h1').contains('Data Pools')
    cy.get('button').contains('Create').should('be.visible')

    cy.get('nav[aria-label="breadcrumb"]')
      .first()
      .within(() => {
        cy.get('li').should('have.length', 2)
        cy.get('li').contains('Account')
        cy.get('li').contains('Data Pools')
      })
  })

  // it('renders the Data Pools page title correctly', () => {
  //   cy.get('nav').within(() => {
  //     cy.get('h1').contains('Data Pools')
  //   })
  // })

  // it('renders the breadcrumb navigation correctly', () => {
  //   cy.get('nav').within(() => {
  //     cy.get('Breadcrumb').should('exist')
  //     cy.get('BreadcrumbItem').should('have.length', 2)
  //   })
  // })

  // it('renders the breadcrumb navigation correctly', () => {
  //   cy.get('nav').within(() => {
  //     cy.get('Breadcrumb').should('exist')
  //     cy.get('BreadcrumbItem').should('have.length', 2)
  //   })
  // })

  // it('renders the table headers correctly', () => {
  //   cy.get('TableHeaderRow').within(() => {
  //     const headers = ['Unique Name', 'Status', 'Table Name', 'Records', 'Storage', 'Sync Activity']
  //     headers.forEach((header) => {
  //       cy.contains(header).should('exist')
  //     })
  //   })
  // })
  // it('renders at least one row of data in the table', () => {
  //   cy.get('TableBody').find('TableRow').its('length').should('be.gte', 1)
  // })

  // it('renders the pagination controls correctly', () => {
  //   cy.get('PaginationControls').should('exist')
  //   cy.get('PaginationButton').should('have.length', 4)
  //   cy.get('PaginationInfo').should('exist')
  //   cy.get('PageSizeSelector').should('exist')
  // })

  // it('loads the next page when clicking the next page button', () => {
  //   cy.get('PaginationButton').eq(2).click()
  //   cy.get('PaginationInfo strong').should(($strong) => {
  //     const text = $strong.text()
  //     expect(text).to.match(/Page 2 of \d+/)
  //   })
  // })

  // it('changes the page size when selecting a new value from the page size selector', () => {
  //   cy.get('PageSizeSelector').select('20')
  //   cy.get('TableBody').find('TableRow').its('length').should('be.gte', 1).and('be.lte', 20)
  // })
})

export {}
