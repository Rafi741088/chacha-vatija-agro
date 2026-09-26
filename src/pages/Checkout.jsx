
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  Phone,
  UserRound,
  ShoppingBag,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({
  cart = [],
  cartSubtotal = 0,
  deliveryCharge = 0,
  cartTotal = 0,
  clearCart = () => {},
}) {
  const navigate = useNavigate();

  const safeCart = Array.isArray(cart) ? cart : [];

  // Safety calculation
  const calculatedSubtotal = safeCart.reduce(
    (total, item) =>
      total +
      Number(item?.price || 0) *
        Number(item?.quantity || 0),
    0
  );

  const safeSubtotal =
    Number(cartSubtotal) || calculatedSubtotal;

  const safeDeliveryCharge =
    Number(deliveryCharge) ||
    (safeCart.length > 0 ? 80 : 0);

  const calculatedTotal =
    safeSubtotal + safeDeliveryCharge;

  const safeTotal =
    Number(cartTotal) || calculatedTotal;

  const totalItems = safeCart.reduce(
    (total, item) =>
      total + Number(item?.quantity || 0),
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    address: "",
    note: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "আপনার নাম লিখুন";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "মোবাইল নম্বর লিখুন";
    } else if (
      !/^01[3-9]\d{8}$/.test(
        formData.phone.trim()
      )
    ) {
      newErrors.phone =
        "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন";
    }

    if (!formData.district) {
      newErrors.district = "জেলা নির্বাচন করুন";
    }

    if (!formData.address.trim()) {
      newErrors.address = "সম্পূর্ণ ঠিকানা লিখুন";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const order = {
      orderId: `CVA-${Date.now()
        .toString()
        .slice(-8)}`,

      customer: {
        ...formData,
      },

      paymentMethod,

      items: safeCart,

      subtotal: safeSubtotal,

      deliveryCharge: safeDeliveryCharge,

      total: safeTotal,

      status: "Order Placed",

      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "chacha-vatija-last-order",
      JSON.stringify(order)
    );

    clearCart();

    navigate("/order-success", {
      state: {
        order,
      },
    });
  };

  // Empty Cart
  if (safeCart.length === 0) {
    return (
      <main className="min-h-[calc(100dvh-72px)] bg-stone-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <ShoppingBag
              size={34}
              className="text-green-700"
            />
          </div>

          <h1 className="mt-5 text-2xl font-black text-green-950">
            আপনার Cart খালি
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Checkout করার জন্য প্রথমে কিছু পণ্য Cart-এ
            যোগ করুন।
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-green-800 px-6 py-3 text-sm font-black text-white transition hover:bg-green-700"
          >
            <ArrowLeft size={17} />
            Shopping শুরু করুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100dvh-72px)] bg-stone-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-green-700 transition hover:text-green-900"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="mt-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">
              Chacha & Vatija Agro
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-green-950 sm:text-4xl">
              Checkout
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার delivery information দিয়ে order
              সম্পন্ন করুন।
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            {/* LEFT */}
            <div className="space-y-6">
              {/* Customer Information */}
              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <UserRound
                      size={19}
                      className="text-green-800"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-green-950">
                      Customer Information
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      আপনার সঠিক তথ্য দিন যাতে আমরা যোগাযোগ
                      করতে পারি।
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-bold text-gray-700 sm:text-sm"
                    >
                      আপনার নাম{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <UserRound
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="যেমন: Abidur Rahman"
                        className={`min-h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:ring-4 ${
                          errors.name
                            ? "border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                        }`}
                      />
                    </div>

                    {errors.name && (
                      <p className="mt-1.5 text-xs font-semibold text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-bold text-gray-700 sm:text-sm"
                    >
                      মোবাইল নম্বর{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        maxLength={11}
                        className={`min-h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:ring-4 ${
                          errors.phone
                            ? "border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                        }`}
                      />
                    </div>

                    {errors.phone && (
                      <p className="mt-1.5 text-xs font-semibold text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* District */}
                  <div>
                    <label
                      htmlFor="district"
                      className="mb-2 block text-xs font-bold text-gray-700 sm:text-sm"
                    >
                      জেলা{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <MapPin
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <select
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className={`min-h-12 w-full appearance-none rounded-xl border bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:ring-4 ${
                          errors.district
                            ? "border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                        }`}
                      >
                        <option value="">
                          জেলা নির্বাচন করুন
                        </option>

                        <option value="Barisal">
                          বরিশাল
                        </option>

                        <option value="Dhaka">
                          ঢাকা
                        </option>

                        <option value="Chattogram">
                          চট্টগ্রাম
                        </option>

                        <option value="Khulna">
                          খুলনা
                        </option>

                        <option value="Rajshahi">
                          রাজশাহী
                        </option>

                        <option value="Rangpur">
                          রংপুর
                        </option>

                        <option value="Sylhet">
                          সিলেট
                        </option>

                        <option value="Mymensingh">
                          ময়মনসিংহ
                        </option>
                      </select>
                    </div>

                    {errors.district && (
                      <p className="mt-1.5 text-xs font-semibold text-red-500">
                        {errors.district}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-xs font-bold text-gray-700 sm:text-sm"
                    >
                      সম্পূর্ণ ঠিকানা{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={4}
                      placeholder="বাড়ি/রোড, এলাকা, থানা/উপজেলা..."
                      className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:ring-4 ${
                        errors.address
                          ? "border-red-400 focus:ring-red-100"
                          : "border-gray-200 focus:border-green-600 focus:ring-green-100"
                      }`}
                    />

                    {errors.address && (
                      <p className="mt-1.5 text-xs font-semibold text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Note */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="note"
                      className="mb-2 block text-xs font-bold text-gray-700 sm:text-sm"
                    >
                      Order Note{" "}
                      <span className="font-normal text-gray-400">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Delivery সম্পর্কে কোনো বিশেষ নির্দেশনা থাকলে লিখুন..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                    />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <CreditCard
                      size={19}
                      className="text-amber-700"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-green-950">
                      Payment Method
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      এখন Cash on Delivery দিয়ে order করুন।
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-green-700 bg-green-50"
                        : "border-gray-200 bg-white hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={
                        paymentMethod === "cod"
                      }
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value
                        )
                      }
                      className="mt-1 h-4 w-4 accent-green-700"
                    />

                    <div className="flex flex-1 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                        <Truck
                          size={19}
                          className="text-green-700"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-black text-green-950">
                          Cash on Delivery
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          পণ্য হাতে পাওয়ার সময় payment
                          করুন।
                        </p>
                      </div>

                      <CheckCircle2
                        size={20}
                        className={`ml-auto shrink-0 ${
                          paymentMethod === "cod"
                            ? "text-green-700"
                            : "text-transparent"
                        }`}
                      />
                    </div>
                  </label>

                  <div className="mt-4 rounded-xl bg-amber-50 p-4">
                    <p className="text-xs font-bold text-amber-800">
                      💡 Online Payment Coming Soon
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-amber-700">
                      পরবর্তী ধাপে bKash, Nagad এবং
                      SSLCommerz payment integration করা
                      হবে।
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                {/* Summary Header */}
                <div className="bg-green-950 p-5 text-white sm:p-6">
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={20} />

                    <h2 className="text-lg font-black">
                      Order Summary
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-white/60">
                    {totalItems} টি পণ্য
                  </p>
                </div>

                {/* Items */}
                <div className="max-h-72 overflow-y-auto p-4 sm:p-5">
                  <div className="space-y-4">
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
                          className="flex gap-3"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />

                            <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-800 px-1 text-[9px] font-black text-white">
                              {itemQuantity}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-bold text-green-950">
                              {item.name}
                            </h3>

                            <p className="mt-1 text-[11px] text-gray-500">
                              ৳
                              {itemPrice.toLocaleString()}{" "}
                              × {itemQuantity}
                            </p>
                          </div>

                          <p className="shrink-0 text-sm font-black text-green-800">
                            ৳{itemTotal.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-100 p-5 sm:p-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>

                      <span className="font-semibold text-gray-800">
                        ৳{safeSubtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-500">
                      <span>Delivery</span>

                      <span className="font-semibold text-gray-800">
                        ৳
                        {safeDeliveryCharge.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-gray-200 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-green-950">
                          Total
                        </span>

                        <span className="text-2xl font-black text-green-800">
                          ৳{safeTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-5 flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-green-800 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-green-900/10 transition hover:bg-green-700 active:scale-[0.99]"
                  >
                    <CheckCircle2 size={18} />
                    Order Confirm করুন
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-semibold text-gray-400 sm:text-xs">
                    <ShieldCheck size={15} />
                    আপনার তথ্য নিরাপদে রাখা হবে
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
