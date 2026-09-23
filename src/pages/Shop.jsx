import { useState } from "react";
import {
  ShoppingCart,
  ArrowRight,
  Fish,
  Bird,
  CircleDot,
  Check,
} from "lucide-react";

import products from "../data/products";

function Shop({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedProduct, setAddedProduct] = useState(null);

  // Filter products
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  // Categories
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

  // Add to cart
  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 1200);
  };

  return (
    <section
      id="shop"
      className="bg-stone-50 px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="mb-10 text-center">

          <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800">
            🌿 সরাসরি খামার থেকে
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-green-950 sm:text-4xl lg:text-5xl">
            Farm Fresh Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            আমাদের খামার থেকে সরাসরি তাজা মাছ, স্বাস্থ্যকর ছাগল
            এবং মানসম্মত মুরগি অর্ডার করুন।
          </p>

        </div>


        {/* =========================
            CATEGORY FILTER
        ========================== */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">

          {categories.map((category) => {

            const isActive =
              activeCategory === category.name;

            return (
              <button
                key={category.name}
                onClick={() =>
                  setActiveCategory(category.name)
                }
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-green-800 text-white shadow-lg shadow-green-900/20"
                    : "border border-green-200 bg-white text-green-900 hover:border-green-300 hover:bg-green-50"
                }`}
              >
                {category.icon}

                {category.label}
              </button>
            );
          })}

        </div>


        {/* =========================
            PRODUCT TOP BAR
        ========================== */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Available Products
            </p>

            <p className="mt-1 text-sm font-semibold text-green-900">
              {filteredProducts.length} টি পণ্য পাওয়া গেছে
            </p>
          </div>

          <div className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-500 shadow-sm sm:block">
            Fresh • Healthy • Natural
          </div>

        </div>


        {/* =========================
            PRODUCT GRID
        ========================== */}
        {filteredProducts.length > 0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-green-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* =====================
                    PRODUCT IMAGE
                ====================== */}
                <div className="relative h-64 overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

                  {/* Category Badge */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-bold text-green-900 shadow-sm backdrop-blur">
                    {product.category}
                  </span>

                  {/* Stock Badge */}
                  <span className="absolute right-4 top-4 rounded-full bg-green-800/90 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur">
                    Stock: {product.stock}
                  </span>

                  {/* Product Name on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      {product.name}
                    </h3>
                  </div>

                </div>


                {/* =====================
                    PRODUCT CONTENT
                ====================== */}
                <div className="p-5">

                  <p className="text-sm leading-6 text-gray-500">
                    সরাসরি Chacha & Vatija Agro থেকে
                    সংগ্রহ করা তাজা পণ্য।
                  </p>


                  {/* Price + Cart */}
                  <div className="mt-5 flex items-center justify-between">

                    <div>

                      <p className="text-xs font-medium text-gray-400">
                        মূল্য
                      </p>

                      <div className="mt-1">

                        <span className="text-2xl font-black text-green-800">
                          ৳{product.price.toLocaleString()}
                        </span>

                        <span className="ml-1 text-sm text-gray-500">
                          / {product.unit}
                        </span>

                      </div>

                    </div>


                    {/* Add To Cart Button */}
                    <button
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 ${
                        addedProduct === product.id
                          ? "bg-emerald-500 scale-110"
                          : "bg-green-800 hover:scale-105 hover:bg-green-700"
                      }`}
                      aria-label={`Add ${product.name} to cart`}
                    >

                      {addedProduct === product.id ? (
                        <Check size={21} />
                      ) : (
                        <ShoppingCart size={20} />
                      )}

                    </button>

                  </div>


                  {/* Details Button */}
                  <button
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 py-3 text-sm font-bold text-green-900 transition-all duration-300 hover:border-green-800 hover:bg-green-50"
                  >
                    বিস্তারিত দেখুন

                    <ArrowRight size={17} />

                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* =====================
             EMPTY STATE
          ====================== */
          <div className="rounded-3xl border border-green-100 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl">
              🌿
            </div>

            <h3 className="mt-5 text-xl font-bold text-green-950">
              কোনো পণ্য পাওয়া যায়নি
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              এই category-তে বর্তমানে কোনো product নেই।
            </p>

            <button
              onClick={() => setActiveCategory("All")}
              className="mt-5 rounded-full bg-green-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700"
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