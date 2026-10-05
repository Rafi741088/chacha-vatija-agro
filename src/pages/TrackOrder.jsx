
import { useState } from "react";
import {
  Search,
  PackageSearch,
  CheckCircle2,
  Clock3,
  Truck,
  MapPin,
  Phone,
  UserRound,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

function TrackOrder({ onBackToShop = () => {} }) {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const searchId = orderId.trim().toUpperCase();

    setSearched(true);
    setOrder(null);

    if (!searchId) {
      return;
    }

    try {
      const savedOrder = localStorage.getItem(
        "chacha_vatija_last_order"
      );

      if (!savedOrder) {
        return;
      }

      const parsedOrder = JSON.parse(savedOrder);

      const savedOrderId = String(
        parsedOrder?.orderId || ""
      ).toUpperCase();

      if (savedOrderId === searchId) {
        setOrder(parsedOrder);
      }
    } catch (error) {
      console.error(
        "Unable to read order:",
        error
      );
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "Recently";
    }

    try {
      return new Date(date).toLocaleString(
        "en-BD",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      );
    } catch {
      return "Recently";
    }
  };

  const status = String(
    order?.status || "Order Placed"
  );

  const isConfirmed =
    status === "Confirmed" ||
    status === "Processing" ||
    status === "Shipped" ||
    status === "Delivered";

  const isProcessing =
    status === "Processing" ||
    status === "Shipped" ||
    status === "Delivered";

  const isShipped =
    status === "Shipped" ||
    status === "Delivered";

  const isDelivered =
    status === "Delivered";

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ================= HEADER ================= */}

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
            <PackageSearch
              size={32}
              className="text-green-800"
            />
          </div>

          <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-amber-600">
            Chacha & Vatija Agro
          </p>

          <h1 className="mt-2 text-3xl font-black text-green-950 sm:text-4xl">
            Track Your Order
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
            আপনার Order ID দিয়ে আপনার order-এর
            বর্তমান status দেখুন।
          </p>
        </div>

        {/* ================= SEARCH ================= */}

        <section className="mx-auto mt-8 max-w-2xl rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={orderId}
                onChange={(event) =>
                  setOrderId(event.target.value)
                }
                placeholder="যেমন: CV-12345678"
                className="min-h-13 w-full rounded-2xl border border-gray-200 pl-11 pr-4 text-sm font-semibold uppercase outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              className="flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-green-800 px-7 text-sm font-black text-white transition hover:bg-green-700"
            >
              <Search size={18} />
              Track Order
            </button>
          </form>

          <p className="mt-3 text-center text-[11px] text-gray-400 sm:text-left">
            Order confirmation-এর সময় পাওয়া Order ID
            ব্যবহার করুন।
          </p>
        </section>

        {/* ================= NOT FOUND ================= */}

        {searched && !order && (
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-red-100 bg-red-50 p-5 text-center">
            <p className="text-sm font-black text-red-700">
              Order পাওয়া যায়নি
            </p>

            <p className="mt-1 text-xs leading-5 text-red-600">
              Order ID সঠিকভাবে লিখেছেন কিনা
              পরীক্ষা করুন।
            </p>
          </div>
        )}

        {/* ================= ORDER ================= */}

        {order && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">

            {/* LEFT */}

            <div className="space-y-6">

              {/* ORDER HEADER */}

              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Order ID
                    </p>

                    <h2 className="mt-1 break-all text-2xl font-black text-green-950">
                      {order.orderId}
                    </h2>

                    <p className="mt-2 text-xs text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-black text-green-800">
                    <CheckCircle2 size={15} />
                    {status}
                  </div>
                </div>
              </section>

              {/* STATUS */}

              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <h2 className="text-lg font-black text-green-950">
                  Order Status
                </h2>

                <div className="mt-7 space-y-6">

                  <StatusStep
                    active
                    complete
                    icon={<CheckCircle2 size={18} />}
                    title="Order Placed"
                    text="আপনার order successfully received হয়েছে।"
                  />

                  <StatusStep
                    active={isConfirmed}
                    complete={isConfirmed}
                    icon={<Clock3 size={18} />}
                    title="Confirmed"
                    text="Farm team আপনার order confirm করবে।"
                  />

                  <StatusStep
                    active={isProcessing}
                    complete={isProcessing}
                    icon={<ShoppingBag size={18} />}
                    title="Processing"
                    text="আপনার fresh products প্রস্তুত করা হচ্ছে।"
                  />

                  <StatusStep
                    active={isShipped}
                    complete={isShipped}
                    icon={<Truck size={18} />}
                    title="Shipped"
                    text="Order delivery-এর জন্য পাঠানো হয়েছে।"
                  />

                  <StatusStep
                    active={isDelivered}
                    complete={isDelivered}
                    icon={<CheckCircle2 size={18} />}
                    title="Delivered"
                    text="Order successfully delivered হয়েছে।"
                  />

                </div>
              </section>

              {/* PRODUCTS */}

              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-center gap-3">
                  <ShoppingBag
                    size={20}
                    className="text-green-700"
                  />

                  <h2 className="text-lg font-black text-green-950">
                    Ordered Products
                  </h2>
                </div>

                <div className="mt-6 space-y-4">
                  {Array.isArray(order.items) &&
                    order.items.map(
                      (item, index) => {
                        const price =
                          Number(item?.price) || 0;

                        const quantity =
                          Number(item?.quantity) || 0;

                        const total =
                          price * quantity;

                        return (
                          <div
                            key={
                              item?.id ||
                              `item-${index}`
                            }
                            className="flex gap-4 rounded-2xl bg-stone-50 p-3"
                          >
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
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
                                <div className="flex h-full w-full items-center justify-center text-[9px] text-gray-400">
                                  No Image
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="truncate text-sm font-black text-green-950">
                                {item?.name ||
                                  "Agro Product"}
                              </h3>

                              <p className="mt-1 text-xs text-gray-500">
                                ৳
                                {price.toLocaleString()}{" "}
                                × {quantity}
                              </p>
                            </div>

                            <p className="shrink-0 text-sm font-black text-green-800">
                              ৳
                              {total.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                    )}
                </div>
              </section>
            </div>

            {/* RIGHT */}

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                <h2 className="text-lg font-black text-green-950">
                  Delivery Information
                </h2>

                <div className="mt-5 space-y-4">

                  <InfoRow
                    icon={<UserRound size={17} />}
                    label="Customer"
                    value={
                      order.customer?.name ||
                      "N/A"
                    }
                  />

                  <InfoRow
                    icon={<Phone size={17} />}
                    label="Phone"
                    value={
                      order.customer?.phone ||
                      "N/A"
                    }
                  />

                  <InfoRow
                    icon={<MapPin size={17} />}
                    label="District"
                    value={
                      order.customer?.district ||
                      "N/A"
                    }
                  />

                  <div className="rounded-2xl bg-stone-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      Address
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-6 text-gray-700">
                      {order.customer?.address ||
                        "N/A"}
                    </p>
                  </div>
                </div>

                {/* PRICE */}

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>

                    <span className="font-bold text-gray-800">
                      ৳
                      {(
                        Number(
                          order.subtotal
                        ) || 0
                      ).toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between text-sm text-gray-500">
                    <span>Delivery</span>

                    <span className="font-bold text-gray-800">
                      ৳
                      {(
                        Number(
                          order.deliveryCharge
                        ) || 0
                      ).toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-4 border-t border-dashed border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-green-950">
                        Total
                      </span>

                      <span className="text-2xl font-black text-green-800">
                        ৳
                        {(
                          Number(order.total) || 0
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-green-50 p-4">
                  <p className="text-xs font-black text-green-800">
                    Payment Method
                  </p>

                  <p className="mt-1 text-sm font-bold text-green-950">
                    {order.paymentMethod ===
                    "cod"
                      ? "Cash on Delivery"
                      : order.paymentMethod ||
                        "Cash on Delivery"}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* ================= BACK ================= */}

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-3 text-sm font-bold text-green-800 transition hover:bg-green-50"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </button>
        </div>
      </div>
    </main>
  );
}

/* =========================
   STATUS STEP
========================= */

function StatusStep({
  active = false,
  complete = false,
  icon,
  title,
  text,
}) {
  return (
    <div className="relative flex gap-4">
      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          complete
            ? "bg-green-800 text-white"
            : active
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-400"
        }`}
      >
        {icon}
      </div>

      <div className="pt-1">
        <p
          className={`text-sm font-black ${
            complete || active
              ? "text-green-950"
              : "text-gray-400"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================
   INFO ROW
========================= */

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-bold text-green-950">
          {value}
        </p>
      </div>
    </div>
  );
}

export default TrackOrder;

