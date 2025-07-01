import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD": {
            const existing = state.find(
                (item) => item.id === action.product.id
            );
            if (existing) {
                return state.map((item) =>
                    item.id === action.product.id
                        ? { ...item, quantity: item.quantity + action.quantity }
                        : item
                );
            }
            return [...state, { ...action.product, quantity: action.quantity }];
        }

        case "REMOVE":
            return state.filter((item) => item.id !== action.id);

        case "UPDATE_QUANTITY":
            return state.map((item) =>
                item.id === action.id
                    ? { ...item, quantity: action.quantity }
                    : item
            );

        default:
            return state;
    }
};
export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const addToCart = (product, quantity) =>
        dispatch({ type: "ADD", product, quantity });

    const removeFromCart = (id) => dispatch({ type: "REMOVE", id });

    const updateQuantity = (id, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", id, quantity });

    // ✅ Tambahkan totalItems
    const totalItems = cart.length;

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
