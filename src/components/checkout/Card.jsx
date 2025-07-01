// src/pages/Checkout.js
import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import axios from "axios";

function Card() {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [method, setMethod] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 5000;
    const tax = 0;
    const totalAmount = subtotal + shipping + tax;

    const handleCheckout = async () => {
        if (!name || !email || !phone || !method) {
            setError("Semua field wajib diisi!");
            return;
        }
        setError(null);
        setLoading(true);

        const items = [
            ...cart.map((item) => ({
                sku: String(
                    item.id ?? "SKU-" + Math.floor(Math.random() * 10000)
                ),
                name: item.title ?? "Produk",
                price: parseInt(item.price),
                quantity: parseInt(item.quantity),
            })),
            {
                sku: "ONGKIR",
                name: "Biaya Pengiriman",
                price: shipping,
                quantity: 1,
            },
            {
                sku: "PAJAK",
                name: "Pajak",
                price: tax, // pastikan integer
                quantity: 1,
            },
        ];

        try {
            const response = await axios.post(
                "http://localhost:8000/api/tripay/checkout",
                {
                    method,
                    amount: totalAmount,
                    name,
                    email,
                    phone,
                    items,
                    shipping,
                    tax,
                    subtotal,
                }
            );

            if (response.data && response.data.success) {
                const redirectUrl = response.data.data.checkout_url;
                window.location.href = redirectUrl;
            } else {
                throw new Error("Checkout gagal. Data tidak valid.");
            }
        } catch (err) {
            if (err.response) {
                const { message, error: detailedError } = err.response.data;
                setError(`${message}: ${detailedError}`);
                console.error("Checkout error detail:", detailedError);
            } else {
                setError("Gagal melakukan checkout. Silakan coba lagi.");
                console.error("Checkout error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (id, newQty) => {
        if (!isNaN(newQty) && newQty >= 1) {
            updateQuantity(id, parseInt(newQty));
        }
    };

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - form */}
            <div className="lg:col-span-2 bg-white p-6 rounded shadow">
                {error && (
                    <div className="text-red-500 mb-4 whitespace-pre-wrap">
                        {error}
                    </div>
                )}

                <h2 className="text-lg font-bold mb-4">Contact information</h2>
                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full border p-2 rounded mb-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <h2 className="text-lg font-bold mb-4">Shipping information</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Full name"
                        className="border p-2 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="border p-2 rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <select
                    className="w-full border p-2 rounded mb-4"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                >
                    <option value="">-- Pilih Metode Pembayaran --</option>
                    <option value="QRIS">QRIS</option>
                    <option value="BNIVA">BNI Virtual Account</option>
                    <option value="BCAVA">BCA Virtual Account</option>
                    <option value="MANDIRIVA">Mandiri VA</option>
                </select>

                <button
                    onClick={handleCheckout}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded disabled:opacity-50"
                    disabled={loading || cart.length === 0}
                >
                    {loading ? "Memproses..." : "Bayar Sekarang"}
                </button>
                <h2 className="text-lg font-bold mb-4 text-justify">
                    Ketentuan :
                </h2>
                <h4 className="text-blue-800 font-normal">
                    Setelah klik "bayar sekarang" apabila berhasil akan muncul
                    struk, harap bayar sesuai tagihan dari struk itu, dan
                    apabila bingung cara bayarnya sudah ada panduan di struknya.
                    Harap struk disimpan (screenshoot) untuk melakukan
                    konfirmasi pembayaran ke admin beserta bukti transfer dari
                    bank, dan segera konfirmasi admin lewat whatsapp
                    085878375707.
                </h4>
            </div>

            {/* Right side - order summary */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-bold mb-4">Order summary</h2>
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-start gap-4">
                            <img
                                src={`http://localhost:8000/storage/${item.image}`}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-gray-500">
                                        Qty:
                                    </span>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min={1}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                item.id,
                                                e.target.value
                                            )
                                        }
                                        className="w-16 border rounded px-2 py-1 text-sm"
                                    />
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 text-sm ml-2"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                            <p className="font-medium">
                                Rp{" "}
                                {(item.price * item.quantity).toLocaleString()}
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
                        <span>Rp {totalAmount.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
