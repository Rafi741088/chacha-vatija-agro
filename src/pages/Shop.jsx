import { useState } from "react";
import {
  ShoppingCart,
  ArrowRight,
  Fish,
  Bird,
  CircleDot,
  Check,
  Package,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import products from "../data/products";

function Shop({ addToCart, onProductDetails }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [addedProduct, setAddedProduct] = useState(null);

  const categories = [
    {
      name: "All",
      label: "সব পণ্য",
      icon: <ShoppingCart size={16} />,
    },
    {
      name: "Fish",
      label: "মাছ",
      icon: <Fish size={16} />,
    },
    {
      name: "Goat",
      label: "ছাগল",
      icon: <CircleDot size={16} />,
    },
    {
      name: "Chicken",
      label: "মুরগি",
      icon: <Bird size={16} />,
    },
  ];

  let filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === "All" ||
      product.category === activeCategory;

    const searchMatch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  if (sortBy === "low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortBy === "name") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const handleAddToCart = (product) => {
    if (product.stock <= 0) return;

    addToCart(product);

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1200);
  };

  return (
    <section
      id="shop"
      className="bg-stone-50 px-4 py-16 sm:px-5 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold text-green-800 sm:text-sm">
            🌿 সরাসরি খামার থেকে
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-green-950 sm:mt-5 sm:text-4xl lg:text-5xl">
            Farm Fresh Products
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-500 sm:mt-4 sm:text-base">
            আমাদের খামার থেকে সরাসরি তাজা মাছ,
            স্বাস্থ্যকর ছাগল এবং মানসম্মত মুরগি অর্ডার করুন।
          </p>
        </div>

        {/* SEARCH */}
        <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 sm:left-5"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="পণ্য খুঁজুন..."
              className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-12 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100 sm:py-4 sm:pl-14"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-400 hover:bg-gray-100 sm:right-4"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>

        {/* FILTER AREA */}
        <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* CATEGORIES */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => {
              const active =
                activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category.name)
                  }
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition sm:px-5 sm:text-sm ${
                    active
                      ? "bg-green-800 text-white shadow-md"
                      : "border border-green-200 bg-white text-green-900 hover:bg-green-50"
                  }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* SORT */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={17}
              className="text-gray-400"
            />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs font-semibold text-green-950 outline-none sm:w-auto sm:px-4 sm:text-sm"
            >
              <option value="default">Default</option>
              <option value="low">
                Price: Low to High
              </option>
              <option value="high">
                Price: High to Low
              </option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* RESULT COUNT */}
        <div className="mb-6 mt-8 flex items-center justify-between sm:mb-7 sm:mt-10">
          <div>
            <p className="text-xs text-gray-500 sm:text-sm">
              Available Products
            </p>

            <p className="mt-1 text-xs font-bold text-green-900 sm:text-sm">
              {filteredProducts.length} টি পণ্য পাওয়া গেছে
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-500 shadow-sm sm:flex">
            <Package size={15} />
            Fresh • Healthy • Natural
          </div>
        </div>

        {/* PRODUCTS */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stock === 0;
              const isLowStock =
                product.stock > 0 &&
                product.stock <= 5;

              return (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-green-900/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden sm:h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className={`h-full w-full object-cover transition duration-700 ${
                        isOutOfStock
                          ? "grayscale"
                          : "group-hover:scale-105"
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-green-900 shadow sm:left-4 sm:top-4 sm:text-xs">
                      {product.category}
                    </span>

                    {isOutOfStock ? (
                      <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-black text-white sm:right-4 sm:top-4 sm:text-xs">
                        Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-3 py-1.5 text-[10px] font-black text-white sm:right-4 sm:top-4 sm:text-xs">
                        Low Stock
                      </span>
                    ) : (
                      <span className="absolute right-3 top-3 rounded-full bg-green-800/90 px-3 py-1.5 text-[10px] font-bold text-white sm:right-4 sm:top-4 sm:text-xs">
                        Stock: {product.stock}
                      </span>
                    )}

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-black text-white drop-shadow-lg sm:text-xl">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 sm:p-5">

                    <p className="text-xs leading-6 text-gray-500 sm:text-sm">
                      সরাসরি Chacha & Vatija Agro থেকে
                      সংগ্রহ করা তাজা পণ্য।
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">

                      <div className="min-w-0">
                        <p className="text-[11px] text-gray-400 sm:text-xs">
                          মূল্য
                        </p>

                        <div className="mt-1 whitespace-nowrap">
                          <span className="text-xl font-black text-green-800 sm:text-2xl">
                            ৳{product.price.toLocaleString()}
                          </span>

                          <span className="ml-1 text-xs text-gray-500">
                            / {product.unit}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={isOutOfStock}
                        onClick={() =>
                          handleAddToCart(product)
                        }
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-md transition sm:h-12 sm:w-12 ${
                          isOutOfStock
                            ? "cursor-not-allowed bg-gray-300 shadow-none"
                            : addedProduct === product.id
                            ? "scale-110 bg-emerald-500"
                            : "bg-green-800 hover:scale-105 hover:bg-green-700"
                        }`}
                      >
                        {isOutOfStock ? (
                          <X size={19} />
                        ) : addedProduct === product.id ? (
                          <Check size={20} />
                        ) : (
                          <ShoppingCart size={19} />
                        )}
                      </button>
                    </div>

                    {/* STOCK */}
                    <div className="mt-4">
                      {isOutOfStock ? (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-[11px] font-bold text-red-600 sm:text-xs">
                          এই পণ্যটি বর্তমানে available নেই।
                        </p>
                      ) : isLowStock ? (
                        <p className="rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-700 sm:text-xs">
                          দ্রুত অর্ডার করুন — stock সীমিত।
                        </p>
                      ) : (
                        <p className="rounded-lg bg-green-50 px-3 py-2 text-[11px] font-semibold text-green-700 sm:text-xs">
                          ✓ বর্তমানে পর্যাপ্ত stock আছে
                        </p>
                      )}
                    </div>

                    {/* DETAILS */}
                    <button
                      type="button"
                      onClick={() =>
                        onProductDetails(product)
                      }
                      className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-green-200 py-3 text-xs font-bold text-green-900 transition hover:border-green-800 hover:bg-green-50 sm:mt-4 sm:text-sm"
                    >
                      বিস্তারিত দেখুন
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <Search
                size={28}
                className="text-green-700"
              />
            </div>

            <h3 className="mt-5 text-xl font-black text-green-950">
              কোনো পণ্য পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              অন্য কোনো product name দিয়ে search করুন।
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All");
                setSortBy("default");
              }}
              className="mt-6 rounded-full bg-green-800 px-6 py-3 text-sm font-bold text-white hover:bg-green-700"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Shop;