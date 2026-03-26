import { createContext } from "react";
import { cartStore } from "./cartStore";

export const CartContext = createContext(cartStore);
