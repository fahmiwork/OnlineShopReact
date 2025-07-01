import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/posts");
            const productData = response.data.data?.data || [];
            setProducts(productData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p className="text-center py-4">Loading products...</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border shadow rounded-lg overflow-hidden"
                >
                    <img
                        src={`http://localhost:8000/storage/${product.image}`}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {product.title}
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            {product.description
                                .replace(/<\/?[^>]+(>|$)/g, "")
                                .substring(0, 100)}
                            ...
                        </p>
                        <div className="mt-4 text-sm text-gray-700">
                            <p>Harga: Rp {product.price.toLocaleString()}</p>
                            <p>Stok: {product.stock}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
