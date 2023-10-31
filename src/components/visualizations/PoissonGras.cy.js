/* eslint-disable no-undef */
import React from 'react'
import { StyleProvider } from 'components/providers/StyleProvider'
import PoissonGras from './PoissonGras'

describe('<PoissonGras />', () => {
  it('On voit bien 4 poissons', () => {
    cy.mount(
      <StyleProvider>
        <PoissonGras />
      </StyleProvider>
    )
    cy.get('[alt="🐟"]').should('exist')
    cy.get('[alt="🐟"]').its('length').should('equal', 7)
  })
  it("Le texte indique bien qu'un repas avec du boeuf vaut 7 repas avec du poisson gras", () => {
    cy.mount(
      <StyleProvider>
        <PoissonGras />
      </StyleProvider>
    )
    cy.get('body').should('contains.text', '1 repas avecdu boeuf=7 repas avecdu poisson gras')
  })
})
