import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Trash,
  PackageCheck,
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
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal > 0 ? 80 : 0;

  const total =
    subtotal + deliveryCharge;

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <>
      {/* OVERLAY */}

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        />
      )}

      {/* DRAWER */}

      <aside
        className={`fixed right-0 top-0 z-[70] flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* ================= HEADER ================= */}

        <div className="border-b border-gray-100 bg-white px-5 py-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                <ShoppingBag
                  size={21}
                  className="text-green-700"
                />
              </div>

              <div>

                <h2 className="text-xl font-black text-green-950">
                  আপনার Cart
                </h2>

                <p className="mt-0.5 text-xs text-gray-500">
                  {totalItems} টি item selected
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close cart"
            >
              <X size={22} />
            </button>

          </div>

        </div>

        {/* ================= CART CONTENT ================= */}

        <div className="flex-1 overflow-y-auto px-5 py-5">

          {cart.length === 0 ? (

            /* EMPTY CART */

            <div className="flex h-full flex-col items-center justify-center text-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-50">

                <ShoppingBag
                  size={38}
                  className="text-green-700"
                />

              </div>

              <h3 className="mt-6 text-xl font-black text-green-950">
                আপনার Cart খালি
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                Shop থেকে আপনার পছন্দের
                পণ্য Cart-এ যোগ করুন।
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-7 rounded-full bg-green-800 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-700"
              >
                Shopping শুরু করুন
              </button>

            </div>

          ) : (

            <div className="space-y-4">

              {/* CART INFO */}

              <div className="flex items-center justify-between rounded-2xl bg-green-50 px-4 py-3">

                <div className="flex items-center gap-2">

                  <PackageCheck
                    size={18}
                    className="text-green-700"
                  />

                  <span className="text-sm font-bold text-green-900">
                    Farm Fresh Order
                  </span>

                </div>

                <span className="text-xs font-semibold text-green-700">
                  COD Available
                </span>

              </div>

              {/* PRODUCTS */}

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-stone-50 p-3 transition hover:border-green-200"
                >

                  <div className="flex gap-3">

                    {/* IMAGE */}

                    <div className="relative shrink-0">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-xl object-cover"
                      />

                      <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-green-800 px-1 text-[10px] font-black text-white shadow">
                        {item.quantity}
                      </span>

                    </div>

                    {/* INFO */}

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">

                          <h3 className="truncate font-black text-green-950">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            ৳
                            {item.price.toLocaleString()}
                            {" / "}
                            {item.unit}
                          </p>

                        </div>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                          className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                      {/* QUANTITY */}

                      <div className="mt-4 flex items-center justify-between">

                        <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-sm">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-9 text-center text-sm font-black text-green-950">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                            disabled={
                              item.quantity >=
                              item.stock
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>

                        </div>

                        <p className="font-black text-green-800">
                          ৳
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString()}
                        </p>

                      </div>

                      {/* STOCK WARNING */}

                      {item.quantity >=
                        item.stock && (
                        <p className="mt-2 text-[11px] font-semibold text-amber-600">
                          Maximum available stock reached
                        </p>
                      )}

                    </div>

                  </div>

                </div>

              ))}

              {/* CLEAR CART */}

              <button
                type="button"
                onClick={() => {
                  cart.forEach((item) =>
                    removeFromCart(
                      item.id
                    )
                  );
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 py-3 text-xs font-bold text-red-500 transition hover:bg-red-50"
              >
                <Trash size={15} />
                Cart খালি করুন
              </button>

            </div>
          )}

        </div>

        {/* ================= FOOTER ================= */}

        {cart.length > 0 && (

          <div className="border-t border-gray-100 bg-white p-5">

            {/* SUMMARY */}

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-bold text-gray-900">
                  ৳
                  {subtotal.toLocaleString()}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Delivery Charge
                </span>

                <span className="font-bold text-gray-900">
                  ৳
                  {deliveryCharge.toLocaleString()}
                </span>

              </div>

              <div className="border-t border-dashed border-gray-200 pt-4">

                <div className="flex items-center justify-between">

                  <span className="text-lg font-black text-green-950">
                    Total
                  </span>

                  <span className="text-2xl font-black text-green-800">
                    ৳
                    {total.toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

            {/* CHECKOUT */}

            <button
              type="button"
              onClick={onCheckout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 py-4 font-black text-white shadow-lg shadow-green-900/20 transition duration-300 hover:bg-green-700"
            >
              Checkout করুন
              <ArrowRight size={19} />
            </button>

            {/* PAYMENT INFO */}

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">

              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              Cash on Delivery Available

            </div>

          </div>

        )}

      </aside>
    </>
  );
}

export default CartDrawer;