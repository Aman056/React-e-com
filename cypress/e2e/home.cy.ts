describe("Home Page", () => {
  it("loads homepage", () => {
    cy.visit("/");
    cy.contains("Products");
  });
});