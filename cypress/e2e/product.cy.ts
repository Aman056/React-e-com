describe("E-commerce App", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should load homepage and display products", () => {
   cy.contains("Products").should("exist");
cy.contains("button", "Add to Cart").should("exist");
  });


  it("should navigate to product details and come back", () => {
    cy.get("a.text-decoration-none").first().click();
    cy.url().should("include", "/product");
    cy.get("h1, h2, h3").should("exist");
    cy.contains("Back").click();
    cy.url().should("eq", "http://localhost:3000/");
  });


  it("should show empty cart initially", () => {
    cy.contains("Cart").click();
    cy.url().should("include", "/cart");
    cy.contains("Your cart is empty").should("exist");
  });


  it("should add product to cart and display it", () => {
    cy.contains("button", "Add to Cart").first().click();
    cy.contains("Cart").click();
    cy.url().should("include", "/cart");
    cy.contains("Your cart is empty").should("not.exist");
    cy.get("h6").should("exist"); 
    cy.contains("₹").should("exist"); // price
  });


  it("should increase and decrease quantity in cart", () => {
    cy.contains("button", "Add to Cart").first().click();
    cy.contains("Cart").click();
  cy.contains("+").click();


    cy.contains("-").click();

    // Verify item still exists
    cy.get("h6").should("exist");
  });


  it("should remove item from cart", () => {
    // Add product
    cy.contains("button", "Add to Cart").first().click();

    // Go to cart
    cy.contains("Cart").click();

    // Remove item
    cy.contains("Remove").click();

    cy.contains("Your cart is empty").should("exist");
  });

});