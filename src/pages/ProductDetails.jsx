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
      <section className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-5">
        <div className="text-center">
          <h1 className="text-3xl font-black text-green-950">
            Product not found
          </h1>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 rounded-full bg-green-800 px-7 py-3 font-bold text-white transition hover:bg-green-700"
          >
            Back to Shop
          </button>
        </div>
      </section>
    );
  }

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
    <section className="min-h-screen bg-stone-50 px-5 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">

        {/* BACK */}
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-green-800 transition hover:text-green-600"
        >
          <ArrowLeft size={18} />
          Shop এ ফিরে যান
        </button>

        {/* MAIN PRODUCT */}
        <div className="overflow-hidden rounded-[2rem] border border-green-900/10 bg-white shadow-xl">

          <div className="grid lg:grid-cols-2">

            {/* IMAGE */}
            <div className="relative min-h-[420px] overflow-hidden bg-stone-100 lg:min-h-[650px]">

              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute left-6 top-6 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-green-900 shadow-lg">
                {product.category}
              </div>

              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-green-950/85 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                <Leaf
                  size={16}
                  className="text-lime-400"
                />
                Farm Fresh
              </div>

            </div>

            {/* INFORMATION */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-600">
                Chacha & Vatija Agro
              </span>

              <h1 className="mt-4 text-4xl font-black leading-tight text-green-950 sm:text-5xl">
                {product.name}
              </h1>

              <p className="mt-5 leading-7 text-gray-500">
                সরাসরি Chacha & Vatija Agro থেকে সংগ্রহ
                করা তাজা ও মানসম্মত পণ্য। আমাদের খামারে
                যত্নসহকারে পণ্যটি প্রস্তুত করা হয়।
              </p>

              {/* PRICE */}
              <div className="mt-7 rounded-2xl border border-green-100 bg-green-50 p-5">

                <p className="text-sm font-semibold text-gray-500">
                  প্রতি {product.unit} মূল্য
                </p>

                <div className="mt-1 flex items-end gap-2">

                  <span className="text-4xl font-black text-green-800">
                    ৳{product.price.toLocaleString()}
                  </span>

                  <span className="mb-1 text-sm text-gray-500">
                    / {product.unit}
                  </span>

                </div>

              </div>

              {/* STOCK */}
              <div className="mt-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                  <Package
                    size={20}
                    className="text-green-700"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Available Stock
                  </p>

                  <p className="font-bold text-green-900">
                    {product.stock} {product.unit} available
                  </p>
                </div>

              </div>

              {/* QUANTITY */}
              <div className="mt-7">

                <p className="mb-3 text-sm font-bold text-gray-700">
                  Quantity
                </p>

                <div className="flex w-fit items-center rounded-full border border-gray-200 bg-white shadow-sm">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-12 w-12 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 disabled:opacity-30"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="w-14 text-center text-lg font-black text-green-950">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="flex h-12 w-12 items-center justify-center rounded-full text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Plus size={17} />
                  </button>

                </div>

              </div>

              {/* TOTAL */}
              <div className="mt-7 flex items-center justify-between border-t border-dashed border-gray-200 pt-6">

                <span className="font-bold text-gray-500">
                  Total Price
                </span>

                <span className="text-3xl font-black text-green-800">
                  ৳{totalPrice.toLocaleString()}
                </span>

              </div>

              {/* ADD TO CART */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`mt-6 flex w-full items-center justify-center gap-3 rounded-xl py-4 font-black text-white shadow-lg transition-all duration-300 ${
                  added
                    ? "bg-emerald-500 shadow-emerald-900/20"
                    : "bg-green-800 shadow-green-900/20 hover:bg-green-700"
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle2 size={21} />
                    Cart এ যোগ হয়েছে
                  </>
                ) : (
                  <>
                    <ShoppingCart size={21} />
                    Cart এ যোগ করুন
                  </>
                )}
              </button>

              {/* BENEFITS */}
              <div className="mt-7 grid grid-cols-3 gap-3">

                <div className="rounded-xl bg-stone-50 p-3 text-center">
                  <CheckCircle2
                    size={19}
                    className="mx-auto text-green-700"
                  />

                  <p className="mt-2 text-[11px] font-bold text-gray-600">
                    Fresh
                  </p>
                </div>

                <div className="rounded-xl bg-stone-50 p-3 text-center">
                  <Truck
                    size={19}
                    className="mx-auto text-green-700"
                  />

                  <p className="mt-2 text-[11px] font-bold text-gray-600">
                    Delivery
                  </p>
                </div>

                <div className="rounded-xl bg-stone-50 p-3 text-center">
                  <ShieldCheck
                    size={19}
                    className="mx-auto text-green-700"
                  />

                  <p className="mt-2 text-[11px] font-bold text-gray-600">
                    Trusted
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* INFO STRIP */}
          <div className="grid border-t border-gray-100 sm:grid-cols-3">

            <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:border-b-0 sm:border-r">
              <div className="rounded-xl bg-green-50 p-3 text-green-700">
                <Leaf size={20} />
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
                <Truck size={20} />
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
                <Phone size={20} />
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
          <div className="mt-20">

            <div className="text-center">

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-600">
                You May Also Like
              </span>

              <h2 className="mt-3 text-3xl font-black text-green-950">
                আরও কিছু পণ্য
              </h2>

            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {relatedProducts.map((item) => (

                <div
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="relative h-56 overflow-hidden">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-green-900">
                      {item.category}
                    </span>

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
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 py-3 text-sm font-bold text-green-800 transition hover:bg-green-50"
                    >
                      বিস্তারিত দেখুন
                      <ArrowRight size={16} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default ProductDetails;