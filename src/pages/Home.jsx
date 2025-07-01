// src/pages/Home.js
import React from "react";
import SlideShow from "../components/home/SlideShow";
import SearchBar from "../components/home/SearchBar";
import ProductCard from "../components/home/ProductCard";
import { useProducts } from "../contexts/ProductContext";

function Home() {
  const { products, searchTerm, loading } = useProducts();

  // Perbaikan: pastikan title tidak undefined
  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-2 pb-10 sm:px-6 lg:px-8">
        <SlideShow />

        <h2 className="text-1xl font-bold tracking-tight text-gray-900 mb-4 text-left">
          Semua Produk :
        </h2>
        <SearchBar />
        {loading ? (
          <p className="text-center pt-8">Memuat produk...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="pt-6 text-center text-red-500">
            Produk tidak ditemukan.
          </p>
        ) : (
          <div className="pt-6 grid justify-center grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
