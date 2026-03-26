import { makeAutoObservable } from "mobx";
import { Product } from "./types";

type CartItem = Product & { quantity: number };

class CartStore {
  cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]").map(
    (item: any) => ({
      ...item,
      quantity: item.quantity ?? 1,
    })
  );
  constructor() {
    makeAutoObservable(this);
  }
  addToCart(product: Product) {
    const existing = this.cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
  }

  decreaseQuantity(id: number) {
    const item = this.cart.find((i) => i.id === id);

    if (item) {
      item.quantity -= 1;
      if (item.quantity === 0) {
        this.cart = this.cart.filter((i) => i.id !== id);
      }
    } else {
      alert("No more items to remove!")
    }

    this.saveCart();
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
  get totalItems() {
    console.log(this.cart)
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.cart.reduce(
      (sum, item) =>
        sum + Number(item.price) * Number(item.quantity || 0),
      0
    );
  }
  getQuantity(id: number) {
    const item = this.cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  }
}

export const cartStore = new CartStore();