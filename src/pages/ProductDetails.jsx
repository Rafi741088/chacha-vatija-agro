import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
  Package,
  Leaf,
  Truck,
  ShieldCheck,
  Phone,
  AlertTriangle,
} from "lucide-react";

import products from "../data/products";

function ProductDetails({
  product,
  addToCart,
  onBack,
  onProductDetails,
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <Package
              size={34}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-6 text-2xl font-black text-green-950 sm:text-3xl">
            Product not found
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            এই product-টি পাওয়া যায়নি।
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 rounded-full bg-green-800 px-7 py-3 font-bold text-white hover:bg-green-700"
          >
            Back to Shop
          </button>
        </div>
      </section>
    );
  }

  const isOutOfStock = product.stock === 0;
  const isLowStock =
    product.stock > 0 && product.stock <= 5;

  const totalPrice = product.price * quantity;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((current) => current + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((current) => current - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 3);

  return (
    <section className="min-h-screen bg-stone-50 px-4 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">

        {/* BACK */}
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-green-800 hover:text-green-600 sm:mb-8"
        >
          <ArrowLeft size={18} />
          Shop এ ফিরে যান
        </button>

        {/* MAIN CARD */}
        <div className="overflow-hidden rounded-3xl border border-green-900/10 bg-white shadow-xl sm:rounded-[2rem]">

          <div className="grid lg:grid-cols-2">

            {/* IMAGE */}
            <div className="relative h-[320px] overflow-hidden bg-stone-100 sm:h-[450px] lg:h-[650px]">
              <img
                src={product.image}
                alt={product.name}
                className={`h-full w-full object-cover ${
                  isOutOfStock ? "grayscale" : ""
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-green-900 shadow sm:left-6 sm:top-6 sm:px-4 sm:py-2 sm:text-sm">
                {product.category}
              </div>

              {isOutOfStock ? (
                <div className="absolute right-4 top-4 rounded-full bg-red-600 px-3 py-1.5 text-xs font-black text-white shadow sm:right-6 sm:top-6 sm:px-4 sm:py-2 sm:text-sm">
                  Out of Stock
                </div>
              ) : isLowStock ? (
                <div className="absolute right-4 top-4 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-black text-white shadow sm:right-6 sm:top-6 sm:px-4 sm:py-2 sm:text-sm">
                  Low Stock
                </div>
              ) : (
                <div className="absolute right-4 top-4 rounded-full bg-green-800 px-3 py-1.5 text-xs font-black text-white shadow sm:right-6 sm:top-6 sm:px-4 sm:py-2 sm:text-sm">
                  In Stock
                </div>
              )}

              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-green-950/85 px-3 py-2 text-xs font-bold text-white backdrop-blur sm:bottom-6 sm:left-6 sm:px-4 sm:text-sm">
                <Leaf
                  size={15}
                  className="text-lime-400"
                />
                Farm Fresh
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-14">

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 sm:text-sm">
                Chacha & Vatija Agro
              </span>

              <h1 className="mt-3 text-3xl font-black leading-tight text-green-950 sm:mt-4 sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <p className="mt-4 text-sm leading-7 text-gray-500 sm:mt-5">
                সরাসরি Chacha & Vatija Agro থেকে সংগ্রহ
                করা তাজা ও মানসম্মত পণ্য।
              </p>

              {/* PRICE */}
              <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-4 sm:mt-7 sm:p-5">
                <p className="text-xs font-semibold text-gray-500 sm:text-sm">
                  প্রতি {product.unit} মূল্য
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-3xl font-black text-green-800 sm:text-4xl">
                    ৳{product.price.toLocaleString()}
                  </span>

                  <span className="mb-1 text-xs text-gray-500 sm:text-sm">
                    / {product.unit}
                  </span>
                </div>
              </div>

              {/* STOCK */}
              <div className="mt-5 flex items-center gap-3 sm:mt-6">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isOutOfStock
                      ? "bg-red-50"
                      : isLowStock
                      ? "bg-amber-50"
                      : "bg-green-100"
                  }`}
                >
                  {isOutOfStock ? (
                    <AlertTriangle
                      size={19}
                      className="text-red-500"
                    />
                  ) : (
                    <Package
                      size={19}
                      className={
                        isLowStock
                          ? "text-amber-600"
                          : "text-green-700"
                      }
                    />
                  )}
                </div>

                <div>
                  <p className="text-[11px] text-gray-400 sm:text-xs">
                    Available Stock
                  </p>

                  <p
                    className={`text-xs font-bold sm:text-sm ${
                      isOutOfStock
                        ? "text-red-600"
                        : isLowStock
                        ? "text-amber-600"
                        : "text-green-900"
                    }`}
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : `${product.stock} ${product.unit} available`}
                  </p>
                </div>
              </div>

              {/* WARNINGS */}
              {isOutOfStock && (
                <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
                  <div className="flex gap-3">
                    <AlertTriangle
                      size={19}
                      className="shrink-0 text-red-500"
                    />

                    <div>
                      <p className="text-sm font-bold text-red-700">
                        এই পণ্যটি বর্তমানে unavailable
                      </p>

                      <p className="mt-1 text-xs leading-5 text-red-500">
                        নতুন stock আসলে আবার order করতে পারবেন।
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isLowStock && (
                <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <p className="text-xs font-bold text-amber-700 sm:text-sm">
                    ⚡ Stock সীমিত — দ্রুত অর্ডার করুন।
                  </p>
                </div>
              )}

              {/* QUANTITY */}
              {!isOutOfStock && (
                <>
                  <div className="mt-6 sm:mt-7">
                    <p className="mb-3 text-sm font-bold text-gray-700">
                      Quantity
                    </p>

                    <div className="flex w-fit items-center rounded-full border border-gray-200 bg-white shadow-sm">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="flex h-11 w-11 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-30 sm:h-12 sm:w-12"
                      >
                        <Minus size={17} />
                      </button>

                      <span className="w-12 text-center text-lg font-black text-green-950">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={increaseQuantity}
                        disabled={
                          quantity >= product.stock
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-full text-green-700 hover:bg-green-50 disabled:opacity-30 sm:h-12 sm:w-12"
                      >
                        <Plus size={17} />
                      </button>
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="mt-6 flex items-center justify-between border-t border-dashed border-gray-200 pt-5 sm:mt-7 sm:pt-6">
                    <span className="text-sm font-bold text-gray-500">
                      Total Price
                    </span>

                    <span className="text-2xl font-black text-green-800 sm:text-3xl">
                      ৳{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </>
              )}

              {/* CART BUTTON */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`mt-5 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl py-3.5 text-sm font-black text-white shadow-lg transition sm:mt-6 sm:text-base ${
                  isOutOfStock
                    ? "cursor-not-allowed bg-gray-300 shadow-none"
                    : added
                    ? "bg-emerald-500"
                    : "bg-green-800 hover:bg-green-700"
                }`}
              >
                {isOutOfStock ? (
                  <>
                    <Package size={20} />
                    Out of Stock
                  </>
                ) : added ? (
                  <>
                    <CheckCircle2 size={20} />
                    Cart এ যোগ হয়েছে
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Cart এ যোগ করুন
                  </>
                )}
              </button>

              {/* BADGES */}
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-xl bg-stone-50 p-3 text-center">
                  <CheckCircle2
                    size={18}
                    className="mx-auto text-green-700"
                  />

                  <p className="mt-2 text-[10px] font-bold text-gray-600 sm:text-[11px]">
                    Fresh
                  </p>
                </div>

                <div className="rounded-xl bg-stone-50 p-3 text-center">
                  <Truck
                    size={18}
                    className="mx-auto text-green-700"
                  />

                  <p className="mt-2 text-[10px] font-bold text-gray-600 sm:text-[11px]">
                    Delivery
                  </p>
                </div>

                <div className="rounded-xl bg-stone-50 p-3 text-center">
                  <ShieldCheck
                    size={18}
                    className="mx-auto text-green-700"
                  />

                  <p className="mt-2 text-[10px] font-bold text-gray-600 sm:text-[11px]">
                    Trusted
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="grid border-t border-gray-100 sm:grid-cols-3">

            <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:border-b-0 sm:border-r">
              <div className="rounded-xl bg-green-50 p-3 text-green-700">
                <Leaf size={19} />
              </div>

              <div>
                <p className="text-sm font-black text-green-950">
                  Farm Fresh
                </p>

                <p className="text-xs text-gray-500">
                  সরাসরি খামার থেকে
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:border-b-0 sm:border-r">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <Truck size={19} />
              </div>

              <div>
                <p className="text-sm font-black text-green-950">
                  Home Delivery
                </p>

                <p className="text-xs text-gray-500">
                  আপনার ঠিকানায় পৌঁছে দিই
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-5">
              <div className="rounded-xl bg-green-50 p-3 text-green-700">
                <Phone size={19} />
              </div>

              <div>
                <p className="text-sm font-black text-green-950">
                  Customer Support
                </p>

                <p className="text-xs text-gray-500">
                  প্রয়োজন হলে যোগাযোগ করুন
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20">

            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 sm:text-sm">
                You May Also Like
              </span>

              <h2 className="mt-2 text-2xl font-black text-green-950 sm:mt-3 sm:text-3xl">
                আরও কিছু পণ্য
              </h2>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:mt-8">
              {relatedProducts.map((item) => {
                const itemOutOfStock =
                  item.stock === 0;

                const itemLowStock =
                  item.stock > 0 &&
                  item.stock <= 5;

                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                  >
                    <div className="relative h-52 overflow-hidden sm:h-56">
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`h-full w-full object-cover ${
                          itemOutOfStock
                            ? "grayscale"
                            : ""
                        }`}
                      />

                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-green-900 sm:left-4 sm:top-4 sm:text-xs">
                        {item.category}
                      </span>

                      {itemOutOfStock && (
                        <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-black text-white">
                          Out of Stock
                        </span>
                      )}

                      {itemLowStock && (
                        <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-3 py-1.5 text-[10px] font-black text-white">
                          Low Stock
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-black text-green-950">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        ৳{item.price.toLocaleString()} /{" "}
                        {item.unit}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          onProductDetails(item)
                        }
                        className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-green-200 py-3 text-xs font-bold text-green-800 hover:bg-green-50 sm:text-sm"
                      >
                        বিস্তারিত দেখুন
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;