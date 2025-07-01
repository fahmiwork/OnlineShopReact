import React from "react";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function CartDrawer({ isOpen, onClose }) {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (!isOpen) return null;

    const handleQtyChange = (id, value) => {
        let qty = parseInt(value);
        if (isNaN(qty)) qty = 1;
        qty = Math.max(1, qty);
        updateQuantity(id, qty);
    };

    const handleStep = (id, step) => {
        const item = cart.find((i) => i.id === id);
        if (!item) return;
        const newQty = item.quantity + step;
        if (newQty >= 1) {
            updateQuantity(id, newQty);
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Keranjang kosong!");
            return;
        }
        onClose(); // Tutup drawer
        navigate("/checkout"); // Arahkan ke halaman checkout
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-gray-500/75 z-40"
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 flex justify-between items-center border-b">
                    <h2 className="text-lg font-medium">Keranjang Belanja</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="p-6 text-gray-500">Keranjang kosong</div>
                ) : (
                    <div className="p-6">
                        <ul className="divide-y divide-gray-200">
                            {cart.map((item) => (
                                <li key={item.id} className="flex py-4 gap-4">
                                    <img
                                        src={`http://localhost:8000/storage/${item.image}`}
                                        alt={item.title}
                                        className="h-20 w-20 rounded border object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between font-medium text-gray-900">
                                            <span>{item.title}</span>
                                            <span>
                                                Rp {item.price.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Qty */}
                                        <div className="mt-2 flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    handleStep(item.id, -1)
                                                }
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQtyChange(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-12 text-center border rounded"
                                            />
                                            <button
                                                onClick={() =>
                                                    handleStep(item.id, 1)
                                                }
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                            className="mt-2 text-sm text-red-500 hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 border-t pt-4">
                            <div className="flex justify-between font-medium text-gray-900">
                                <span>Subtotal</span>
                                <span>Rp {subtotal.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                            >
                                Checkout
                            </button>
                            <button
                                onClick={onClose}
                                className="mt-2 w-full text-indigo-600 hover:underline text-sm"
                            >
                                Lanjut Belanja →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartDrawer;
