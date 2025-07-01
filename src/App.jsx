//tampilan css
import "./tailwind.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext"; // ⬅️ Import ProductProvider
import CartDrawer from "./components/navbar/CartDrawer";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <ProductProvider>
            <CartProvider>
                <Navbar
                    onCartClick={() => setCartOpen(!cartOpen)}
                    isCartOpen={cartOpen}
                />
                <CartDrawer
                    isOpen={cartOpen}
                    onClose={() => setCartOpen(false)}
                />

                <div className="pt-20">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/detail/:id"
                            element={
                                <Detail
                                    onAddToCartDrawer={() => setCartOpen(true)}
                                />
                            }
                        />
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                    <Footer />
                </div>
            </CartProvider>
        </ProductProvider>
    );
}

export default App;
