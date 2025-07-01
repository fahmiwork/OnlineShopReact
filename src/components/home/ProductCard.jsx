import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { IoBagAddOutline } from "react-icons/io5";

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, quantity);
    if (onAddToCart) onAddToCart(); // Buka drawer/cart
  };

  return (
    <div className="group relative w-full max-w-sm mx-auto border p-4 rounded-xl shadow-md flex flex-col justify-between h-full bg-white hover:shadow-md transition">
      <Link to={`/detail/${product.id}`} className="flex-1">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full rounded-md object-contain group-hover:opacity-75 lg:h-80"
        />
      </Link>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm text-gray-700 font-semibold">
            {product.name}
          </h3>
          {product.color && (
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          )}
        </div>
        <p className="text-sm font-medium text-gray-900">
          Rp {product.price.toLocaleString()}
        </p>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          −
        </button>
        <input
          type="number"
          value={quantity}
          readOnly
          className="w-10 text-right border rounded"
        />
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>

      <div className="mt-4 flex gap-2 justify-end">
        {/* <Link to={`/detail/${product.id}`} className="flex-1">
                    <button className="w-full bg-blue-500 text-white p-2 rounded text-sm">
                        Detail
                    </button>
                </Link> */}
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white rounded text-sm w-fit h-fit p-2 flex items-center justify-center"
        >
          Add
          <IoBagAddOutline className="gap-1 text-xl" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
