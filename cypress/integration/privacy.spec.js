it ('Testa a página da política de privavidade de forma independente', () =>
cy.visit('./src/privacy.html')
.contains("Talking About Testing").should("be.visible")

)