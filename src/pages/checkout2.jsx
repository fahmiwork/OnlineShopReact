import React from "react";
import { useCart } from "../contexts/CartContext";

function Checkout() {
    const { cart } = useCart();
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 5000;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left side - form */}
                <div className="lg:col-span-2 bg-white p-6 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">
                        Contact information
                    </h2>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border p-2 rounded mb-6"
                    />

                    <h2 className="text-lg font-bold mb-4">
                        Shipping information
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="First name"
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            className="border p-2 rounded"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Company"
                        className="w-full border p-2 rounded mb-4"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full border p-2 rounded mb-4"
                    />
                    <input
                        type="text"
                        placeholder="Apartment, suite, etc."
                        className="w-full border p-2 rounded mb-4"
                    />
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="City"
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            className="border p-2 rounded"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="State / Province"
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Postal code"
                            className="border p-2 rounded"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Phone"
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Right side - order summary */}
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Order summary</h2>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-start gap-4"
                            >
                                <img
                                    src={`http://localhost:8000/storage/${item.image}`}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-medium">
                                    Rp{" "}
                                    {(
                                        item.price * item.quantity
                                    ).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-4" />

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Rp {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>Rp {shipping.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Taxes</span>
                            <span>Rp {tax.toFixed(0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base pt-2 border-t">
                            <span>Total</span>
                            <span>Rp {total.toLocaleString()}</span>
                        </div>
                    </div>

                    <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded">
                        Confirm order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;

<button
    onClick={() => removeFromCart(item.id)}
    className="text-red-500 text-sm ml-2"
>
    Hapus
</button>;
