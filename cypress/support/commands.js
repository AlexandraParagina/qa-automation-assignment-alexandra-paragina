Cypress.Commands.add("shouldIncludeInUrl", (text) => {
  cy.url().should("include", text);
});