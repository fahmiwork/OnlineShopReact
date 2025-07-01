import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";

function Detail({ onAddToCartDrawer }) {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products, loading: productLoading } = useProducts();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = products.find((p) => p.id === parseInt(id));
    setProduct(found || null);
  }, [id, products]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    if (onAddToCartDrawer) onAddToCartDrawer();
  };

  if (productLoading) {
    return <div className="p-4 text-center">Memuat produk...</div>;
  }

  if (!product) {
    return (
      <div className="p-4 text-center text-red-500">
        Produk tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col items-start justify-start gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl text-green-700 font-semibold">
            Rp {product.price.toLocaleString()}
          </p>
          <p className="text-gray-600">Deskripsi produk belum tersedia.</p>

          <div className="flex items-center gap-3">
            <label>Qty:</label>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-14 text-center border rounded"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
