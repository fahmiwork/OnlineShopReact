import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { CgShoppingBag } from "react-icons/cg";
import { useCart } from "../../contexts/CartContext"; // 🔥 Import context

function Navbar({ onCartClick, isCartOpen }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { totalItems } = useCart(); // ✅ Ambil total item dari context
    const location = useLocation();

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full h-20 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-xl font-bold text-amber-500"
                        >
                            SandangShop
                        </Link>
                    </div>

                    {/* Menu - Desktop */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link
                            to="/"
                            className={`${
                                location.pathname === "/"
                                    ? "text-indigo-600 font-semibold"
                                    : "text-gray-700"
                            } hover:text-indigo-800`}
                        >
                            Home
                        </Link>

                        <Link
                            to="/checkout"
                            className={`${
                                location.pathname === "/checkout"
                                    ? "text-indigo-600 font-semibold"
                                    : "text-gray-700"
                            } hover:text-indigo-800`}
                        >
                            Checkout
                        </Link>

                        {/* Cart Icon */}
                        <button
                            onClick={onCartClick}
                            className="relative text-2xl text-gray-700 hover:text-black"
                        >
                            {isCartOpen ? <HiX /> : <CgShoppingBag />}
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Hamburger - Mobile */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-2xl text-gray-700"
                        >
                            {menuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 bg-white shadow">
                    <Link
                        to="/"
                        className="block py-2 text-gray-700 hover:text-gray-900"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/checkout"
                        className="block py-2 text-gray-700 hover:text-gray-900"
                        onClick={() => setMenuOpen(false)}
                    >
                        Checkout
                    </Link>
                    <button
                        onClick={() => {
                            onCartClick();
                            setMenuOpen(false);
                        }}
                        className="block py-2 text-gray-700 hover:text-gray-900"
                    >
                        {isCartOpen ? "Close Cart" : "Open Cart"}
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
