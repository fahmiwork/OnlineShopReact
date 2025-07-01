import React, { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy data
    const dummyData = [
      {
        id: 1,
        name: "Nike Pink",
        price: 1200000,
        image:
          "https://i0.wp.com/justfreshkicks.com/wp-content/uploads/2023/02/Nike-Dunk-Low-Multi-Color-FD9923-111-Release-Date-4.jpeg?w=1100&ssl=1",
      },
      {
        id: 2,
        name: "Jaket Adidas",
        price: 750000,
        image:
          "https://cdna.lystit.com/photos/nordstrom/ab65dfb8/adidas-originals-Black-Sst-Track-Jacket.jpeg",
      },
      {
        id: 3,
        name: "T-Shirt Eiger",
        price: 180000,
        image:
          "https://lzd-img-global.slatic.net/g/p/15e1f93b6e3c198f5785501648a5b6e0.jpg_720x720q80.jpg_.webp",
      },
      {
        id: 4,
        name: "Chinos",
        price: 130000,
        image:
          "https://thecutprice.com/cdn/shop/products/6_8f546cd9-4db0-459e-9c41-434c2d9cd928.jpg?v=1699334323&width=533",
      },
    ];

    // Simulasi loading
    setTimeout(() => {
      setProducts(dummyData);
      setLoading(false);
    }, 500); // 0.5 detik loading simulasi
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, searchTerm, setSearchTerm, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
