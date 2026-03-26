describe("Cart Flow", () => {

  it("should add item to cart and show it in cart page", () => {
    cy.visit("http://localhost:3000");

    cy.contains("button", "Add to Cart").first().click();

    cy.contains("Cart").click();

    cy.url().should("include", "/cart");

    cy.contains("Your cart is empty").should("not.exist");

    cy.contains("Items:").should("exist");
    cy.contains("₹").should("exist");
  });

});