import {
  PackageCheck,
  Truck,
  CheckCircle2,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const LAST_ORDER_STORAGE_KEY =
  "chacha_vatija_last_order";

function Order() {
  let order = null;

  try {
    const savedOrder = localStorage.getItem(
      LAST_ORDER_STORAGE_KEY
    );

    if (savedOrder) {
      order = JSON.parse(savedOrder);
    }
  } catch (error) {
    console.error(
      "Failed to load order:",
      error
    );
  }

  // No order found
  if (!order) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-12 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-green-100 bg-white p-6 text-center shadow-xl sm:p-10">
            
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <ShoppingBag
                size={38}
                className="text-green-700"
              />
            </div>

            <h1 className="mt-6 text-2xl font-black text-green-950 sm:text-3xl">
              No Order Found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              আপনার কোনো recent order পাওয়া যায়নি।
              আগে একটি order করুন।
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-green-800 px-6 py-3 text-sm font-black text-white transition hover:bg-green-700"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>

          </div>
        </div>
      </main>
    );
  }

  const orderId =
    order.orderId || "N/A";

  const items = Array.isArray(order.items)
    ? order.items
    : [];

  const subtotal = Number(
    order.subtotal || 0
  );

  const deliveryCharge = Number(
    order.deliveryCharge || 0
  );

  const total = Number(
    order.total ??
      subtotal + deliveryCharge
  );

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-4xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-green-800 transition hover:text-green-600"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {/* =====================================================
            ORDER CARD
        ===================================================== */}

        <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl">

          {/* HEADER */}

          <div className="bg-green-900 px-5 py-10 text-center text-white sm:px-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white">
              <CheckCircle2
                size={48}
                strokeWidth={2.5}
                className="text-green-700"
              />
            </div>

            <h1 className="mt-6 text-2xl font-black sm:text-4xl">
              Your Order
            </h1>

            <p className="mt-3 text-sm text-green-100 sm:text-base">
              আপনার order-এর বিস্তারিত তথ্য এখানে দেখুন।
            </p>

          </div>

          {/* CONTENT */}

          <div className="p-5 sm:p-8">

            {/* =================================================
                ORDER ID
            ================================================= */}

            <div className="rounded-2xl border border-green-100 bg-green-50 p-5 text-center">

              <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                Order ID
              </p>

              <p className="mt-2 break-all text-2xl font-black tracking-wide text-green-950">
                {orderId}
              </p>

            </div>

            {/* =================================================
                STATUS
            ================================================= */}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              {/* RECEIVED */}

              <div className="rounded-2xl bg-stone-50 p-5 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <PackageCheck
                    size={24}
                    className="text-green-700"
                  />
                </div>

                <h3 className="mt-3 text-sm font-black text-green-950">
                  Order Received
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  আপনার order আমরা পেয়েছি।
                </p>

              </div>

              {/* PREPARING */}

              <div className="rounded-2xl bg-stone-50 p-5 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <PackageCheck
                    size={24}
                    className="text-amber-600"
                  />
                </div>

                <h3 className="mt-3 text-sm font-black text-green-950">
                  Preparing
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  আপনার পণ্য প্রস্তুত করা হবে।
                </p>

              </div>

              {/* DELIVERY */}

              <div className="rounded-2xl bg-stone-50 p-5 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Truck
                    size={24}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="mt-3 text-sm font-black text-green-950">
                  Delivery
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  আপনার ঠিকানায় delivery দেওয়া হবে।
                </p>

              </div>

            </div>

            {/* =================================================
                PRODUCTS
            ================================================= */}

            <div className="mt-8">

              <h2 className="text-xl font-black text-green-950">
                Ordered Products
              </h2>

              <div className="mt-4 space-y-3">

                {items.length > 0 ? (
                  items.map((item, index) => {

                    const quantity = Number(
                      item.quantity || 1
                    );

                    const price = Number(
                      item.price || 0
                    );

                    const itemTotal =
                      price * quantity;

                    return (
                      <div
                        key={
                          item.id ||
                          `${item.name}-${index}`
                        }
                        className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-stone-50 p-4"
                      >

                        <div className="min-w-0">

                          <h3 className="truncate text-sm font-black text-green-950">
                            {item.name ||
                              "Product"}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            Quantity: {quantity}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Unit Price: ৳
                            {price.toLocaleString(
                              "en-BD"
                            )}
                          </p>

                        </div>

                        <p className="shrink-0 text-sm font-black text-green-800">
                          ৳
                          {itemTotal.toLocaleString(
                            "en-BD"
                          )}
                        </p>

                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-2xl bg-stone-50 p-5 text-center text-sm text-gray-500">
                    No product information available.
                  </div>
                )}

              </div>

            </div>

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <div className="mt-8 rounded-2xl border border-gray-100 bg-stone-50 p-5">

              <h2 className="text-lg font-black text-green-950">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3">

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-bold text-gray-800">
                    ৳
                    {subtotal.toLocaleString(
                      "en-BD"
                    )}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">
                    Delivery Charge
                  </span>

                  <span className="font-bold text-gray-800">
                    ৳
                    {deliveryCharge.toLocaleString(
                      "en-BD"
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between gap-4">

                    <span className="font-black text-green-950">
                      Total
                    </span>

                    <span className="text-2xl font-black text-green-800">
                      ৳
                      {total.toLocaleString(
                        "en-BD"
                      )}
                    </span>

                  </div>
                </div>

              </div>

            </div>

            {/* =================================================
                CUSTOMER INFORMATION
            ================================================= */}

            {(order.name ||
              order.phone ||
              order.address) && (
              <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5">

                <h2 className="text-lg font-black text-green-950">
                  Customer Information
                </h2>

                <div className="mt-4 space-y-3 text-sm">

                  {order.name && (
                    <div>
                      <span className="font-bold text-gray-700">
                        Name:
                      </span>{" "}
                      <span className="text-gray-500">
                        {order.name}
                      </span>
                    </div>
                  )}

                  {order.phone && (
                    <div>
                      <span className="font-bold text-gray-700">
                        Phone:
                      </span>{" "}
                      <span className="text-gray-500">
                        {order.phone}
                      </span>
                    </div>
                  )}

                  {order.address && (
                    <div>
                      <span className="font-bold text-gray-700">
                        Address:
                      </span>{" "}
                      <span className="text-gray-500">
                        {order.address}
                      </span>
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* =================================================
                BUTTON
            ================================================= */}

            <Link
              to="/"
              className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-green-800 px-5 py-3 text-sm font-black text-white transition hover:bg-green-700"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>

            {/* THANK YOU */}

            <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-center">
              <p className="text-xs leading-5 text-amber-800">
                💚 Chacha & Vatija Agro থেকে কেনাকাটা
                করার জন্য ধন্যবাদ।
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Order;