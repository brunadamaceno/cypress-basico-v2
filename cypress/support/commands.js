Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Bruna Isabela')
    cy.get('#lastName').type('Damaceno')
    cy.get('#email').type('brunadamaceno@gmail.com')
    cy.get('#open-text-area').type('Desejo fazer uma aula teste.')
    cy.contains('button', 'Enviar').click()

})
