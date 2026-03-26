/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// cypress/support/commands.ts

Cypress.Commands.add("visitHome", () => {
  cy.visit("/");
});

Cypress.Commands.add("openFirstProduct", () => {
  cy.get("a").first().click();
});

Cypress.Commands.add("addToCart", () => {
  cy.contains("Add to MyCart").click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      visitHome(): Chainable<void>;
      openFirstProduct(): Chainable<void>;
      addToCart(): Chainable<void>;
    }
  }
}

export {};