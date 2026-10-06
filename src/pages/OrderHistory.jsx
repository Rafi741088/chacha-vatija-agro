
import { useState } from "react";
import {
  ArrowLeft,
  PackageSearch,
  ShoppingBag,
  CheckCircle2,
  Clock3,
  Truck,
  MapPin,
  Phone,
  CalendarDays,
} from "lucide-react";

/* =========================
   LOAD ORDERS
========================= */

function loadOrders() {
  try {
    const savedOrders = localStorage.getItem("chacha_vatija_orders");
    const lastOrder = localStorage.getItem("chacha_vatija_last_order");

    let orders = [];

    // Load all saved orders
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);

      if (Array.isArray(parsedOrders)) {
        orders = parsedOrders;
      }
    }

    // Support existing last-order storage
    if (lastOrder) {
      const parsedLastOrder = JSON.parse(lastOrder);

      const exists = orders.some(
        (item) => item?.orderId === parsedLastOrder?.orderId
      );

      if (!exists && parsedLastOrder) {
        orders = [parsedLastOrder, ...orders];
      }
    }

    return orders;
  } catch (error) {
    console.error("Unable to load order history:", error);
    return [];
  }
}

/* =========================
   ORDER HISTORY
========================= */

function OrderHistory({ onBackToShop = () => {} }) {
  const [orders] = useState(loadOrders);

  /* =========================
     FORMAT DATE
  ========================= */

  const formatDate = (date) => {
    if (!date) {
      return "Recently";
    }

    try {
      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return "Recently";
      }

      return parsedDate.toLocaleString("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return "Recently";
    }
  };

  /* =========================
     STATUS ICON
  ========================= */

  const getStatusIcon = (status) => {
    const value = String(status || "").toLowerCase();

    if (value.includes("deliver")) {
      return <CheckCircle2 size={16} />;
    }

    if (value.includes("ship")) {
      return <Truck size={16} />;
    }

    if (value.includes("process")) {
      return <ShoppingBag size={16} />;
    }

    return <Clock3 size={16} />;
  };

  /* =========================
     STATUS CLASS
  ========================= */

  const getStatusClass = (status) => {
    const value = String(status || "").toLowerCase();

    if (value.includes("deliver")) {
      return "bg-green-100 text-green-800";
    }

    if (value.includes("cancel")) {
      return "bg-red-100 text-red-700";
    }

    if (value.includes("ship") || value.includes("process")) {
      return "bg-amber-100 text-amber-800";
    }

    return "bg-blue-100 text-blue-800";
  };

  /* =========================
     NO ORDERS
  ========================= */

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100">
            <PackageSearch
              size={38}
              className="text-green-800"
            />
          </div>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-amber-600">
            Chacha & Vatija Agro
          </p>

          <h1 className="mt-2 text-3xl font-black text-green-950">
            No Orders Yet
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            আপনি এখনো কোনো order করেননি।
            <br />
            আমাদের fresh agro products থেকে
            আপনার প্রয়োজনীয় পণ্য বেছে নিন।
          </p>

          <button
            type="button"
            onClick={onBackToShop}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white transition hover:bg-green-700"
          >
            <ArrowLeft size={17} />
            Start Shopping
          </button>
        </div>
      </main>
    );
  }

  /* =========================
     ORDER LIST
  ========================= */

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-8">
          <button
            type="button"
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-sm font-bold text-green-700 transition hover:text-green-900"
          >
            <ArrowLeft size={17} />
            Back to Shop
          </button>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
              <PackageSearch
                size={24}
                className="text-green-800"
              />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-wider text-amber-600">
                Chacha & Vatija Agro
              </p>

              <h1 className="mt-1 text-2xl font-black text-green-950 sm:text-3xl">
                Order History
              </h1>
            </div>
          </div>
        </div>

        {/* ORDERS */}

        <div className="space-y-6">
          {orders.map((order, index) => {
            const items = Array.isArray(order?.items)
              ? order.items
              : [];

            const calculatedSubtotal = items.reduce(
              (sum, item) => {
                const price = Number(item?.price) || 0;
                const quantity = Number(item?.quantity) || 0;

                return sum + price * quantity;
              },
              0
            );

            const savedSubtotal = Number(order?.subtotal);

            const subtotal = Number.isFinite(savedSubtotal)
              ? savedSubtotal
              : calculatedSubtotal;

            const delivery = Number(order?.deliveryCharge) || 0;

            const savedTotal = Number(order?.total);

            const total =
              Number.isFinite(savedTotal)
                ? savedTotal
                : subtotal + delivery;

            return (
              <article
                key={
                  order?.orderId ||
                  `order-${index}`
                }
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
              >

                {/* ORDER TOP */}

                <div className="border-b border-gray-100 p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                        Order ID
                      </p>

                      <h2 className="mt-1 break-all text-lg font-black text-green-950">
                        {order?.orderId || "Unknown Order"}
                      </h2>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">

                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={13} />

                          {formatDate(
                            order?.createdAt
                          )}
                        </span>

                        <span>
                          {items.length} product
                          {items.length !== 1
                            ? "s"
                            : ""}
                        </span>

                      </div>
                    </div>

                    <div
                      className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-black ${getStatusClass(
                        order?.status
                      )}`}
                    >
                      {getStatusIcon(
                        order?.status
                      )}

                      {order?.status ||
                        "Order Placed"}
                    </div>

                  </div>
                </div>

                {/* CUSTOMER */}

                <div className="grid gap-4 border-b border-gray-100 p-5 sm:grid-cols-3 sm:p-6">

                  <Info
                    icon={<Phone size={15} />}
                    label="Phone"
                    value={
                      order?.customer?.phone ||
                      order?.phone ||
                      "N/A"
                    }
                  />

                  <Info
                    icon={<MapPin size={15} />}
                    label="District"
                    value={
                      order?.customer?.district ||
                      order?.district ||
                      "N/A"
                    }
                  />

                  <Info
                    icon={<ShoppingBag size={15} />}
                    label="Payment"
                    value={
                      order?.paymentMethod ===
                      "cod"
                        ? "Cash on Delivery"
                        : order?.paymentMethod ||
                          "Cash on Delivery"
                    }
                  />

                </div>

                {/* PRODUCTS */}

                <div className="p-5 sm:p-6">

                  <h3 className="text-sm font-black text-green-950">
                    Products
                  </h3>

                  <div className="mt-4 space-y-3">

                    {items.length > 0 ? (
                      items.map(
                        (item, itemIndex) => {
                          const price =
                            Number(
                              item?.price
                            ) || 0;

                          const quantity =
                            Number(
                              item?.quantity
                            ) || 0;

                          const itemTotal =
                            price * quantity;

                          return (
                            <div
                              key={
                                item?.id ||
                                item?.productId ||
                                `item-${itemIndex}`
                              }
                              className="flex items-center gap-3 rounded-2xl bg-stone-50 p-3"
                            >

                              {/* IMAGE */}

                              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">

                                {item?.image ? (
                                  <img
                                    src={item.image}
                                    alt={
                                      item?.name ||
                                      "Product"
                                    }
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-[8px] text-gray-400">
                                    No Image
                                  </div>
                                )}

                              </div>

                              {/* PRODUCT */}

                              <div className="min-w-0 flex-1">

                                <p className="truncate text-sm font-bold text-green-950">
                                  {item?.name ||
                                    item?.title ||
                                    "Agro Product"}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                  ৳
                                  {price.toLocaleString()}
                                  {" × "}
                                  {quantity}
                                </p>

                              </div>

                              {/* ITEM TOTAL */}

                              <p className="shrink-0 text-sm font-black text-green-800">
                                ৳
                                {itemTotal.toLocaleString()}
                              </p>

                            </div>
                          );
                        }
                      )
                    ) : (
                      <div className="rounded-2xl bg-stone-50 p-4 text-center text-sm text-gray-500">
                        No product information available.
                      </div>
                    )}

                  </div>

                  {/* TOTAL */}

                  <div className="mt-5 border-t border-dashed border-gray-200 pt-5">

                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        Subtotal
                      </span>

                      <span className="font-bold text-gray-800">
                        ৳
                        {subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span>
                        Delivery
                      </span>

                      <span className="font-bold text-gray-800">
                        ৳
                        {delivery.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">

                      <span className="font-black text-green-950">
                        Total
                      </span>

                      <span className="text-xl font-black text-green-800">
                        ৳
                        {total.toLocaleString()}
                      </span>

                    </div>

                  </div>

                </div>

              </article>
            );
          })}
        </div>

        {/* FOOTER ACTION */}

        <div className="mt-8 text-center">

          <button
            type="button"
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-6 py-3 text-sm font-bold text-green-800 transition hover:bg-green-50"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>

        </div>

      </div>
    </main>
  );
}

/* =========================
   INFO COMPONENT
========================= */

function Info({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[9px] font-black uppercase tracking-wider text-gray-400">
          {label}
        </p>

        <p className="mt-1 break-words text-xs font-bold text-green-950">
          {value}
        </p>

      </div>

    </div>
  );
}

export default OrderHistory;

