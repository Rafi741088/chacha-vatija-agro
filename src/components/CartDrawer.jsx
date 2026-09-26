
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartDrawer({
  isOpen = false,
  onClose = () => {},

  cart = [],
  cartCount = 0,

  cartSubtotal = 0,
  deliveryCharge = 0,
  cartTotal = 0,

  increaseQuantity = () => {},
  decreaseQuantity = () => {},
  removeFromCart = () => {},
  clearCart = () => {},
}) {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  /*
    Safety calculation:
    যদি App থেকে subtotal/total undefined আসে,
    তাহলে Cart থেকেই হিসাব করবে।
  */

  const safeCart = Array.isArray(cart) ? cart : [];

  const calculatedCartCount = safeCart.reduce(
    (total, item) =>
      total + Number(item?.quantity || 0),
    0
  );

  const safeCartCount =
    Number(cartCount) || calculatedCartCount;

  const calculatedSubtotal = safeCart.reduce(
    (total, item) =>
      total +
      Number(item?.price || 0) *
        Number(item?.quantity || 0),
    0
  );

  const safeSubtotal =
    Number(cartSubtotal) || calculatedSubtotal;

  /*
    যদি deliveryCharge না আসে,
    cart থাকলে default ৳80
  */

  const safeDeliveryCharge =
    Number(deliveryCharge) ||
    (safeCart.length > 0 ? 80 : 0);

  const calculatedTotal =
    safeSubtotal + safeDeliveryCharge;

  const safeTotal =
    Number(cartTotal) || calculatedTotal;

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 flex h-[100dvh] w-full max-w-md flex-col bg-white shadow-2xl sm:w-[430px]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <ShoppingCart
                size={20}
                className="text-green-800"
              />
            </div>

            <div>
              <h2 className="text-base font-black text-green-950 sm:text-lg">
                Your Cart
              </h2>

              <p className="text-xs text-gray-500">
                {safeCartCount} টি পণ্য
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close cart"
          >
            <X size={21} />
          </button>
        </div>

        {/* Empty Cart */}
        {safeCart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <ShoppingCart
                size={34}
                className="text-green-700"
              />
            </div>

            <h3 className="mt-5 text-xl font-black text-green-950">
              আপনার Cart খালি
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
              আপনার পছন্দের তাজা মাছ, ছাগল ও মুরগি
              Cart-এ যোগ করুন।
            </p>

            <button
              type="button"
              onClick={() => {
                onClose();

                setTimeout(() => {
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white transition hover:bg-green-700"
            >
              Shop Now
              <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
              <div className="space-y-3">
                {safeCart.map((item) => {
                  const itemPrice = Number(
                    item?.price || 0
                  );

                  const itemQuantity = Number(
                    item?.quantity || 0
                  );

                  const itemTotal =
                    itemPrice * itemQuantity;

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-gray-100 bg-stone-50 p-3"
                    >
                      <div className="flex gap-3">
                        {/* Product Image */}
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-24">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold uppercase tracking-wide text-green-700">
                                {item.category}
                              </p>

                              <h3 className="mt-1 truncate text-sm font-black text-green-950">
                                {item.name}
                              </h3>

                              <p className="mt-1 text-xs text-gray-500">
                                ৳
                                {itemPrice.toLocaleString()}{" "}
                                / {item.unit}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item.id)
                              }
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          {/* Quantity */}
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center overflow-hidden rounded-full border border-gray-200 bg-white">
                              <button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(
                                    item.id
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-gray-100"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>

                              <span className="flex min-w-8 justify-center text-xs font-black text-green-950">
                                {itemQuantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  increaseQuantity(
                                    item.id
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-gray-100"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <p className="text-sm font-black text-green-800">
                              ৳
                              {itemTotal.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clear Cart */}
              <button
                type="button"
                onClick={clearCart}
                className="mt-4 text-xs font-bold text-red-500 transition hover:text-red-700"
              >
                সব পণ্য Remove করুন
              </button>
            </div>

            {/* Bottom Summary */}
            <div className="shrink-0 border-t border-gray-100 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-5">
              {/* Benefits */}
              <div className="mb-4 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 rounded-xl bg-green-50 p-2.5">
                  <Truck
                    size={17}
                    className="shrink-0 text-green-700"
                  />

                  <span className="text-[10px] font-bold leading-4 text-green-800 sm:text-xs">
                    Home Delivery
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-2.5">
                  <ShieldCheck
                    size={17}
                    className="shrink-0 text-amber-600"
                  />

                  <span className="text-[10px] font-bold leading-4 text-amber-800 sm:text-xs">
                    Fresh & Trusted
                  </span>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-gray-500">
                  <span>Subtotal</span>

                  <span className="font-semibold text-gray-800">
                    ৳{safeSubtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-500">
                  <span>Delivery Charge</span>

                  <span className="font-semibold text-gray-800">
                    ৳
                    {safeDeliveryCharge.toLocaleString()}
                  </span>
                </div>

                <div className="my-3 border-t border-dashed border-gray-200" />

                <div className="flex items-center justify-between">
                  <span className="font-black text-green-950">
                    Total
                  </span>

                  <span className="text-xl font-black text-green-800">
                    ৳{safeTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout */}
              <button
                type="button"
                onClick={handleCheckout}
                className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-green-800 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-green-900/10 transition hover:bg-green-700 active:scale-[0.99]"
              >
                Checkout করুন
                <ArrowRight size={18} />
              </button>

              <p className="mt-3 text-center text-[10px] leading-4 text-gray-400 sm:text-xs">
                Checkout-এ গিয়ে আপনার নাম, ফোন,
                ঠিকানা ও delivery information দিন।
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;

