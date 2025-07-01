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
</button>;
