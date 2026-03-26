# 🛒 E-Com Aman (React E-commerce App)

A simple and modern **E-commerce web application** built using React.
Users can browse products, view details, and manage their shopping cart.

---

# 🚀 Features

* 🛍️ View all products
* 🔍 Product detail page
* ➕ Add to cart
* ➖ Increase / decrease quantity
* 🧾 Cart summary (total items & price)
* 📱 Responsive design (mobile friendly)
* ⚡ Smooth animations using Framer Motion
* 🧠 State management using MobX
* 🧪 End-to-End testing using Cypress

---

# 🛠️ Tech Stack

* React (Create React App)
* React Router
* MobX
* Bootstrap
* Framer Motion
* Cypress (for testing)

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/e-com-aman.git
cd e-com-aman
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run the App

```bash
npm start
```

Open in browser:

```
http://localhost:3000
```

---

# 🧪 Cypress Testing Setup

## 1. Install Cypress

```bash
npm install cypress --save-dev
```

---

## 2. Open Cypress

```bash
npx cypress open
```

This will create a folder:

```
cypress/
  e2e/
  fixtures/
  support/
```

---

## 3. Create Test File

Create file:

```
cypress/e2e/products.cy.js
```

---

## 4. Sample Test Cases

```js
describe("E-commerce App", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should load products", () => {
    cy.get(".card").should("exist");
  });

  it("should navigate to product details", () => {
    cy.get(".card").first().click();
    cy.url().should("include", "/product/");
  });

  it("should add product to cart", () => {
    cy.contains("Add to Cart").first().click();
    cy.contains("+").should("exist");
  });

});
```

---

## 5. Run Tests (Headless)

```bash
npx cypress run
```

---

# 📂 Project Structure

```
src/
  components/
  pages/
  cartStore.js
  App.js

cypress/
  e2e/
    products.cy.js
```

---

# 🧠 How It Works

* Products are fetched from API
* Cart is managed using MobX store
* UI updates automatically when state changes
* Cypress tests simulate real user behavior

---

# 📸 Future Improvements

* 🔐 User authentication
* 💳 Payment integration
* 📦 Order history
* ⭐ Product reviews

---

# 🙌 Author

Made with ❤️ by **Aman**

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub!
