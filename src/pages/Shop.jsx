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
      icon: <ShoppingCart size={17} />,
    },
    {
      name: "Fish",
      label: "মাছ",
      icon: <Fish size={17} />,
    },
    {
      name: "Goat",
      label: "ছাগল",
      icon: <CircleDot size={17} />,
    },
    {
      name: "Chicken",
      label: "মুরগি",
      icon: <Bird size={17} />,
    },
  ];

  // Category + Search
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

  // Sorting
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
    addToCart(product);

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1200);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <section
      id="shop"
      className="bg-stone-50 px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mx-auto max-w-2xl text-center">

          <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
            🌿 সরাসরি খামার থেকে
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-green-950 sm:text-4xl lg:text-5xl">
            Farm Fresh Products
          </h2>

          <p className="mt-4 leading-7 text-gray-500">
            আমাদের খামার থেকে সরাসরি তাজা মাছ,
            স্বাস্থ্যকর ছাগল এবং মানসম্মত মুরগি
            অর্ডার করুন।
          </p>

        </div>

        {/* ================= SEARCH ================= */}

        <div className="mx-auto mt-10 max-w-3xl">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="পণ্য খুঁজুন... যেমন রুই মাছ, ছাগল, মুরগি"
              className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-14 text-sm text-gray-800 shadow-sm outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}

          </div>

        </div>

        {/* ================= FILTERS ================= */}

        <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Categories */}

          <div className="flex flex-wrap gap-3">

            {categories.map((category) => {

              const isActive =
                activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() =>
                    setActiveCategory(
                      category.name
                    )
                  }
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                    isActive
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

          {/* Sorting */}

          <div className="flex items-center gap-3">

            <div className="hidden items-center gap-2 text-sm font-semibold text-gray-500 sm:flex">
              <SlidersHorizontal size={17} />
              Sort:
            </div>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-green-950 outline-none transition focus:border-green-600"
            >
              <option value="default">
                Default
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="name">
                Name
              </option>
            </select>

          </div>

        </div>

        {/* ================= RESULT INFO ================= */}

        <div className="mb-7 mt-10 flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Available Products
            </p>

            <p className="mt-1 text-sm font-bold text-green-900">
              {filteredProducts.length} টি পণ্য পাওয়া গেছে
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-500 shadow-sm sm:flex">
            <Package size={15} />
            Fresh • Healthy • Natural
          </div>

        </div>

        {/* ================= PRODUCT GRID ================= */}

        {filteredProducts.length > 0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-green-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}

                <div className="relative h-64 overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-green-900 shadow backdrop-blur">
                    {product.category}
                  </span>

                  <span className="absolute right-4 top-4 rounded-full bg-green-800/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                    Stock: {product.stock}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-black text-white drop-shadow-lg">
                      {product.name}
                    </h3>
                  </div>

                </div>

                {/* Content */}

                <div className="p-5">

                  <p className="text-sm leading-6 text-gray-500">
                    সরাসরি Chacha & Vatija Agro থেকে
                    সংগ্রহ করা তাজা পণ্য।
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <div>

                      <p className="text-xs text-gray-400">
                        মূল্য
                      </p>

                      <div className="mt-1">

                        <span className="text-2xl font-black text-green-800">
                          ৳
                          {product.price.toLocaleString()}
                        </span>

                        <span className="ml-1 text-sm text-gray-500">
                          / {product.unit}
                        </span>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition ${
                        addedProduct === product.id
                          ? "scale-110 bg-emerald-500"
                          : "bg-green-800 hover:scale-105 hover:bg-green-700"
                      }`}
                    >
                      {addedProduct === product.id ? (
                        <Check size={21} />
                      ) : (
                        <ShoppingCart size={20} />
                      )}
                    </button>

                  </div>

                  {/* Details */}

                  <button
                    type="button"
                    onClick={() =>
                      onProductDetails(product)
                    }
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 py-3 text-sm font-bold text-green-900 transition hover:border-green-800 hover:bg-green-50"
                  >
                    বিস্তারিত দেখুন
                    <ArrowRight size={17} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* ================= EMPTY ================= */

          <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">

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
              className="mt-6 rounded-full bg-green-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700"
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