
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

function CartDrawer({
  cart,
  isOpen,
  onClose,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  onCheckout,
}) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal > 0 ? 80 : 0;
  const total = subtotal + deliveryCharge;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* Cart Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
          <div>
            <h2 className="text-xl font-black text-green-950">
              আপনার Cart
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              আপনার নির্বাচিত পণ্যগুলো
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                <ShoppingBag
                  size={32}
                  className="text-green-700"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-green-950">
                আপনার Cart খালি
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                Shop থেকে আপনার পছন্দের পণ্য Cart-এ যোগ করুন।
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full bg-green-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700"
              >
                Shopping শুরু করুন
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-stone-50 p-3"
                >
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    {/* Product Information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-green-950">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            ৳{item.price.toLocaleString()} /{" "}
                            {item.unit}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      {/* Quantity + Item Total */}
                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center rounded-full border border-gray-200 bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-8 text-center text-sm font-bold text-green-950">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full text-green-700 transition hover:bg-green-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Item Total */}
                        <p className="font-black text-green-800">
                          ৳
                          {(
                            item.price * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Summary */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 bg-white p-5">
            <div className="space-y-3 text-sm">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold text-gray-900">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              {/* Delivery */}
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-semibold text-gray-900">
                  ৳{deliveryCharge.toLocaleString()}
                </span>
              </div>

              {/* Total */}
              <div className="border-t border-dashed border-gray-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-950">
                    Total
                  </span>

                  <span className="text-2xl font-black text-green-800">
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={onCheckout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 py-4 font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-700"
            >
              Checkout করুন
              <ArrowRight size={19} />
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              Cash on Delivery available
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;

