import React from "react";
import { useProducts } from "../../contexts/ProductContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function SearchBar() {
    const { searchTerm, setSearchTerm } = useProducts();

    return (
        <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
                type="text"
                name="search"
                placeholder="Search product..."
                aria-label="Search"
                className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}
export default SearchBar;
